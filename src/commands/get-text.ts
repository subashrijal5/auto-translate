import { ConfigType } from "../types/config";
import { ApiClient } from "../utils/api";
import { FileHandler } from "../utils/file-handler";

export class GetTexts {
	private apiClient: ApiClient;
	private fileHandler: FileHandler;

	constructor(protected config: ConfigType) {
		this.validateKeys(config);
		this.apiClient = new ApiClient(
      config.LOCALIZE_API_KEY!,
      config.LOCALIZE_API_URL!,
		);
		this.fileHandler = new FileHandler(config.LOCALE_BASE_PATH!);
	}

	/**
   * Validates the configuration object.
   * @param config - The configuration object containing various properties.
   * @throws {Error} - Throws an error if any of the required properties are missing in the `config` object.
   */
	private validateKeys(config: ConfigType) {
		const requiredProperties: (keyof ConfigType)[] = [
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

	public async initiate() {
		try {
			const languages = await this.apiClient.getProjectLanguages();
			console.log("languages", languages);

			languages.map(async (language) => {
				const strings = await this.apiClient.getLanguageStrings(
					language.short_code,
				);

				this.fileHandler.writeFile(language.short_code, strings);
			});
		} catch (error) {
			console.error("error", error, this.fileHandler);
		}
	}
}
