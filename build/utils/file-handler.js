"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const fs = require("fs");
const pathModule = require("path");
const config_1 = require("../config/config");
class FileHandler {
    constructor(basPath) {
        Object.defineProperty(this, "basePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.basePath = basPath;
        this.createDirectoryIfNotExists(basPath);
    }
    createDirectoryIfNotExists(path) {
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
        }
        catch (error) {
            // Handle the error
            if (error.code === "EROFS") {
                // The file system is read-only, attempt to make it writable
                try {
                    // Change the directory permissions to make it writable
                    fs.chmodSync(path, 0o755); // Adjust the permission mode accordingly
                    console.log(`Directory ${path} made writable.`);
                    // Try creating the directory again
                    fs.mkdirSync(path);
                }
                catch (err) {
                    console.error(`Error making directory ${path} writable:`, err);
                }
            }
            else {
                console.error("Error creating directory:", error);
            }
        }
    }
    writeFile(language, data) {
        if (config_1.config.GROUPED === "true") {
            const groupedData = data;
            Object.keys(groupedData).map((page) => {
                this.createDirectoryIfNotExists(`${this.basePath}/${language}`);
                fs.writeFileSync(`${this.basePath}/${language}/${page}.json`, this.getWritableJson(groupedData[page]));
            });
        }
        else {
            const stringData = data;
            this.createDirectoryIfNotExists(`${this.basePath}/${language}`);
            fs.writeFileSync(`${this.basePath}/${language}/${config_1.config.LOCALIZE_DEFAULT_FILE_NAME}.json`, this.getWritableJson(stringData));
        }
    }
    getWritableJson(strings) {
        let writeData = {};
        strings.map((string) => {
            writeData[string.key] = string.value;
        });
        return JSON.stringify(writeData, null, 4);
    }
}
exports.FileHandler = FileHandler;
