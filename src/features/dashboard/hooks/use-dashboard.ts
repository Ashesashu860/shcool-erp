"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchDashboard } from "@/features/dashboard/api/dashboard.api";
import { CURRENT_SCHOOL_ID } from "@/shared/lib/tenant";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard", CURRENT_SCHOOL_ID],
    queryFn: () => fetchDashboard(CURRENT_SCHOOL_ID),
  });
}
