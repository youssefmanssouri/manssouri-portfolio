import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(100).optional().or(z.literal("")),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000, "Message too long"),
  website_confirm: z.string().optional(), // Honeypot field - must be empty
  language: z.string().optional().default("en"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
