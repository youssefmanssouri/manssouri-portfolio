import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(150, "Email cannot exceed 150 characters"),
  company: z
    .string()
    .trim()
    .max(100, "Company name cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(50, "Phone number cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),
  projectType: z
    .string()
    .trim()
    .min(1, "Please select an inquiry type")
    .max(100, "Inquiry type cannot exceed 100 characters"),
  budget: z
    .string()
    .trim()
    .max(100, "Budget range cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message cannot exceed 3000 characters"),
  website_confirm: z.string().max(100).optional(), // Honeypot anti-spam field
  language: z.string().max(10).optional().default("en"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
