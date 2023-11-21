import { ConfigType } from "../types/config";

export const config : ConfigType = {
    LOCALIZE_API_KEY: process.env.LOCALIZE_API_KEY,
    LOCALE_BASE_PATH: process.env.LOCALE_BASE_PATH ?? "/locales",
    LOCALIZE_API_URL: process.env.LOCALIZE_API_URL ?? "https://langlift.bhudex.com",
    GROUPED: process.env.GROUPED ? process.env.GROUPED as "true"| "false" : "true" ,
    LOCALIZE_DEFAULT_FILE_NAME: process.env.LOCALIZE_DEFAULT_FILE_NAME ?? "default",
};
