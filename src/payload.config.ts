// storage-adapter-import-placeholder
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { ThreeColumnBlock } from "@/blocks/ThreeColumn";
import { s3Storage } from "@payloadcms/storage-s3";
import { Config } from "./collections/Config";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
		components: {
			graphics: {
				Icon: {
					path: "/components/Logo.tsx#Icon",
				},
				Logo: {
					path: "/components/Logo.tsx#Logo",
				},
			},
		},
		livePreview: {
			url: process.env.NEXT_PUBLIC_SITE_URL || "",
			collections: ["projects"],
			breakpoints: [
				{
					label: "Mobile",
					name: "mobile",
					width: 375,
					height: 667,
				},
				{
					label: "Tablet",
					name: "tablet",
					width: 768,
					height: 1024,
				},
				{
					label: "Desktop",
					name: "desktop",
					width: 1440,
					height: 900,
				},
			],
		},
	},
	collections: [Users, Media, Projects],
	globals: [Config],
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			BlocksFeature({
				blocks: [ThreeColumnBlock],
			}),
		],
	}),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: sqliteAdapter({
		client: {
			url: process.env.DATABASE_URL || "",
			authToken: process.env.DATABASE_TOKEN || "",
		},
	}),
	sharp,
	plugins: [
		s3Storage({
			collections: {
				media: {
					disablePayloadAccessControl: true,
					generateFileURL: ({ filename }) => {
						return `${process.env.NEXT_PUBLIC_R2_URL}/${filename}`;
					},
				},
			},
			bucket: process.env.R2_BUCKET || "",
			config: {
				credentials: {
					accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
					secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
				},
				// region: process.env.R2_REGION || "",
				endpoint: process.env.R2_ENDPOINT || "",
			},
		}),
	],
});
