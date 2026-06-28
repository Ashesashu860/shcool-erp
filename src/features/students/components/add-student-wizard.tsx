"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";

import { useCreateAdmission } from "@/features/students/hooks/use-students";
import {
  admissionDefaults,
  admissionSchema,
  type AdmissionForm,
} from "@/features/students/schema";
import { Icon } from "@/shared/components/icon";
import { PageHeader } from "@/shared/components/page-header";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { cn } from "@/shared/lib/utils";

const STEPS = ["Student Details", "Parental Info", "Review"] as const;

const STEP_FIELDS: (keyof AdmissionForm)[][] = [
  [
    "firstName",
    "lastName",
    "dateOfBirth",
    "gender",
    "gradeClass",
    "section",
    "academicSession",
    "studentEmail",
    "emergencyPhone",
    "address",
  ],
  ["parentName", "parentRelation", "parentPhone", "parentEmail"],
  [],
];

const GRADES = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const SECTIONS = ["Section A", "Section B", "Section C"];
const SESSIONS = ["2024-2025", "2025-2026"];
const GENDERS: { value: AdmissionForm["gender"]; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export function AddStudentWizard() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const createAdmission = useCreateAdmission();

  const form = useForm<AdmissionForm>({
    resolver: zodResolver(admissionSchema),
    defaultValues: admissionDefaults,
    mode: "onTouched",
  });

  const next = async () => {
    const valid = await form.trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = (values: AdmissionForm) => {
    createAdmission.mutate(values, {
      onSuccess: ({ id }) => router.push(`/students/${id}`),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-6xl">
        <PageHeader
          breadcrumbs={[{ label: "Students" }, { label: "New Admission", current: true }]}
          title="Register New Student"
          description="Complete all fields to enroll a new student into the Academic Year 2024-25."
          actions={
            <>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => router.push("/students")}
              >
                Discard
              </Button>
              <Button
                type="submit"
                className="rounded-xl"
                disabled={createAdmission.isPending}
              >
                {createAdmission.isPending ? "Saving…" : "Save Admission"}
              </Button>
            </>
          }
        />

        <Stepper step={step} />

        <div className="mt-8">
          {step === 0 ? <StudentDetailsStep /> : null}
          {step === 1 ? <ParentalInfoStep /> : null}
          {step === 2 ? <ReviewStep values={form.getValues()} /> : null}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
          >
            <Icon name="arrow_back" size={18} />
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" className="rounded-xl" onClick={next}>
              Continue
              <Icon name="arrow_forward" size={18} />
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex max-w-2xl items-center">
      {STEPS.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 ? <div className="mx-4 h-px flex-1 bg-outline-variant" /> : null}
          <div className={cn("flex items-center gap-2", i > step && "opacity-50")}>
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-bold",
                i <= step ? "bg-primary text-on-primary" : "border border-outline",
              )}
            >
              {i < step ? <Icon name="check" size={16} /> : i + 1}
            </div>
            <span className={cn("text-label-md", i === step && "text-primary")}>{label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary-fixed p-2 text-primary">
          <Icon name={icon} />
        </div>
        <h3 className="font-display text-title-md text-on-surface">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function StudentDetailsStep() {
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
      <div className="space-y-8 xl:col-span-2">
        <SectionCard icon="person" title="Personal Information">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <TextField name="firstName" label="First Name" placeholder="e.g. Julian" />
            <TextField name="lastName" label="Last Name" placeholder="e.g. Casablancas" />
            <TextField name="dateOfBirth" label="Date of Birth" type="date" />
            <GenderField />
          </div>
        </SectionCard>

        <SectionCard icon="school" title="Academic Enrollment">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <SelectField name="gradeClass" label="Grade / Class" options={GRADES} placeholder="Select Class" />
            <SelectField name="section" label="Section" options={SECTIONS} placeholder="Select Section" />
            <SelectField name="academicSession" label="Academic Session" options={SESSIONS} />
          </div>
          <div className="mt-6">
            <FormLabel className="text-label-md text-on-surface">Admission Number (Auto-Generated)</FormLabel>
            <div className="mt-2 rounded-xl border border-dashed border-outline-variant bg-surface-container px-4 py-3 font-mono text-code text-on-surface-variant">
              SCH-2024-0892
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="space-y-8">
        <SectionCard icon="contact_mail" title="Contact">
          <div className="space-y-6">
            <TextField name="studentEmail" label="Student Email (Optional)" placeholder="student@example.com" />
            <TextField name="emergencyPhone" label="Emergency Phone" placeholder="+1 (555) 000-0000" />
            <TextAreaField name="address" label="Residential Address" placeholder="Enter complete home address" />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function ParentalInfoStep() {
  return (
    <div className="mx-auto max-w-3xl">
      <SectionCard icon="family_restroom" title="Parent / Guardian">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TextField name="parentName" label="Full Name" placeholder="e.g. Marcus Sterling" />
          <TextField name="parentRelation" label="Relation" placeholder="e.g. Father" />
          <TextField name="parentPhone" label="Phone Number" placeholder="+1 (555) 000-0000" />
          <TextField name="parentEmail" label="Email (Optional)" placeholder="parent@example.com" />
        </div>
      </SectionCard>
    </div>
  );
}

function ReviewStep({ values }: { values: AdmissionForm }) {
  const rows: [string, string][] = [
    ["Student", `${values.firstName} ${values.lastName}`.trim() || "—"],
    ["Date of Birth", values.dateOfBirth || "—"],
    ["Gender", values.gender],
    ["Class", [values.gradeClass, values.section].filter(Boolean).join(" • ") || "—"],
    ["Session", values.academicSession],
    ["Emergency Phone", values.emergencyPhone || "—"],
    ["Address", values.address || "—"],
    ["Parent", values.parentName || "—"],
    ["Relation", values.parentRelation || "—"],
    ["Parent Phone", values.parentPhone || "—"],
  ];
  return (
    <div className="mx-auto max-w-3xl">
      <SectionCard icon="fact_check" title="Review Admission">
        <dl className="divide-y divide-outline-variant">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-3">
              <dt className="text-label-md uppercase tracking-wide text-on-surface-variant">{label}</dt>
              <dd className="text-body-md font-medium text-on-surface">{value}</dd>
            </div>
          ))}
        </dl>
      </SectionCard>
    </div>
  );
}

/* ---- Field primitives bound to the surrounding RHF context ---- */

function TextField({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: keyof AdmissionForm;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  const { control } = useFormCtx();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-label-md text-on-surface">{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} className="rounded-xl bg-surface" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function TextAreaField({
  name,
  label,
  placeholder,
}: {
  name: keyof AdmissionForm;
  label: string;
  placeholder?: string;
}) {
  const { control } = useFormCtx();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-label-md text-on-surface">{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className="min-h-24 rounded-xl bg-surface" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function SelectField({
  name,
  label,
  options,
  placeholder,
}: {
  name: keyof AdmissionForm;
  label: string;
  options: string[];
  placeholder?: string;
}) {
  const { control } = useFormCtx();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-label-md text-on-surface">{label}</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full rounded-xl bg-surface">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function GenderField() {
  const { control } = useFormCtx();
  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-label-md text-on-surface">Gender</FormLabel>
          <div className="flex gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => field.onChange(g.value)}
                className={cn(
                  "flex-1 rounded-xl border px-3 py-2.5 text-label-md transition-colors",
                  field.value === g.value
                    ? "border-primary bg-primary/5 font-bold text-primary"
                    : "border-outline-variant text-on-surface-variant hover:bg-surface-container",
                )}
              >
                {g.label}
              </button>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Local hook to read the RHF context typed to AdmissionForm.
function useFormCtx() {
  return useFormContext<AdmissionForm>();
}
