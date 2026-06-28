export type ClassStatus = "active" | "at_capacity" | "waitlist" | "archived";

export type ClassRow = {
  id: string;
  name: string;
  grade: string;
  room: string;
  section: string;
  teacher: { name: string; initials: string };
  studentCount: number;
  capacity: number;
  status: ClassStatus;
};

export type ClassFilters = {
  session: string;
  status: string;
  grade: string;
};
