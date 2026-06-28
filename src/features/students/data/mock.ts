import type { StudentListItem, StudentProfile } from "@/features/students/types";

export const mockStudentProfiles: Record<string, StudentProfile> = {
  "ss-2024-8842": {
    id: "ss-2024-8842",
    studentId: "SS-2024-8842",
    firstName: "Julian",
    lastName: "Sterling",
    fullName: "Julian M. Sterling",
    status: "active",
    gradeTrack: "Grade 11-B • Honors Track",
    initials: "JS",
    gpa: "3.92",
    attendance: "98.5%",
    major: "Computer Science",
    credits: "114 / 120",
    personal: {
      dateOfBirth: "May 14, 2007",
      age: "17 years old",
      gender: "Male",
      bloodGroup: "O Positive",
      address: "482 Oakwood Ave, Suite 210, Metropolis, MC 49201",
      phone: "+1 (555) 012-3456",
      email: "j.sterling@student.scholarsync.edu",
    },
    guardians: [
      {
        id: "g1",
        name: "Marcus Sterling",
        relation: "Father",
        phone: "+1 (555) 012-3400",
        email: "m.sterling@email.com",
        primary: true,
      },
      {
        id: "g2",
        name: "Diana Sterling",
        relation: "Mother",
        phone: "+1 (555) 012-3401",
        email: "d.sterling@email.com",
        primary: false,
      },
    ],
    documents: [
      { id: "d1", name: "Birth Certificate", type: "PDF", uploadedAt: "Aug 12, 2023" },
      { id: "d2", name: "Previous Transcript", type: "PDF", uploadedAt: "Aug 12, 2023" },
      { id: "d3", name: "Immunization Record", type: "PDF", uploadedAt: "Sep 01, 2023" },
    ],
    activity: [
      {
        id: "a1",
        icon: "quiz",
        tone: "primary",
        title: "Quiz Completed",
        detail: "Advanced Calculus - Unit 4",
        meta: "Yesterday at 2:30 PM",
      },
      {
        id: "a2",
        icon: "assignment_turned_in",
        tone: "tertiary",
        title: "Homework Submitted",
        detail: "History of Modern Architecture",
        meta: "Aug 24, 2024",
      },
      {
        id: "a3",
        icon: "military_tech",
        tone: "secondary",
        title: "Achievement Unlocked",
        detail: "100% Attendance Streak (3 Months)",
        meta: "Aug 20, 2024",
      },
    ],
    healthAlerts: [
      {
        id: "h1",
        severity: "critical",
        title: "Severe Peanut Allergy",
        detail:
          "Patient carries an EpiPen at all times. In case of exposure, administer medication immediately and contact emergency services and parents. Student is highly sensitized to trace amounts.",
      },
    ],
  },
};

export const mockStudentList: StudentListItem[] = [
  {
    id: "ss-2024-8842",
    studentId: "SS-2024-8842",
    fullName: "Julian M. Sterling",
    initials: "JS",
    gradeTrack: "Grade 11-B • Honors Track",
    status: "active",
  },
  {
    id: "ss-2024-8843",
    studentId: "SS-2024-8843",
    fullName: "Amara Okeke",
    initials: "AO",
    gradeTrack: "Grade 10-A • Science",
    status: "active",
  },
  {
    id: "ss-2024-8844",
    studentId: "SS-2024-8844",
    fullName: "Leo Nakamura",
    initials: "LN",
    gradeTrack: "Grade 12-C • Arts",
    status: "active",
  },
];
