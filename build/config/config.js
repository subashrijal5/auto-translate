"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    LOCALIZE_API_KEY: process.env.LOCALIZE_API_KEY,
    LOCALE_BASE_PATH: process.env.LOCALE_BASE_PATH ?? "/locales",
    LOCALIZE_API_URL: process.env.LOCALIZE_API_URL ?? "https://langlift.bhudex.com",
    GROUPED: process.env.GROUPED ? process.env.GROUPED : "true",
    LOCALIZE_DEFAULT_FILE_NAME: process.env.LOCALIZE_DEFAULT_FILE_NAME ?? "default",
};
