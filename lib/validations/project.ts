import { z } from "zod";

export const createProjectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase alphanumeric characters and hyphens"),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title cannot exceed 200 characters"),
  category: z.string().trim().max(100).default("WEB DEVELOPMENT"),
  type: z.string().trim().max(100).default("PERSONAL PROJECT"),
  taglineEn: z.string().trim().max(300).default(""),
  taglineFr: z.string().trim().max(300).default(""),
  descriptionEn: z.string().trim().min(2, "English description is required").max(5000),
  descriptionFr: z.string().trim().min(2, "French description is required").max(5000),
  overviewEn: z.string().trim().max(5000).default(""),
  overviewFr: z.string().trim().max(5000).default(""),
  objectiveEn: z.string().trim().max(5000).default(""),
  objectiveFr: z.string().trim().max(5000).default(""),
  outcomeEn: z.string().trim().max(5000).default(""),
  outcomeFr: z.string().trim().max(5000).default(""),
  featured: z.boolean().default(true),
  published: z.boolean().default(true),
  editorialVariant: z.string().trim().max(100).default("featured-large"),
  githubUrl: z.string().trim().max(500).default("https://github.com/youssefmanssouri"),
  liveUrl: z.string().trim().max(500).nullable().optional(),
  heroImage: z.string().trim().max(500).default("/images/projects/businessos-main.jpg"),
  technologies: z.array(z.string().trim().max(50)).max(50).default([]),
  features: z
    .array(
      z.object({
        titleEn: z.string().trim().max(200),
        titleFr: z.string().trim().max(200),
        descriptionEn: z.string().trim().max(1000).nullable().optional(),
        descriptionFr: z.string().trim().max(1000).nullable().optional(),
      })
    )
    .max(50)
    .default([]),
  challenges: z
    .array(
      z.object({
        textEn: z.string().trim().max(500),
        textFr: z.string().trim().max(500),
      })
    )
    .max(50)
    .default([]),
});

export const updateProjectSchema = z.object({
  id: z.string().trim().min(1, "Project ID is required"),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  title: z.string().trim().min(2).max(200).optional(),
  category: z.string().trim().max(100).optional(),
  type: z.string().trim().max(100).optional(),
  taglineEn: z.string().trim().max(300).optional(),
  taglineFr: z.string().trim().max(300).optional(),
  descriptionEn: z.string().trim().max(5000).optional(),
  descriptionFr: z.string().trim().max(5000).optional(),
  overviewEn: z.string().trim().max(5000).optional(),
  overviewFr: z.string().trim().max(5000).optional(),
  objectiveEn: z.string().trim().max(5000).optional(),
  objectiveFr: z.string().trim().max(5000).optional(),
  outcomeEn: z.string().trim().max(5000).optional(),
  outcomeFr: z.string().trim().max(5000).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  editorialVariant: z.string().trim().max(100).optional(),
  githubUrl: z.string().trim().max(500).optional(),
  liveUrl: z.string().trim().max(500).nullable().optional(),
  heroImage: z.string().trim().max(500).optional(),
});
