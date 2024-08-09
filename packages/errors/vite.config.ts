/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	root: "./",
	build: {
		lib: {
			entry: "./src/index.ts",
			fileName: "index",
			formats: ["es"],
		},
		outDir: "./dist",
	},
	test: {
		passWithNoTests: true,
		typecheck: {
			tsconfig: "./tsconfig.spec.json",
		},
		watch: false,
	},
	plugins: [
		dts({
			rollupTypes: true,
		}),
	],
});
