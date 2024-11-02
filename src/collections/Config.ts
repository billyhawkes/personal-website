import type { GlobalConfig } from "payload";

export const Config: GlobalConfig = {
	slug: "config",
	fields: [
		{
			name: "title",
			label: "Site Title",
			type: "text",
		},
		{
			name: "favicon",
			type: "relationship",
			relationTo: "media",
		},
		{
			name: "logo",
			type: "relationship",
			relationTo: "media",
		},
	],
};
