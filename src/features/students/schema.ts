import { z } from "zod";

export const admissionSchema = z.object({
  // Step 1 - Student details
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    message: "Select a gender",
  }),
  gradeClass: z.string().min(1, "Select a class"),
  section: z.string().min(1, "Select a section"),
  academicSession: z.string().min(1, "Select a session"),
  studentEmail: z.union([z.literal(""), z.email("Enter a valid email")]),
  emergencyPhone: z.string().min(7, "Enter a valid phone number"),
  address: z.string().min(1, "Address is required"),

  // Step 2 - Parental info
  parentName: z.string().min(1, "Parent name is required"),
  parentRelation: z.string().min(1, "Relation is required"),
  parentPhone: z.string().min(7, "Enter a valid phone number"),
  parentEmail: z.union([z.literal(""), z.email("Enter a valid email")]),
});

export type AdmissionForm = z.infer<typeof admissionSchema>;

export const admissionDefaults: AdmissionForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "male",
  gradeClass: "",
  section: "",
  academicSession: "2024-2025",
  studentEmail: "",
  emergencyPhone: "",
  address: "",
  parentName: "",
  parentRelation: "",
  parentPhone: "",
  parentEmail: "",
};
