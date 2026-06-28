import { z } from "zod";

export const schoolInfoSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  institutionType: z.string().min(1, "Select an institution type"),
  educationBoard: z.string().min(1, "Select an education board"),
  affiliationKey: z.string().optional(),
  officialEmail: z.string().email("Enter a valid email"),
  primaryPhone: z.string().min(7, "Enter a valid phone number"),
});

export type SchoolInfoForm = z.infer<typeof schoolInfoSchema>;
