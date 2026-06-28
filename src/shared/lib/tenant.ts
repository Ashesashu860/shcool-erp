/**
 * Multi-tenant scoping. Every server query key MUST include the active school id
 * so cached data can never leak between tenants. In the MVP this is a static demo
 * tenant; swap for the authenticated school context when auth lands.
 */
export const CURRENT_SCHOOL_ID = "demo-school";
