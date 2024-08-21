import { defineManifest } from "@crxjs/vite-plugin";
import packageData from "../package.json";

const isDev = process.env.NODE_ENV == "development";

export default defineManifest({
	name: `${packageData.displayName || packageData.name}${isDev ? ` ➡ Dev` : ""}`,
	description: packageData.description,
	version: packageData.version,
	manifest_version: 3,
	icons: {
		16: "img/logo-16.png",
		32: "img/logo-34.png",
		48: "img/logo-48.png",
		128: "img/logo-128.png",
	},
	action: {
		default_popup: "popup.html",
		default_icon: "img/logo-48.png",
	},
	options_page: "options.html",
	devtools_page: "devtools.html",
	background: {
		service_worker: "src/background/index.ts",
		type: "module",
	},
	permissions: [
		"storage",
		"scripting",
		"tabs",
		"webRequest",
		"activeTab",
		"tabs",
		"webRequest",
		"background",
	],
	host_permissions: ["<all_urls>"],
	content_scripts: [
		{
			run_at: "document_end",
			matches: ["https://fantasy.espn.com/football/draft?leagueId=*"],
			js: ["src/contentScript/index.ts"],
		},
	],
	side_panel: {
		default_path: "sidepanel.html",
	},
	web_accessible_resources: [
		{
			resources: [
				"img/logo-16.png",
				"img/logo-34.png",
				"img/logo-48.png",
				"img/logo-128.png",
			],
			matches: [],
		},
	],
	chrome_url_overrides: {
		newtab: "newtab.html",
	},
});
