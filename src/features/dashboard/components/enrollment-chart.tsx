"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import type { EnrollmentPoint } from "@/features/dashboard/types";

export function EnrollmentChart({ data }: { data: EnrollmentPoint[] }) {
  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 md:p-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h3 className="font-display text-title-md text-on-surface">Enrollment Growth</h3>
          <p className="text-body-md text-on-surface-variant">Year-over-year registration volume</p>
        </div>
        <div className="flex gap-4">
          <Legend color="bg-primary" label="2024" />
          <Legend color="bg-outline-variant" label="2023" />
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-on-surface-variant)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--color-surface-container)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--color-outline-variant)",
                background: "var(--color-surface-container-lowest)",
                color: "var(--color-on-surface)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="previous" name="2023" fill="var(--color-outline-variant)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="current" name="2024" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-3 rounded-full ${color}`} />
      <span className="text-[12px] font-medium text-on-surface">{label}</span>
    </div>
  );
}
