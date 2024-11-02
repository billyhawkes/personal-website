import "./global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<main className="min-h-screen bg-zinc-900 w-screen flex flex-col gap-8 justify-center text-white p-4 sm:p-8">
					{children}
				</main>
			</body>
		</html>
	);
}
