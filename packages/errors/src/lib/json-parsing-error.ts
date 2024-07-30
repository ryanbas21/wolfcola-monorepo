class ParsingResponseJsonError {
  constructor(error: unknown) {
    console.error('parsing', error);
  }
  readonly _tag = 'ParsingResponseJsonError';
}

export { ParsingResponseJsonError };
