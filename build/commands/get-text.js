"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTexts = void 0;
const api_1 = require("../utils/api");
const file_handler_1 = require("../utils/file-handler");
class GetTexts {
    constructor(config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: config
        });
        Object.defineProperty(this, "apiClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fileHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.validateKeys(config);
        this.apiClient = new api_1.ApiClient(config.LOCALIZE_API_KEY, config.LOCALIZE_API_URL);
        this.fileHandler = new file_handler_1.FileHandler(config.LOCALE_BASE_PATH);
    }
    /**
     * Validates the configuration object.
     * @param config - The configuration object containing various properties.
     * @throws {Error} - Throws an error if any of the required properties are missing in the `config` object.
     */
    validateKeys(config) {
        const requiredProperties = [
            "LOCALIZE_API_KEY",
            "LOCALE_BASE_PATH",
            "LOCALIZE_API_URL",
            "GROUPED",
            "LOCALIZE_DEFAULT_FILE_NAME",
        ];
        for (const property of requiredProperties) {
            if (!config[property]) {
                throw new Error(`${property} is not set in env`);
            }
        }
    }
    async initiate() {
        try {
            const languages = await this.apiClient.getProjectLanguages();
            console.log('languages', languages);
            languages.map(async (language) => {
                const strings = await this.apiClient.getLanguageStrings(language.short_code);
                this.fileHandler.writeFile(language.short_code, strings);
            });
        }
        catch (error) {
            console.error('error', error, this.fileHandler);
        }
    }
}
exports.GetTexts = GetTexts;
