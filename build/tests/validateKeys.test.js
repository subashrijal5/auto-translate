"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_text_1 = require("../commands/get-text");
describe("validateKeys", () => {
    // Validates a configuration object with all required properties set.
    it("should validate a configuration object with all required properties set", () => {
        const config = {
            LOCALIZE_API_KEY: "api_key",
            LOCALE_BASE_PATH: "LOCALE_BASE_PATH",
            LOCALIZE_API_URL: "api_url",
            GROUPED: "true",
            LOCALIZE_DEFAULT_FILE_NAME: "file_name",
        };
        expect(() => {
            new get_text_1.GetTexts(config);
        }).not.toThrow();
    });
    // Validates a configuration object with some optional properties set.
    it("should validate a configuration object with some optional properties set", () => {
        const config = {
            LOCALIZE_API_KEY: "api_key",
            LOCALE_BASE_PATH: "LOCALE_BASE_PATH",
            LOCALIZE_API_URL: "api_url",
            GROUPED: "true",
            LOCALIZE_DEFAULT_FILE_NAME: undefined,
        };
        expect(() => {
            new get_text_1.GetTexts(config);
        }).toThrow();
    });
    // Validates a configuration object with all properties set to empty strings.
    it("should validate a configuration object with all properties set to empty strings", () => {
        const config = {
            LOCALIZE_API_KEY: "",
            LOCALE_BASE_PATH: "",
            LOCALIZE_API_URL: "",
            GROUPED: "false",
            LOCALIZE_DEFAULT_FILE_NAME: "",
        };
        expect(() => {
            new get_text_1.GetTexts(config);
        }).toThrow();
    });
    // Validates a configuration object with some required properties missing.
    it("should throw an error when a required property is missing", () => {
        const config = {
            LOCALIZE_API_KEY: "api_key",
            LOCALE_BASE_PATH: "LOCALE_BASE_PATH",
            LOCALIZE_API_URL: undefined,
            GROUPED: "true",
            LOCALIZE_DEFAULT_FILE_NAME: "file_name",
        };
        expect(() => {
            new get_text_1.GetTexts(config);
        }).toThrowError("LOCALIZE_API_URL is not set in env");
    });
    // Validates a configuration object with all required properties missing.
    it("should throw an error when all required properties are missing", () => {
        const config = {
            LOCALIZE_API_KEY: undefined,
            LOCALE_BASE_PATH: undefined,
            LOCALIZE_API_URL: undefined,
            GROUPED: "false",
            LOCALIZE_DEFAULT_FILE_NAME: undefined,
        };
        expect(() => {
            new get_text_1.GetTexts(config);
        }).toThrowError("LOCALIZE_API_KEY is not set in env");
    });
    // Validates a configuration object with some required properties set to empty strings.
    it("should throw an error when a required property is set to an empty string", () => {
        const config = {
            LOCALIZE_API_KEY: "api_key",
            LOCALE_BASE_PATH: "",
            LOCALIZE_API_URL: "api_url",
            GROUPED: "true",
            LOCALIZE_DEFAULT_FILE_NAME: "file_name",
        };
        expect(() => {
            new get_text_1.GetTexts(config);
        }).toThrowError("LOCALE_BASE_PATH is not set in env");
    });
});
