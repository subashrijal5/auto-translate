/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import * as pathModule from "path";

import { SingleStringGroup, SingleStringType } from "../types/get-text";
import { config, getLocaleCodeMapFromServer } from "../config/config";

/**
 * Handles file operations such as creating directories and writing files.
 * Ensures that the necessary directories are created before writing the files,
 * and handles errors related to read-only file systems.
 */
export class FileHandler {
	protected basePath: string;

	constructor(basPath: string) {
		this.basePath = basPath;
		this.createDirectoryIfNotExists(basPath);
	}

	/**
   * Creates a directory if it doesn't already exist.
   * If the file system is read-only, attempts to make the directory writable.
   *
   * @param path - The path of the directory to be created.
   * @returns None.
   * @throws Error - If an error occurs during directory creation or making it writable.
   */
	private createDirectoryIfNotExists(path: string) {
		try {
			// Split the path into individual directories
			const directories = path.split(pathModule.sep);

			// Iterate through each directory and create it if it doesn't exist
			let currentPath = "";
			for (const directory of directories) {
				currentPath = pathModule.join(currentPath, directory);
				if (!fs.existsSync(currentPath)) {
					fs.mkdirSync(currentPath);
				}
			}
		} catch (error: any) {
			// Handle the error
			if (error.code === "EROFS") {
				// The file system is read-only, attempt to make it writable
				try {
					// Change the directory permissions to make it writable
					fs.chmodSync(path, 0o755); // Adjust the permission mode accordingly
					console.log(`Directory ${path} made writable.`);
					// Try creating the directory again
					fs.mkdirSync(path);
				} catch (err) {
					console.error(`Error making directory ${path} writable:`, err);
				}
			} else {
				console.error("Error creating directory:", error);
			}
		}
	}

	public writeFile(
		language: string,
		data: SingleStringGroup | SingleStringType[],
	) {
		const localeLanguage = getLocaleCodeMapFromServer(language);
		if (config.GROUPED === "true") {
			const groupedData = data as SingleStringGroup;
			Object.keys(groupedData).map((page: keyof typeof groupedData) => {
				this.createDirectoryIfNotExists(`${this.basePath}/${localeLanguage}`);
				fs.writeFileSync(
					`${this.basePath}/${localeLanguage}/${page}.json`,
					this.getWritableJson(groupedData[page]),
				);
			});
		} else {
			const stringData = data as SingleStringType[];
			this.createDirectoryIfNotExists(`${this.basePath}/${localeLanguage}`);
			fs.writeFileSync(
				`${this.basePath}/${localeLanguage}/${config.BILINGUAL_DEFAULT_FILE_NAME}.json`,
				this.getWritableJson(stringData),
			);
		}
	}

	private getWritableJson(strings: SingleStringType[]) {
		const writeData: Record<string, string> = {};
		strings.map((string) => {
			const keyParts = string.key.split(".");
			this.getNestedJson(keyParts,string.value, writeData);
		});
		return JSON.stringify(writeData, null, 4);
	}

	private getNestedJson(keys: string[], value: string, returnData: Record<string,  string> = {}): Record<string, object | string> {
		if(keys.length > 1) {
			const key = keys.shift();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			returnData[key] = this.getNestedJson(keys, value, returnData[key] ??{});
			return returnData;
		}
		
		returnData[keys[0]] = value;
		return returnData;
	}
	

	public getCurrentLanguageCodes(){
		const languageCodes = fs.readdirSync(this.basePath);
		return languageCodes;
	}
	
	public getStringsFromLocales(language: string): Array<Record<string, string>>{
		const localeLanguage = getLocaleCodeMapFromServer(language);
		const files = fs.readdirSync(`${this.basePath}/${localeLanguage}`);
		if(files.length === 0){
			return [];
		}
		
		let strings: Array<Record<string, string>> = [];
		files.map((file) => {
			const string = fs.readFileSync(`${this.basePath}/${localeLanguage}/${file}`, "utf8");
			strings =	this.convertToPushBodyFromJson(JSON.parse(string), file.replace(".json", ""), strings);
		});

		return strings;
	}

	private convertToPushBodyFromJson(jsonData: Record<string,string|object>, group: string, returnData: Array<Record<string, string>>  = [], parentKey = "") {
		// iterate over the object
		for (const [key, value] of Object.entries(jsonData)) {
			// recursively call the function with the nested object
			if (typeof value === "object") {
				const newParentKey = parentKey ? `${parentKey}.${key}` : key;
				this.convertToPushBodyFromJson(value as Record<string,string|object>, `${group}.${key}`, returnData, newParentKey);
				continue;
			}
			returnData.push({
				key: parentKey ? `${parentKey}.${key}` : key,
				value: value,
				group: group
			});
			
		}
		return returnData;

	}
}
