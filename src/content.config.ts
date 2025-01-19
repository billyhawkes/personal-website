import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/docs" }),
  schema: z.object({
    title: z.string(),
    guides: z.array(reference("guides")),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum(["Software", "Games", "Notion"]),
      site: z.string(),
      ios: z.string().optional(),
      android: z.string().optional(),
      github: z.string().optional(),
      cover: image().optional(),
    }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/guides" }),
  schema: z.object({
    title: z.string(),
    stack: z.enum(["Tanstack Start", "SST", "AWS", "AWS ElastiCache"]).array(),
    docs: z.array(reference("docs")),
  }),
});

export const collections = {
  docs,
  projects,
  guides,
};
