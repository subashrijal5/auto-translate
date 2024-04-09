import { getLocaleCodeMapFromServer } from "../config/config";
import { Command } from "./command";

export class PushTexts extends Command {

	public async execute(): Promise<void> {
		console.info("🚀 ~ PushTexts ~ Reading current locales \n");
		const localeLanguageCodes =  this.fileHandler.getCurrentLanguageCodes();
		
		console.info("\n 🚀 ~ PushTexts ~ Getting Project info");
		const project = await this.apiClient.getProject();
		const baseLanguage = project.data.base_language;

		console.info(`🚀 ~ PushTexts ~ Getting local files for language ${baseLanguage}\n`);

		const getMappedBaseLanguage = getLocaleCodeMapFromServer(baseLanguage);

		if(!localeLanguageCodes.includes(getMappedBaseLanguage)){
			throw new Error(`🚀 ~ PushTexts ~Base language ${getMappedBaseLanguage} is not in the current locales\n`);
		}

		console.info("🚀 ~ PushTexts ~ locale files of base language");
		const baseLanguageStrings = this.fileHandler.getStringsFromLocales(baseLanguage);
		// console.log("🚀 ~ PushTexts ~ execute ~ baseLanguageStrings:");
		console.info("🚀 ~ PushTexts ~ Sending strings to the server.\n");
		const response =  await this.apiClient.pushLanguageString(baseLanguage, baseLanguageStrings);
		console.info("🚀 ~ PushTexts ~ Completed pushing the strings.\n", response, "\n");

		process.exit(1);
        
	}
}
