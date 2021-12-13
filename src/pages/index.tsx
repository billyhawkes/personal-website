import type { NextPage } from "next";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Head from "next/head";
import React from "react";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Billy Hawkes</title>
				<meta
					name="description"
					content="Billy Hawkes personal website."
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Open+Sans&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="h-screen flex justify-center items-center">
				<section className="flex flex-col items-center">
					<h1 className="text-5xl sm:text-7xl">Billy Hawkes</h1>
					<hr className="w-12 h-1 rounded bg-white my-10" />
					<div className="flex w-48 sm:w-64 justify-between">
						<Link href="https://github.com/billyhawkes">
							<FaGithub className="w-8 h-8 sm:w-10 sm:h-10 hover:opacity-80 cursor-pointer" />
						</Link>
						<Link href="mailto:billyhawkes02@gmail.com">
							<FaEnvelope className="w-8 h-8 sm:w-10 sm:h-10 hover:opacity-80 cursor-pointer" />
						</Link>
						<Link href="https://www.linkedin.com/in/billy-hawkes/">
							<FaLinkedin className="w-8 h-8 sm:w-10 sm:h-10 hover:opacity-80 cursor-pointer" />
						</Link>
					</div>
				</section>
			</main>
			<footer className="p-2 flex justify-between fixed bottom-0 w-screen text-sm">
				<p className="opacity-50">© 2021 Billy Hawkes</p>
				<p className="opacity-50">Work in progress (version 0.0.1)</p>
			</footer>
		</>
	);
};

export default Home;
