import { mockDashboard } from "@/features/dashboard/data/mock";
import type { DashboardData } from "@/features/dashboard/types";

/**
 * Typed API client. Components never call this directly — they go through the
 * feature hook. Swap the mock for a real NestJS endpoint when the backend lands.
 */
export async function fetchDashboard(schoolId: string): Promise<DashboardData> {
  void schoolId;
  return Promise.resolve(mockDashboard);
}
