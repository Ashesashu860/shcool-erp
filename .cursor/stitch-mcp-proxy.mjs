#!/usr/bin/env node
/**
 * Stitch MCP stdio <-> HTTP proxy for Cursor.
 *
 * Why this exists:
 * - Cursor cannot natively authenticate Google's `google_credentials` MCP auth,
 *   so we talk to https://stitch.googleapis.com/mcp directly with an API key.
 * - Cursor silently drops the official server's `tools/list` payload (~287KB)
 *   because it exceeds an internal size limit, showing "0 tools". We strip the
 *   verbose `outputSchema` from each tool (~41KB) so the tools register.
 *
 * The API key is read from STITCH_API_KEY (provided via .cursor/mcp.json `env`,
 * which is gitignored) so no secret is committed in this script.
 */
import { request } from "node:https";

const API_KEY = process.env.STITCH_API_KEY;
const STITCH_URL = process.env.STITCH_HOST ?? "https://stitch.googleapis.com/mcp";

if (!API_KEY) {
  process.stderr.write("[stitch-proxy] Missing STITCH_API_KEY env var.\n");
  process.exit(1);
}

function postToStitch(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const parsed = new URL(STITCH_URL);
    const req = request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
          "Content-Length": Buffer.byteLength(data),
          "X-Goog-Api-Key": API_KEY,
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => {
          if (!raw) return resolve(null); // e.g. 202 Accepted for notifications
          // Handle both plain JSON and SSE (text/event-stream) framing.
          const ct = res.headers["content-type"] ?? "";
          if (ct.includes("text/event-stream")) {
            const dataLines = raw
              .split("\n")
              .filter((l) => l.startsWith("data:"))
              .map((l) => l.slice(5).trim())
              .join("");
            try {
              return resolve(JSON.parse(dataLines));
            } catch (e) {
              return reject(new Error(`SSE parse error: ${e.message}`));
            }
          }
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            reject(new Error(`JSON parse error: ${e.message}: ${raw.slice(0, 200)}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function stripOutputSchema(response) {
  const tools = response?.result?.tools;
  if (Array.isArray(tools)) {
    response.result.tools = tools.map(({ outputSchema, ...rest }) => rest);
  }
  return response;
}

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let idx;
  while ((idx = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (line) handleLine(line);
  }
});

async function handleLine(line) {
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }
  const isRequest = msg.id !== undefined && msg.id !== null;
  try {
    const response = await postToStitch(msg);
    if (!isRequest) return; // notification: nothing to return
    if (!response) return;
    if (msg.method === "tools/list") stripOutputSchema(response);
    send(response);
  } catch (err) {
    if (isRequest) {
      send({
        jsonrpc: "2.0",
        id: msg.id,
        error: { code: -32000, message: String(err?.message ?? err) },
      });
    }
  }
}
