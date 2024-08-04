const questions = [
	{
		type: "input",
		name: "name the package",
		message: "What is the name of your package",
	},
	{
		type: "input",
		name: "name output directory",
		message: "What is your output directory (default is `dist`)",
		default: "dist",
	},
	{
		type: "input",
		name: "define the type property in the package.json",
		message: "What is the `module` type of your package? (default is `module`)",
		default: "module",
	},
	//{
	//	type: "confirm",
	//	name: "setup linting",
	//	message: "Do you want to setup linting with biome (default is `true`)",
	//	default: true,
	//},
	//{
	//	type: "confirm",
	//	name: "setup typescript",
	//	message: "Do you want to setup typescript (default is `true`)",
	//	default: true,
	//},
	//{
	//	type: "confirm",
	//	name: "Do you want to setup api-extractor",
	//	message: "Do you want to setup api-extractor? (default is `true`)",
	//	default: true,
	//},
] as const;

export { questions };
