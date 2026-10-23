import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.md",
  }),
  schema: z.object({
    canonicalUrl: z.url().optional(),
    description: z.string().min(80).max(180),
    draft: z.boolean().default(true),
    locale: z.enum(["en", "pt-br"]),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    title: z.string().min(10).max(80),
    translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
