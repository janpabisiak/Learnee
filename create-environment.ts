import "dotenv/config";
import fs from "fs";
import path from "path";

const ENVIRONMENT_FILE_PATH = "./src/environment/environment.ts";

const directory = path.dirname(ENVIRONMENT_FILE_PATH);
if (!fs.existsSync(directory)) {
	fs.mkdirSync(directory, { recursive: true });
}

interface IEnvironmentVariables {
	production: boolean;
	apiHost: string;
	apiUrl: string;
	apiKey: string;
}

const environmentVariables: IEnvironmentVariables = {
	production: process.env["PRODUCTION"] === "true",
	apiHost: process.env["API_HOST"] ?? "",
	apiUrl: process.env["API_URL"] ?? "",
	apiKey: process.env["API_KEY"] ?? "",
};

const fileData = `export const environment = {
    production: ${environmentVariables.production},
    apiHost: "${environmentVariables.apiHost}",
    apiUrl: "${environmentVariables.apiUrl}",
    apiKey: "${environmentVariables.apiKey}",
};`;

fs.writeFileSync(ENVIRONMENT_FILE_PATH, fileData);
