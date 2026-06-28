"use client";

import Link from "next/link";

import { useStudents } from "@/features/students/hooks/use-students";
import { Icon } from "@/shared/components/icon";
import { PageHeader } from "@/shared/components/page-header";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

export function StudentsDirectory() {
  const { data, isLoading } = useStudents();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Directory" }, { label: "Students", current: true }]}
        title="Students"
        description="Browse enrolled students and open a profile."
        actions={
          <Button asChild className="rounded-xl">
            <Link href="/students/new">
              <Icon name="person_add" size={18} />
              Add New Student
            </Link>
          </Button>
        }
      />

      {isLoading || !data ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((student) => (
            <Link
              key={student.id}
              href={`/students/${student.id}`}
              className="flex items-center gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-all hover:border-primary"
            >
              <Avatar className="size-12">
                <AvatarFallback className="bg-primary-container text-on-primary-container">
                  {student.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-title-md text-on-surface">{student.fullName}</p>
                <p className="truncate text-label-md text-on-surface-variant">{student.gradeTrack}</p>
                <span className="font-mono text-[11px] text-outline">{student.studentId}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
