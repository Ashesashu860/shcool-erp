"use client";

import Link from "next/link";

import { EnrollmentChart } from "@/features/dashboard/components/enrollment-chart";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import type { ActivityItem, ScheduleItem } from "@/features/dashboard/types";
import { Icon } from "@/shared/components/icon";
import { PageHeader } from "@/shared/components/page-header";
import { StatCard } from "@/shared/components/stat-card";
import { Skeleton } from "@/shared/ui/skeleton";

const toneText: Record<ActivityItem["tone"], string> = {
  primary: "text-primary",
  tertiary: "text-tertiary",
  secondary: "text-secondary",
};

const scheduleDot: Record<ScheduleItem["tone"], string> = {
  primary: "bg-primary",
  tertiary: "bg-tertiary",
  muted: "bg-outline-variant",
};

const scheduleText: Record<ScheduleItem["tone"], string> = {
  primary: "text-primary",
  tertiary: "text-tertiary",
  muted: "text-on-surface-variant",
};

export function DashboardOverview() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Academic Overview" description={data.term} />

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
        {data.kpis.map((kpi) => (
          <StatCard key={kpi.id} label={kpi.label} value={kpi.value} icon={kpi.icon} meta={kpi.meta} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-8">
          <EnrollmentChart data={data.enrollment} />

          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest">
            <div className="flex items-center justify-between border-b border-outline-variant p-6">
              <h3 className="font-display text-title-md text-on-surface">Recent Activity</h3>
              <button type="button" className="text-label-md text-primary hover:underline">
                View All
              </button>
            </div>
            <div className="divide-y divide-outline-variant">
              {data.activity.map((item) => (
                <div key={item.id} className="group flex items-center gap-4 p-6 transition-colors hover:bg-surface-container-low">
                  <div className={`flex size-10 items-center justify-center rounded-full bg-surface-container ${toneText[item.tone]}`}>
                    <Icon name={item.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-body-md text-on-surface">
                      <span className="font-bold">{item.title}</span> {item.detail}
                    </p>
                    <p className="text-[12px] text-on-surface-variant">{item.meta}</p>
                  </div>
                  <span className="text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100">
                    <Icon name="chevron_right" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 xl:col-span-4">
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
            <h3 className="mb-6 font-display text-title-md text-on-surface">Quick Actions</h3>
            <div className="space-y-3">
              {data.quickActions.map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className="flex items-center justify-between rounded-xl border border-outline-variant p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">
                      <Icon name={action.icon} />
                    </span>
                    <div>
                      <p className="text-label-md font-bold text-on-surface">{action.title}</p>
                      <p className="text-[11px] text-on-surface-variant">{action.description}</p>
                    </div>
                  </div>
                  <Icon name="chevron_right" size={20} />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-title-md text-on-surface">Schedule</h3>
              <span className="text-on-surface-variant">
                <Icon name="calendar_month" />
              </span>
            </div>
            <div className="space-y-6">
              {data.schedule.map((item, i) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className={`mb-2 size-2 rounded-full ${scheduleDot[item.tone]}`} />
                    {i < data.schedule.length - 1 ? <span className="h-full w-px bg-outline-variant" /> : null}
                  </div>
                  <div className="pb-2">
                    <p className={`text-[11px] font-bold uppercase ${scheduleText[item.tone]}`}>{item.time}</p>
                    <p className="text-label-md font-bold text-on-surface">{item.title}</p>
                    <p className="text-[12px] text-on-surface-variant">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
