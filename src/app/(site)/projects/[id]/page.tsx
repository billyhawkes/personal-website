import { getPayload } from "@/lib/payload";
import { seo } from "@/lib/seo";
import { Media } from "@/payload-types";
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
		id: project.id,
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
		<div>
			<h1 className="text-3xl">{project.title}</h1>
			<p>{project.description}</p>
			{project.links?.map((link) => <a href={link.url}>{link.type}</a>)}
		</div>
	);
};

export default Page;
