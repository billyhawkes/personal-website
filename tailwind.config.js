module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		colors: {
			primary: "#425FA9",
			background: "#25272F",
			white: "#FFFFFF",
		},
		fontFamily: {
			display: ['"Josefin Sans"', "sans"],
			body: ['"Open Sans"', "sans"],
		},
	},
	plugins: [],
};
