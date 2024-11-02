import { Media } from "@/payload-types";
import { getPayload } from "./payload";

export const seo = async ({
	title,
	description,
	keywords,
	image,
	path = "/",
	createdAt,
	updatedAt,
}: {
	title: string;
	description?: string;
	image?: Media;
	keywords?: string;
	path?: string;
	createdAt?: string;
	updatedAt?: string;
}) => {
	const payload = await getPayload();
	const config = await payload.findGlobal({
		slug: "config",
	});
	const favicon = config.favicon as Media | undefined;

	const fullTitle = `${title} | ${config.title}`;
	const canonical = `https://billyhawkes.com${path}`;

	return {
		title: fullTitle,
		authors: [
			{
				name: "Billy Hawkes",
			},
		],
		description,
		keywords,
		openGraph: {
			title: fullTitle,
			description,
			type: "article",
			url: canonical,
			publishedTime: createdAt,
			modifiedTime: updatedAt,
			//   authors: ["https://dminhvu.com/about"],
			//   tags: categories,
			images: [image, favicon],
		},
		twitter: {
			card: "summary_large_image",
			site: "Billy Hawkes",
			creator: "Billy Hawkes",
			title: fullTitle,
			description,
			images: [image, favicon],
		},
		alternates: {
			canonical,
		},
		icons: [
			...(favicon
				? [
						{
							rel: "icon",
							url: favicon.url,
						},
					]
				: []),
		],
	};
};
