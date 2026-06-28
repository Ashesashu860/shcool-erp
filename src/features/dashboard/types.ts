export type KpiStat = {
  id: string;
  label: string;
  value: string;
  icon: string;
  meta: string;
};

export type EnrollmentPoint = {
  month: string;
  current: number;
  previous: number;
};

export type ActivityItem = {
  id: string;
  icon: string;
  tone: "primary" | "tertiary" | "secondary";
  title: string;
  detail: string;
  meta: string;
};

export type QuickAction = {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
};

export type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  location: string;
  tone: "primary" | "tertiary" | "muted";
};

export type DashboardData = {
  term: string;
  kpis: KpiStat[];
  enrollment: EnrollmentPoint[];
  activity: ActivityItem[];
  quickActions: QuickAction[];
  schedule: ScheduleItem[];
};
