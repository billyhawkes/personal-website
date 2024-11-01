import { linkIcons } from "@/lib/icons";
import { links } from "@/lib/links";
import { getPayload } from "@/lib/payload";
import { seo } from "@/lib/seo";
import { Media } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

const getProject = cache(async (id: string) => {
	const payload = await getPayload();

	const project = await payload.findByID({
		collection: "projects",
		id,
	});

	return project;
});

export const generateStaticParams = async () => {
	const payload = await getPayload();

	const projects = await payload.find({
		collection: "projects",
	});

	return projects.docs.map((project) => ({
		id: project.id.toString(),
	}));
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;
	const project = await getProject(id);
	const image = project.image as Media;

	return seo({
		...project,
		image,
		keywords: project.category,
		path: `/projects/${id}`,
	});
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;
	const project = await getProject(id);

	return (
		<>
			{typeof project.image !== "number" && project.image.url ? (
				<Image
					src={project.image.url}
					width={150}
					height={150}
					alt={project.image.alt}
					className="rounded-xl"
				/>
			) : null}
			<h1 className="sm:text-7xl">{project.title}</h1>
			<p>{project.description}</p>
			<div className="flex gap-3">
				{project.links?.map((link) => (
					<Link
						key={link.id}
						href={link.url}
						target="_blank"
						className="bg-white flex items-center text-gray-600 rounded h-8 px-4 text-sm font-medium gap-2"
					>
						{linkIcons[link.type]}
						{links.find((l) => l.value === link.type)?.label}
					</Link>
				))}
			</div>
		</>
	);
};

export default Page;
