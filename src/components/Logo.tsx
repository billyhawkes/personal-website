import { getPayload } from "@/lib/payload";
import { Media } from "@/payload-types";
import Image from "next/image";

export const Logo = async () => {
	const payload = await getPayload();
	const config = await payload.findGlobal({
		slug: "config",
	});
	const logo = config.logo as Media | undefined;

	if (logo) {
		return <Image src={logo.url!} width={150} height={150} alt={logo.alt} />;
	}

	return null;
};

export const Icon = async () => {
	const payload = await getPayload();
	const config = await payload.findGlobal({
		slug: "config",
	});
	const icon = config.favicon as Media | undefined;

	if (icon) {
		return <Image src={icon.url!} width={150} height={150} alt={icon.alt} />;
	}

	return null;
};
