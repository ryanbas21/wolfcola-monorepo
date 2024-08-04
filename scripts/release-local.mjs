import { runServer } from "verdaccio";
import { execSync } from "node:child_process";
import process from "node:process";

runServer(".verdaccio/config.yml").then((app) => {
	app.listen(4873, (event) => {
		console.log(event);
		console.log("running on port 4873");
		try {
			execSync("pnpm release-verdaccio --filter packages/*", {
				cwd: process.cwd(),
			});
		} catch (err) {
			console.error(err);
		}
	});
});
