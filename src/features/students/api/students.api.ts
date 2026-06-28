import { mockStudentList, mockStudentProfiles } from "@/features/students/data/mock";
import type { AdmissionForm } from "@/features/students/schema";
import type { StudentListItem, StudentProfile } from "@/features/students/types";

export async function fetchStudents(schoolId: string): Promise<StudentListItem[]> {
  void schoolId;
  return Promise.resolve(mockStudentList);
}

export async function fetchStudent(
  schoolId: string,
  studentId: string,
): Promise<StudentProfile | null> {
  void schoolId;
  // Fall back to the seed profile so any id renders during the MVP.
  const profile =
    mockStudentProfiles[studentId] ?? Object.values(mockStudentProfiles)[0] ?? null;
  return Promise.resolve(profile);
}

export async function createAdmission(
  schoolId: string,
  payload: AdmissionForm,
): Promise<{ id: string }> {
  void schoolId;
  void payload;
  // Simulated persistence — the real client will POST to the NestJS admissions endpoint.
  return Promise.resolve({ id: "ss-2024-8842" });
}
