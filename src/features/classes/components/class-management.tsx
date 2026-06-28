"use client";

import * as React from "react";

import {
  ClassFilterBar,
  defaultClassFilters,
} from "@/features/classes/components/class-filters";
import { ClassesTable } from "@/features/classes/components/classes-table";
import { useClasses } from "@/features/classes/hooks/use-classes";
import type { ClassFilters, ClassStatus } from "@/features/classes/types";
import { Icon } from "@/shared/components/icon";
import { PageHeader } from "@/shared/components/page-header";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

const STATUS_LABEL: Record<string, ClassStatus> = {
  Active: "active",
  "At Capacity": "at_capacity",
  Waitlist: "waitlist",
  Archived: "archived",
};

export function ClassManagement() {
  const { data, isLoading } = useClasses();
  const [filters, setFilters] = React.useState<ClassFilters>(defaultClassFilters);

  const rows = React.useMemo(() => {
    if (!data) return [];
    return data.filter((cls) => {
      if (filters.status !== "All Statuses" && cls.status !== STATUS_LABEL[filters.status]) {
        return false;
      }
      return true;
    });
  }, [data, filters]);

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Academic" }, { label: "Classes", current: true }]}
        title="Class Management"
        description="Manage academic sections, assigned teachers, and student capacities."
        actions={
          <Button className="rounded-xl">
            <Icon name="add" size={18} />
            Add Class
          </Button>
        }
      />

      <ClassFilterBar filters={filters} onChange={setFilters} />

      {isLoading ? <Skeleton className="h-96 rounded-xl" /> : <ClassesTable data={rows} />}
    </>
  );
}
