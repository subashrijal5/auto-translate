import { BilingualError } from "../errors/BilingualError";
import { Command } from "./command";

export class GetTexts extends Command {
	public async execute() {
		try {
			const languages = await this.apiClient.getProjectLanguages();

			languages.map(async (language) => {
				const strings = await this.apiClient.getLanguageStrings(
					language.short_code
				);

				this.fileHandler.writeFile(language.short_code, strings);
			});
		} catch (error) {
			if (error instanceof BilingualError) {
				console.error(error.message, error.toJSON());
				return;
			}
			console.error("error", error, this.fileHandler);
		}
	}
}
