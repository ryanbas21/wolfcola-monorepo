import { runServer } from "verdaccio";
import { releasePublish, releaseVersion } from "nx/release/index.js";

const app = await runServer(".verdaccio/config.yml");

app.listen(4873, async () => {
	await releaseVersion({
		gitTag: false,
		gitCommit: false,
		stageChanges: false,
		preid: "local",
		specifier: "prerelease",
	});

	return await releasePublish({
		tag: "local",
		registry: "http://localhost:4873",
		generatorOptionsOverrides: {
			skipLockFileUpdate: true,
		},
	});
});
