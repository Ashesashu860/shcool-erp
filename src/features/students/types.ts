export type StudentStatus = "active" | "inactive" | "alumni";

export type StudentActivity = {
  id: string;
  icon: string;
  tone: "primary" | "tertiary" | "secondary";
  title: string;
  detail: string;
  meta: string;
};

export type Guardian = {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
  primary: boolean;
};

export type StudentDocument = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
};

export type HealthAlert = {
  id: string;
  severity: "critical" | "warning";
  title: string;
  detail: string;
};

export type StudentProfile = {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  status: StudentStatus;
  gradeTrack: string;
  initials: string;
  gpa: string;
  attendance: string;
  major: string;
  credits: string;
  personal: {
    dateOfBirth: string;
    age: string;
    gender: string;
    bloodGroup: string;
    address: string;
    phone: string;
    email: string;
  };
  guardians: Guardian[];
  documents: StudentDocument[];
  activity: StudentActivity[];
  healthAlerts: HealthAlert[];
};

export type StudentListItem = {
  id: string;
  studentId: string;
  fullName: string;
  initials: string;
  gradeTrack: string;
  status: StudentStatus;
};
