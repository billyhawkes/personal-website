import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const docs = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/docs" }),
	schema: z.object({
		title: z.string(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/projects" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(["Software", "Games", "Notion"]),
		site: z.string(),
		github: z.string().optional(),
	}),
});

export const collections = {
	docs,
	projects,
};
