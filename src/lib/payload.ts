import configPromise from "@payload-config";
import { getPayload as gPL } from "payload";

export const getPayload = async () =>
	await gPL({
		config: configPromise,
	});
