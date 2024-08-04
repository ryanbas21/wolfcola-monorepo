import { runServer } from "verdaccio";

const app = await runServer("./verdaccio/config.yaml");

app.listen(4000, (event) => {
	execSync("pnpm -r release-local");
});
