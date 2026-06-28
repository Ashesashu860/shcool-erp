"use client";

import type { ClassFilters } from "@/features/classes/types";
import { Icon } from "@/shared/components/icon";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const SESSIONS = ["2023 - 2024 (Current)", "2024 - 2025 (Next)", "2022 - 2023"];
const STATUSES = ["All Statuses", "Active", "At Capacity", "Waitlist", "Archived"];
const GRADES = ["All Grades", "Kindergarten", "Elementary", "Middle School", "High School"];

const DEFAULTS: ClassFilters = {
  session: SESSIONS[0],
  status: STATUSES[0],
  grade: GRADES[0],
};

function Field({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label className="px-1 text-label-md text-secondary">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full rounded-lg bg-surface">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ClassFilterBar({
  filters,
  onChange,
}: {
  filters: ClassFilters;
  onChange: (filters: ClassFilters) => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
      <Field
        label="Session"
        value={filters.session}
        options={SESSIONS}
        onChange={(session) => onChange({ ...filters, session })}
        className="min-w-[200px] flex-1"
      />
      <Field
        label="Status"
        value={filters.status}
        options={STATUSES}
        onChange={(status) => onChange({ ...filters, status })}
        className="min-w-[160px]"
      />
      <Field
        label="Grade Level"
        value={filters.grade}
        options={GRADES}
        onChange={(grade) => onChange({ ...filters, grade })}
        className="min-w-[160px]"
      />
      <Button variant="outline" className="rounded-lg" onClick={() => onChange(DEFAULTS)}>
        <Icon name="filter_list" size={18} />
        Clear Filters
      </Button>
    </div>
  );
}

export { DEFAULTS as defaultClassFilters };
