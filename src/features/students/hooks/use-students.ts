"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAdmission,
  fetchStudent,
  fetchStudents,
} from "@/features/students/api/students.api";
import type { AdmissionForm } from "@/features/students/schema";
import { CURRENT_SCHOOL_ID } from "@/shared/lib/tenant";

export function useStudents() {
  return useQuery({
    queryKey: ["students", CURRENT_SCHOOL_ID],
    queryFn: () => fetchStudents(CURRENT_SCHOOL_ID),
  });
}

export function useStudent(studentId: string) {
  return useQuery({
    queryKey: ["students", CURRENT_SCHOOL_ID, studentId],
    queryFn: () => fetchStudent(CURRENT_SCHOOL_ID, studentId),
    enabled: Boolean(studentId),
  });
}

export function useCreateAdmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AdmissionForm) => createAdmission(CURRENT_SCHOOL_ID, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", CURRENT_SCHOOL_ID] });
    },
  });
}
