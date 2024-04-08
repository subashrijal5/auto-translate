import { GetTexts } from "../commands/get-text";
import { ConfigType } from "../types/config";

describe("validateKeys", () => {
	// Validates a configuration object with all required properties set.
	it("should validate a configuration object with all required properties set", () => {
		const config: ConfigType = {
			BILINGUAL_API_KEY: "api_key",
			LOCALE_BASE_PATH: "LOCALE_BASE_PATH",
			BILINGUAL_API_URL: "api_url",
			GROUPED: "true",
			BILINGUAL_DEFAULT_FILE_NAME: "file_name",
		};

		expect(() => {
			new GetTexts(config);
		}).not.toThrow();
	});

	// Validates a configuration object with some optional properties set.
	it("should validate a configuration object with some optional properties set", () => {
		const config: ConfigType = {
			BILINGUAL_API_KEY: "api_key",
			LOCALE_BASE_PATH: "LOCALE_BASE_PATH",
			BILINGUAL_API_URL: "api_url",
			GROUPED: "true",
			BILINGUAL_DEFAULT_FILE_NAME: undefined,
		};

		expect(() => {
			new GetTexts(config);
		}).toThrow();
	});

	// Validates a configuration object with all properties set to empty strings.
	it("should validate a configuration object with all properties set to empty strings", () => {
		const config: ConfigType = {
			BILINGUAL_API_KEY: "",
			LOCALE_BASE_PATH: "",
			BILINGUAL_API_URL: "",
			GROUPED: "false",
			BILINGUAL_DEFAULT_FILE_NAME: "",
		};

		expect(() => {
			new GetTexts(config);
		}).toThrow();
	});

	// Validates a configuration object with some required properties missing.
	it("should throw an error when a required property is missing", () => {
		const config: ConfigType = {
			BILINGUAL_API_KEY: "api_key",
			LOCALE_BASE_PATH: "LOCALE_BASE_PATH",
			BILINGUAL_API_URL: undefined,
			GROUPED: "true",
			BILINGUAL_DEFAULT_FILE_NAME: "file_name",
		};

		expect(() => {
			new GetTexts(config);
		}).toThrowError("BILINGUAL_API_URL is not set in env");
	});

	// Validates a configuration object with all required properties missing.
	it("should throw an error when all required properties are missing", () => {
		const config: ConfigType = {
			BILINGUAL_API_KEY: undefined,
			LOCALE_BASE_PATH: undefined,
			BILINGUAL_API_URL: undefined,
			GROUPED: "false",
			BILINGUAL_DEFAULT_FILE_NAME: undefined,
		};

		expect(() => {
			new GetTexts(config);
		}).toThrowError("BILINGUAL_API_KEY is not set in env");
	});

	// Validates a configuration object with some required properties set to empty strings.
	it("should throw an error when a required property is set to an empty string", () => {
		const config: ConfigType = {
			BILINGUAL_API_KEY: "api_key",
			LOCALE_BASE_PATH: "",
			BILINGUAL_API_URL: "api_url",
			GROUPED: "true",
			BILINGUAL_DEFAULT_FILE_NAME: "file_name",
		};

		expect(() => {
			new GetTexts(config);
		}).toThrowError("LOCALE_BASE_PATH is not set in env");
	});
});
