"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncLocale = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const get_text_1 = require("./commands/get-text");
const config_1 = require("./config/config");
const client = new get_text_1.GetTexts(config_1.config);
const syncLocale = async () => {
    console.log("Syncing locale", client);
    process.stdout.write("hello: ");
    await client.initiate().catch((e) => console.log(e));
};
exports.syncLocale = syncLocale;
