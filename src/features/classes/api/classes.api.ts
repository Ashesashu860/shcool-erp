import { mockClasses } from "@/features/classes/data/mock";
import type { ClassRow } from "@/features/classes/types";

export async function fetchClasses(schoolId: string): Promise<ClassRow[]> {
  void schoolId;
  return Promise.resolve(mockClasses);
}
