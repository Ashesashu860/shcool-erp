import type { DashboardData } from "@/features/dashboard/types";

export const mockDashboard: DashboardData = {
  term: "Spring Semester 2024 • Term 2",
  kpis: [
    { id: "classes", label: "Classes", value: "142", icon: "school", meta: "+4 new" },
    { id: "teachers", label: "Teachers", value: "56", icon: "person_4", meta: "98% active" },
    { id: "students", label: "Students", value: "1,208", icon: "group", meta: "+86 YoY" },
    { id: "parents", label: "Parents", value: "942", icon: "family_restroom", meta: "840 verified" },
    { id: "principals", label: "Principals", value: "3", icon: "account_balance", meta: "District 04" },
  ],
  enrollment: [
    { month: "Jan", current: 480, previous: 320 },
    { month: "Feb", current: 520, previous: 400 },
    { month: "Mar", current: 440, previous: 360 },
    { month: "Apr", current: 600, previous: 440 },
    { month: "May", current: 560, previous: 480 },
  ],
  activity: [
    {
      id: "a1",
      icon: "person_add",
      tone: "primary",
      title: "New Teacher:",
      detail: "Alice Vance joined the Science Department.",
      meta: "2 hours ago • Action by Admin Jenkins",
    },
    {
      id: "a2",
      icon: "verified_user",
      tone: "tertiary",
      title: "Report Verified:",
      detail: "Term 1 Academic Audit was approved.",
      meta: "5 hours ago • System Auto-Verification",
    },
    {
      id: "a3",
      icon: "edit_square",
      tone: "secondary",
      title: "Class Updated:",
      detail: "Advanced Calculus Room changed to Lab 02.",
      meta: "Yesterday • Action by Principal Marcus",
    },
  ],
  quickActions: [
    {
      id: "q1",
      icon: "add_circle",
      title: "Create Class",
      description: "Setup curriculum and teacher",
      href: "/classes",
    },
    {
      id: "q2",
      icon: "person_add",
      title: "Add Teacher",
      description: "Register new faculty member",
      href: "/teachers",
    },
    {
      id: "q3",
      icon: "contact_page",
      title: "Bulk Enrollment",
      description: "Import students via CSV/XLS",
      href: "/students/new",
    },
  ],
  schedule: [
    { id: "s1", time: "10:00 AM", title: "Faculty Orientation", location: "Conference Hall A", tone: "primary" },
    { id: "s2", time: "01:30 PM", title: "District Board Meeting", location: "Virtual Link via Zoom", tone: "tertiary" },
    { id: "s3", time: "04:00 PM", title: "Parent-Teacher Council", location: "Main Office", tone: "muted" },
  ],
};
