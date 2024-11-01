import { linkIcons } from "@/lib/icons";
import { links } from "@/lib/links";
import { getPayload } from "@/lib/payload";
import { seo } from "@/lib/seo";
import { Project } from "@/payload-types";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = seo({
	title: "Home",
	description: "Billy Hawkes' personal website",
	keywords: "portfolio, projects, software, games, notion templates",
});

const Page = async () => {
	const payload = await getPayload();

	const projects = await payload.find({
		collection: "projects",
	});

	const groupedProjects = projects.docs.reduce<Record<string, Project[]>>((acc, project) => {
		if (!acc[project.category]) {
			acc[project.category] = [];
		}
		acc[project.category].push(project);
		return acc;
	}, {});

	return (
		<>
			<h1 className="text-5xl sm:text-8xl">Billy Hawkes</h1>
			<div className="h-1 rounded w-20 bg-white"></div>
			<div className="flex gap-4">
				<Link href={`${process.env.PUBLIC_GITHUB}`} target="_blank">
					<Github size={40} />
				</Link>
				<Link href={`${process.env.PUBLIC_TWITTER}`} target="_blank">
					<Twitter size={40} />
				</Link>
				<Link href={`${process.env.PUBLIC_LINKEDIN}`} target="_blank">
					<Linkedin size={40} />
				</Link>
			</div>
			{Object.entries(groupedProjects)
				.sort((a, b) => {
					if (a[0] === "software") return -1;
					if (b[0] === "software") return 1;
					return 0;
				})
				.map(([category, projects]) => (
					<>
						<h3 className="text-lg font-extralight tracking-widest">
							{category.toUpperCase()}
						</h3>
						<div className="gap-4 flex flex-wrap">
							{projects.map((project) => (
								<div key={project.id} className="flex gap-4">
									<Link href={`/projects/${project.id}`}>
										{typeof project.image !== "number" && project.image.url ? (
											<Image
												src={project.image.url}
												width={150}
												height={150}
												alt={project.image.alt}
												className="rounded-xl"
											/>
										) : null}
									</Link>
									<div className="flex flex-1 flex-col items-start gap-4">
										<Link href={`/projects/${project.id}`}>
											<p className="font-bold text-2xl hover:underline">
												{project.title}
											</p>
										</Link>
										<p className="text-sm text-gray-300 line-clamp-2">
											{project.description}
										</p>
										<div className="flex gap-3">
											{project.links?.map((link) => (
												<Link
													key={link.id}
													href={link.url}
													target="_blank"
													className="bg-white flex items-center text-gray-600 rounded h-8 px-4 text-sm font-medium gap-2"
												>
													{linkIcons[link.type]}
													{
														links.find((l) => l.value === link.type)
															?.label
													}
												</Link>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				))}
		</>
	);
};

export default Page;
