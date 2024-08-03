import inquirer from "inquirer";
import { questions } from "./package-questions.js";
import process from "node:process";
import fs from "fs-jetpack";
import * as path from "node:path";
import { execSync } from "node:child_process";

type Questions = (typeof questions)[number]["name"];

async function createPackage() {
	const rootDir = process.argv[2];

	const addedQuestion = {
		type: "input",
		name: "directory",
		message:
			"Directory for the package (relative to where you ran the command)",
	};

	const answers: Record<Questions, unknown> = await inquirer.prompt(
		//biome-ignore lint/suspicious/noExplicitAny: dont care enough about the types here
		!rootDir ? [addedQuestion, ...questions] : (questions as any),
	);

	const packageName = answers["name the package"];
	const outputDir = answers["name output directory"];
	const typeProperty = answers["define the type property in the package"];

	const packageJsonPath = path.join(process.cwd(), rootDir, "package.json");
	const folderPath = path.join(process.cwd(), rootDir);
	try {
		await fs.dirAsync(rootDir, { empty: true });

		execSync("pnpm init", { cwd: path.join(process.cwd(), rootDir) });

		const { default: packageJson } = await import(packageJsonPath, {
			with: { type: "json" },
		});

		// modify package.json
		packageJson.name = packageName;
		packageJson.type = typeProperty ? "module" : "commonjs";
		packageJson.license = "MIT";
		packageJson.main = `./${outputDir}/src/index.ts`;
		packageJson.module = `./${outputDir}/src/index.ts`;
		packageJson.scripts = {
			dev: "tsc --watch",
			attw: "attw --pack .",
			build: "tsc -p ./tsconfig.json",
			docs: "api-extractor run --local --diagnostics && api-documenter markdown --input-folder temp --output-folder docs",
			lint: "pnpm biome lint",
			preview: "vite preview",
			test: "vitest",
			tsc: "tsc --watch",
		};

		packageJson.devDependencies = {
			"@arethetypeswrong/cli": "catalog:attw",
			"@biomejs/biome": "catalog:biome",
			"@effect/vitest": "catalog:effect",
			"@types/node": "catalog:typescript",
			"@wolfcola/biome-config": "workspace:*",
			"@wolfcola/typescript-config": "workspace:*",
			typescript: "catalog:typescript",
			"vite-plugin-dts": "catalog:vite",
			vite: "catalog:vite",
			vitest: "catalog:vite",
		};

		await fs.writeAsync(packageJsonPath, packageJson);

		// now write the scaffolding for the package

		fs.file(path.join(folderPath, "src/lib/index.ts"));
		fs.file(path.join(folderPath, "src/index.ts"));

		await fs.writeAsync(path.join(process.cwd(), "src/index.ts"), "");

		await fs.writeAsync(path.join(process.cwd(), "src/index.ts"), "");

		// create docs folders
		await fs.dirAsync(path.join(process.cwd(), "etc/"));
		await fs.dirAsync(path.join(process.cwd(), "docs/"));

		execSync("pnpm install", { cwd: path.join(process.cwd(), rootDir) });
	} catch (err) {
		console.error("it throws", err);
		// clean up folder path on error
		fs.remove(folderPath);
	}
}

export { createPackage };
