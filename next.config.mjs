import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.billyhawkes.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default withPayload(nextConfig);
