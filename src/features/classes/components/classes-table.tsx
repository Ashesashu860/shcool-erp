"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ClassStatusBadge } from "@/features/classes/components/class-status-badge";
import type { ClassRow } from "@/features/classes/types";
import { Icon } from "@/shared/components/icon";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { cn } from "@/shared/lib/utils";

const AVATAR_TONES = [
  "bg-primary-container text-on-primary-container",
  "bg-tertiary-container text-on-tertiary-container",
  "bg-secondary-container text-on-secondary-container",
];

const columns: ColumnDef<ClassRow>[] = [
  {
    accessorKey: "name",
    header: "Class Name",
    cell: ({ row }) => {
      const cls = row.original;
      const tone = AVATAR_TONES[row.index % AVATAR_TONES.length];
      return (
        <div className="flex items-center gap-3">
          <div className={cn("flex size-10 items-center justify-center rounded-lg font-bold", tone)}>
            {cls.name.charAt(0)}
          </div>
          <div>
            <div className="text-title-md text-on-surface">{cls.name}</div>
            <div className="text-label-md text-secondary">
              {cls.grade} • {cls.room}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ getValue }) => (
      <span className="font-medium text-on-surface-variant">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "teacher",
    header: "Class Teacher",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarFallback className="bg-surface-container text-[11px] text-on-surface-variant">
            {row.original.teacher.initials}
          </AvatarFallback>
        </Avatar>
        <span className="text-body-md text-on-surface">{row.original.teacher.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "studentCount",
    header: () => <div className="text-center">Student Count</div>,
    cell: ({ row }) => {
      const full = row.original.studentCount >= row.original.capacity;
      return (
        <div className="text-center">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-body-md font-medium",
              full
                ? "bg-error-container font-bold text-on-error-container"
                : "bg-surface-container text-on-surface",
            )}
          >
            {row.original.studentCount}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: () => <div className="text-center">Capacity</div>,
    cell: ({ getValue }) => (
      <div className="text-center text-body-md text-secondary">{getValue<number>()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ClassStatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Class actions"
              className="rounded-lg p-2 text-secondary transition-colors hover:text-primary"
            >
              <Icon name="more_vert" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit class</DropdownMenuItem>
            <DropdownMenuItem>Manage roster</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export function ClassesTable({ data }: { data: ClassRow[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="border-outline-variant bg-surface-container hover:bg-surface-container">
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 py-4 text-label-md uppercase tracking-wide text-on-surface-variant"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="border-outline-variant hover:bg-surface-container-low">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-outline-variant px-6 py-4">
        <p className="text-label-md text-secondary">
          Showing {table.getRowModel().rows.length} of {data.length} classes
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-lg p-2 text-secondary transition-colors hover:bg-surface-container-high disabled:opacity-40"
          >
            <Icon name="chevron_left" size={18} />
          </button>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-lg p-2 text-secondary transition-colors hover:bg-surface-container-high disabled:opacity-40"
          >
            <Icon name="chevron_right" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
