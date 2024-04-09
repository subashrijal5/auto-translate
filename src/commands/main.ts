import { config as envConfig } from "dotenv";

envConfig();

import { GetTexts } from "./get-text";
import { config } from "../config/config";
import { PushTexts } from "./push-text";

const getText = new GetTexts(config);
const pushText = new PushTexts(config);

export const syncLocale = async () => {
	await getText.execute().catch((e) => console.error(e));
};

export const pushLocales = async () => {
	await pushText.execute().catch((e) => console.error(e));
};