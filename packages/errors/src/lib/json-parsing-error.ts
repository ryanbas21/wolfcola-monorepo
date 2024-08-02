/**
 * ParsingResponseJsonError
 * @remarks
 * Error to throw in effect when failing to parse
 * a response from fetch calls
 */
class ParsingResponseJsonError {
	constructor(error: unknown) {
		console.error("parsing", error);
	}
	readonly _tag = "ParsingResponseJsonError";
}

export { ParsingResponseJsonError };
