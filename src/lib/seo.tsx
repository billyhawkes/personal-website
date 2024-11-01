import { Media } from "@/payload-types";

export const seo = ({
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
	const fullTitle = `${title} | Billy Hawkes`;
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
			images: [image],
		},
		twitter: {
			card: "summary_large_image",
			site: "Billy Hawkes",
			creator: "Billy Hawkes",
			title: `${title} | Billy Hawkes`,
			description,
			images: [image],
		},
		alternates: {
			canonical,
		},
	};
};
