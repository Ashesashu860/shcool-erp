"use client";

import * as React from "react";

import { useStudent } from "@/features/students/hooks/use-students";
import type {
  Guardian,
  HealthAlert,
  StudentActivity,
  StudentDocument,
  StudentProfile as StudentProfileType,
} from "@/features/students/types";
import { Icon } from "@/shared/components/icon";
import { PageHeader } from "@/shared/components/page-header";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";

type TabId = "overview" | "parents" | "documents";

const TABS: { id: TabId; label: string; disabled?: boolean }[] = [
  { id: "overview", label: "Overview" },
  { id: "parents", label: "Parents & Guardians" },
  { id: "documents", label: "Documents" },
];

const SOON_TABS = ["Attendance", "Fees & Finances"];

const activityTone: Record<StudentActivity["tone"], string> = {
  primary: "bg-primary-fixed text-primary",
  tertiary: "bg-tertiary-fixed text-tertiary",
  secondary: "bg-secondary-container text-on-secondary-container",
};

export function StudentProfile({ studentId }: { studentId: string }) {
  const { data, isLoading } = useStudent(studentId);
  const [tab, setTab] = React.useState<TabId>("overview");

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-44 rounded-xl" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Directory" }, { label: "Students" }, { label: "Profile", current: true }]}
        title="Student Details"
        actions={
          <>
            <Button variant="outline" className="rounded-xl">
              <Icon name="edit" size={16} />
              Edit Profile
            </Button>
            <Button className="rounded-xl">
              <Icon name="print" size={16} />
              Export PDF
            </Button>
          </>
        }
      />

      <ProfileHeaderCard student={data} />

      <div className="mb-8 flex overflow-x-auto border-b border-outline-variant hide-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "whitespace-nowrap border-b-2 px-6 py-4 text-label-md transition-all",
              tab === t.id
                ? "border-primary font-bold text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface",
            )}
          >
            {t.label}
          </button>
        ))}
        {SOON_TABS.map((label) => (
          <span
            key={label}
            className="flex cursor-not-allowed items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-6 py-4 text-label-md text-outline/50"
          >
            {label}
            <span className="rounded bg-surface-container-high px-1.5 text-[10px] uppercase">Soon</span>
          </span>
        ))}
      </div>

      {tab === "overview" ? <OverviewTab student={data} /> : null}
      {tab === "parents" ? <ParentsTab guardians={data.guardians} /> : null}
      {tab === "documents" ? <DocumentsTab documents={data.documents} /> : null}
    </>
  );
}

function ProfileHeaderCard({ student }: { student: StudentProfileType }) {
  const stats = [
    { label: "GPA", value: student.gpa, accent: true },
    { label: "Attendance", value: student.attendance },
    { label: "Major", value: student.major },
    { label: "Credits", value: student.credits },
  ];
  return (
    <div className="mb-8 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:p-8">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <Avatar className="size-32 rounded-2xl border-4 border-surface-container md:size-40">
          <AvatarFallback className="rounded-2xl bg-primary-container text-4xl font-bold text-on-primary-container">
            {student.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <h2 className="font-display text-headline-md font-bold text-on-surface">{student.fullName}</h2>
              <span className="rounded-full bg-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-on-primary-container">
                {student.status}
              </span>
            </div>
            <p className="flex items-center gap-2 text-on-surface-variant">
              <span className="rounded bg-surface-container-high px-2 py-0.5 font-mono text-code">
                ID: {student.studentId}
              </span>
              <span className="size-1 rounded-full bg-outline" />
              <span className="text-body-md">{student.gradeTrack}</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline">{stat.label}</p>
                <p className={cn("font-display text-title-md", stat.accent ? "text-primary" : "text-on-surface")}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-outline">{label}</p>
      <p className="mt-1 text-body-md text-on-surface">{value}</p>
    </div>
  );
}

function OverviewTab({ student }: { student: StudentProfileType }) {
  const p = student.personal;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:col-span-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-primary">
              <Icon name="badge" size={20} />
            </span>
            <h3 className="font-display text-title-md text-on-surface">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <InfoField label="Full Name" value={student.fullName} />
            <InfoField label="Date of Birth" value={`${p.dateOfBirth} (${p.age})`} />
            <InfoField label="Gender" value={p.gender} />
            <InfoField label="Blood Group" value={p.bloodGroup} />
            <InfoField label="Current Address" value={p.address} />
            <InfoField label="Contact Number" value={p.phone} />
            <InfoField label="Email Address" value={p.email} />
          </div>
        </div>

        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:col-span-4">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-primary">
              <Icon name="timeline" size={20} />
            </span>
            <h3 className="font-display text-title-md text-on-surface">Recent Activity</h3>
          </div>
          <div className="space-y-5">
            {student.activity.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", activityTone[item.tone])}>
                  <Icon name={item.icon} size={18} />
                </div>
                <div>
                  <p className="text-label-md font-bold text-on-surface">{item.title}</p>
                  <p className="text-[12px] text-on-surface-variant">{item.detail}</p>
                  <p className="text-[11px] text-outline">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {student.healthAlerts.map((alert) => (
        <HealthAlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
}

function HealthAlertCard({ alert }: { alert: HealthAlert }) {
  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-error">
          <Icon name="health_and_safety" size={20} />
        </span>
        <h3 className="font-display text-title-md text-on-surface">Health &amp; Safety Alerts</h3>
      </div>
      <div className="flex gap-4 rounded-lg border border-error/20 bg-error-container/60 p-4">
        <span className="text-error">
          <Icon name="warning" filled />
        </span>
        <div>
          <p className="font-bold text-on-error-container">{alert.title}</p>
          <p className="mt-1 text-body-md text-on-error-container/80">{alert.detail}</p>
        </div>
      </div>
    </div>
  );
}

function ParentsTab({ guardians }: { guardians: Guardian[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {guardians.map((g) => (
        <div key={g.id} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarFallback className="bg-secondary-container text-on-secondary-container">
                  {g.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-title-md text-on-surface">{g.name}</p>
                <p className="text-label-md text-on-surface-variant">{g.relation}</p>
              </div>
            </div>
            {g.primary ? (
              <span className="rounded-full bg-primary-container px-2.5 py-0.5 text-[10px] font-bold uppercase text-on-primary-container">
                Primary
              </span>
            ) : null}
          </div>
          <div className="mt-4 space-y-2 text-body-md text-on-surface-variant">
            <p className="flex items-center gap-2">
              <Icon name="call" size={16} /> {g.phone}
            </p>
            <p className="flex items-center gap-2">
              <Icon name="mail" size={16} /> {g.email}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DocumentsTab({ documents }: { documents: StudentDocument[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="divide-y divide-outline-variant">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center gap-4 p-5 transition-colors hover:bg-surface-container-low">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-fixed text-primary">
              <Icon name="description" />
            </div>
            <div className="flex-1">
              <p className="text-body-md font-medium text-on-surface">{doc.name}</p>
              <p className="text-[12px] text-on-surface-variant">
                {doc.type} • Uploaded {doc.uploadedAt}
              </p>
            </div>
            <button
              type="button"
              aria-label="Download document"
              className="rounded-lg p-2 text-secondary transition-colors hover:bg-surface-container-high hover:text-primary"
            >
              <Icon name="download" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
