import { links } from "@/lib/links";
import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
	slug: "projects",
	admin: {
		useAsTitle: "title",
		livePreview: {
			url: ({ data }) => `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${data.id}`,
		},
	},
	versions: {
		drafts: {
			autosave: {
				interval: 375,
			},
		},
	},
	hooks: {
		afterChange: [
			async ({ doc }) => {
				if (doc._status === "published") {
					revalidatePath("/");
					revalidatePath(`/projects/${doc.id}`);
				}
			},
		],
	},

	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
			required: true,
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
			required: true,
		},
		{
			name: "image",
			label: "Image",
			type: "relationship",
			relationTo: "media",
			required: true,
		},
		{
			name: "category",
			label: "Category",
			type: "select",
			options: [
				{
					label: "Notion Template",
					value: "notion",
				},
				{
					label: "Software",
					value: "software",
				},
				{
					label: "Game",
					value: "game",
				},
			],
			required: true,
		},
		{
			name: "links",
			label: "Links",
			type: "array",
			fields: [
				{
					name: "type",
					label: "Type",
					type: "select",
					options: links,
					required: true,
				},
				{
					name: "url",
					label: "URL",
					type: "text",
					required: true,
				},
			],
		},
	],
};
