import { ConfigType } from "../types/config";

export function getFileMap(){
	const fileMapEnv = process.env.LANGUAGE_CODE_MAP;
	const fileMapSplit = (fileMapEnv ?? "").split(",");
	const fileMap = fileMapSplit.reduce((acc: Record<string, string>, curr) => {
		const [key, value] = curr.split(":");
		acc[key] = value;
		return acc;
	}, {});
	return fileMap;
}
const fileMap = getFileMap();
export function getLocaleCodeMapFromServer(langCode: string){
	const locale = Object.keys(fileMap).find((key)=> fileMap[key] === langCode);
	return locale ?? langCode;
}

export const config: ConfigType = {
	BILINGUAL_API_KEY: process.env.BILINGUAL_API_KEY,
	LOCALE_BASE_PATH: process.env.LOCALE_BASE_PATH ?? "/locales",
	BILINGUAL_API_URL:
    process.env.BILINGUAL_API_URL ?? "https://bilingualapp.vuvusha.com",
	GROUPED: process.env.GROUPED
		? (process.env.GROUPED as "true" | "false")
		: "true",
	BILINGUAL_DEFAULT_FILE_NAME:
    process.env.BILINGUAL_DEFAULT_FILE_NAME ?? "default",

};
