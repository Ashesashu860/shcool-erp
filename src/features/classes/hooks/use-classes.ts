"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchClasses } from "@/features/classes/api/classes.api";
import { CURRENT_SCHOOL_ID } from "@/shared/lib/tenant";

export function useClasses() {
  return useQuery({
    queryKey: ["classes", CURRENT_SCHOOL_ID],
    queryFn: () => fetchClasses(CURRENT_SCHOOL_ID),
  });
}
