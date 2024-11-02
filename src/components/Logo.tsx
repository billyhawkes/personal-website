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
