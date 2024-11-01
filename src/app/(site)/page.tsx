import { linkIcons } from "@/lib/icons";
import { links } from "@/lib/links";
import { Project } from "@/payload-types";
import configPromise from "@payload-config";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

const Home = async () => {
	const payload = await getPayload({
		config: configPromise,
	});

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
		<main className="min-h-screen bg-zinc-900 w-screen flex flex-col gap-8 justify-center text-white p-4 sm:p-8">
			<h1 className="text-5xl sm:text-8xl font-medium">Billy Hawkes</h1>
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
									{typeof project.image !== "number" && project.image.url ? (
										<Image
											src={project.image.url}
											width={150}
											height={150}
											alt={project.image.alt}
											className="rounded-xl"
										/>
									) : null}
									<div className="flex flex-1 flex-col items-start gap-4">
										<p className="font-bold text-2xl">{project.title}</p>
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
		</main>
	);
};

export default Home;
