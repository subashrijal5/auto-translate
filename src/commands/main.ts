import { config as envConfig } from "dotenv";

envConfig();

import { GetTexts } from "./get-text";
import { config } from "../config/config";

const client = new GetTexts(config);

export const syncLocale = async () => {
	await client.initiate().catch((e) => console.log(e));
};
