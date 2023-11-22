import { config } from "../config/config";
import {
	LanguageType,
	SingleStringGroup,
	SingleStringType,
} from "../types/get-text";

export class ApiClient {
	protected token: string;
	protected baseUrl: string;

	constructor(token: string, baseUrl: string) {
		this.token = token;
		this.baseUrl = baseUrl;
	}

	/**
   * Validates the project by making a GET request to the project URL with the provided API key.
   *
   * @throws {Error} If an error occurs during the request or if the API key is invalid.
   */
	public async validateProject() {
		try {
			const projectUrl = new URL(this.baseUrl + "/api/projects");
			await fetch(projectUrl, {
				method: "GET",
				headers: {
					"X-PROJECT-KEY": this.token,
				},
			});
		} catch (e) {
			throw Error("Invalid api key");
		}
	}

	/**
   * Retrieves the languages used in a project.
   *
   * @returns {Promise<object>} The languages used in the project, returned as JSON data.
   *
   * @example
   * const apiClient = new ApiClient(token, baseUrl);
   * const languages = await apiClient.getProjectLanguages();
   * console.log(languages);
   */
	public async getProjectLanguages(): Promise<LanguageType[]> {
		const languageUrl = new URL(this.baseUrl + "/api/projects/languages");
		const response = await fetch(languageUrl, {
			method: "GET",
			headers: {
				"X-PROJECT-KEY": this.token,
				Accept: "application/json",
			},
		});
		return response.json();
	}

	/**
   * Retrieves the language strings for a specific language in a project.
   *
   * @param language - The language code for which to retrieve the language strings.
   * @returns A Promise that resolves to an object representing the language strings for the specified language.
   *
   * @example
   * const apiClient = new ApiClient(token, baseUrl);
   * const language = "en";
   * const languageStrings = await apiClient.getLanguageStrings(language);
   * console.log(languageStrings);
   */
	public async getLanguageStrings(
		language: string,
	): Promise<SingleStringType[] | SingleStringGroup> {
		const languageUrl = new URL(
			this.baseUrl + "/api/projects/languages/" + language + "/strings",
		);
		languageUrl.searchParams.append("grouped", config.GROUPED);

		const response = await fetch(languageUrl, {
			method: "GET",
			headers: {
				"X-PROJECT-KEY": this.token,
				Accept: "application/json",
			},
		});
		return response.json();
	}
}
