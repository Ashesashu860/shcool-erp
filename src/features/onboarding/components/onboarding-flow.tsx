"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { schoolInfoSchema, type SchoolInfoForm } from "@/features/onboarding/schema";
import { Icon } from "@/shared/components/icon";
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
import { cn } from "@/shared/lib/utils";

const STEPS = ["School Info", "Infrastructure", "Staff Setup", "Curriculum", "Finance", "Go Live"];
const INSTITUTION_TYPES = ["K-12 School", "Higher Secondary", "College", "University", "Coaching Center"];
const BOARDS = ["CBSE", "ICSE", "State Board", "IB", "Cambridge (IGCSE)"];

export function OnboardingFlow() {
  const router = useRouter();
  const currentStep = 0;

  const form = useForm<SchoolInfoForm>({
    resolver: zodResolver(schoolInfoSchema),
    defaultValues: {
      schoolName: "",
      institutionType: "",
      educationBoard: "",
      affiliationKey: "",
      officialEmail: "",
      primaryPhone: "",
    },
    mode: "onTouched",
  });

  const onSubmit = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-surface-container-low">
      <header className="flex h-16 items-center justify-between border-b border-outline-variant bg-surface-bright px-4 md:px-10">
        <span className="font-display text-headline-md font-bold text-primary">ScholarSync</span>
        <button type="button" className="flex items-center gap-2 text-label-md text-on-surface-variant hover:text-on-surface">
          Save Progress
          <Icon name="help" size={18} />
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <ol className="mb-10 flex items-center justify-between">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center">
              <div className={cn("flex items-center gap-2", i > currentStep && "opacity-50")}>
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border text-xs font-bold",
                    i <= currentStep
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline text-on-surface-variant",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("hidden text-label-md sm:inline", i === currentStep && "font-bold text-primary")}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 ? <div className="mx-2 h-px flex-1 bg-outline-variant" /> : null}
            </li>
          ))}
        </ol>

        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:p-10">
          <h1 className="font-display text-headline-md text-on-surface">School Profile</h1>
          <p className="mt-1 text-body-md text-on-surface-variant">
            Tell us about your educational institution to personalize your administrative workspace.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-label-md text-on-surface-variant">School Logo</span>
                  <button
                    type="button"
                    className="flex size-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container text-on-surface-variant"
                  >
                    <Icon name="add_photo_alternate" />
                    <span className="text-[10px] uppercase">Upload</span>
                  </button>
                </div>
                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-label-md text-on-surface">School Name *</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl bg-surface"
                          placeholder="e.g. Oakridge International Academy"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <OnboardingSelect name="institutionType" label="Institution Type *" options={INSTITUTION_TYPES} placeholder="Select Type" control={form.control} />
                <OnboardingSelect name="educationBoard" label="Education Board *" options={BOARDS} placeholder="Select Board" control={form.control} />
              </div>

              <FormField
                control={form.control}
                name="affiliationKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-label-md text-on-surface">Affiliation Number / License Key</FormLabel>
                    <FormControl>
                      <Input className="rounded-xl bg-surface" placeholder="e.g. CBSE/AFF/213001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="officialEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-label-md text-on-surface">Official Email *</FormLabel>
                      <FormControl>
                        <Input className="rounded-xl bg-surface" placeholder="admin@school.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primaryPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-label-md text-on-surface">Primary Phone *</FormLabel>
                      <FormControl>
                        <Input className="rounded-xl bg-surface" placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-label-md text-on-surface-variant">* Mandatory fields for setup.</p>
                <Button type="submit" className="rounded-xl">
                  Continue
                  <Icon name="arrow_forward" size={18} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}

function OnboardingSelect({
  name,
  label,
  options,
  placeholder,
  control,
}: {
  name: "institutionType" | "educationBoard";
  label: string;
  options: string[];
  placeholder: string;
  control: ReturnType<typeof useForm<SchoolInfoForm>>["control"];
}) {
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
