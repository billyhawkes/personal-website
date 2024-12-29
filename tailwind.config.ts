import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						blockquote: {
							quotes: "none",
						},
					},
				},
			},
		},
	},
	plugins: [typography],
} satisfies Config;
