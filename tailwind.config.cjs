/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        colors: {
            primary: "#425FA9",
            background: "#25272F",
            white: "#FFFFFF",
        },
        fontFamily: {
            header: ['"Josefin Sans"', "sans"],
            body: ['"Open Sans"', "sans"],
        },
    },
    plugins: [],
}
