import { Effect, Exit, Layer } from "effect";
import { describe, it, expect } from "@effect/vitest";
import { Fetch, fetchTest } from "./fetch.service.js";

describe("tests the fetch service", () => {
	describe("get method", () => {
		it.effect("should test the get method", () =>
			Effect.gen(function* () {
				const { get } = yield* Fetch;

				const response = yield* get<"/my_url", string, undefined>("/my_url");

				expect(response).toEqual("success");
			}).pipe(Effect.provide(fetchTest)),
		);
		it.effect("should fail correctly", () =>
			Effect.gen(function* () {
				const { get } = yield* Fetch;

				const error = yield* get<"/my_url", string, undefined>("/my_url").pipe(
					Effect.flip,
					Effect.exit,
				);
				expect(error).toEqual(Exit.fail("success"));
			}).pipe(Effect.provide(fetchTest)),
		);
	});

	describe("post method", () => {
		it.effect("should test the post method", () =>
			Effect.gen(function* () {
				const { post } = yield* Fetch;

				const response = yield* post<"/my_url", string, string, null>(
					"/my_url",
					JSON.stringify({}),
					null,
				);

				expect(response).toEqual("success");
			}).pipe(Effect.provide(fetchTest)),
		);
		it.effect("post failures are handled", () =>
			Effect.gen(function* () {
				const { get } = yield* Fetch;

				const error = yield* get<"/my_url", string, undefined>("/my_url").pipe(
					Effect.flip,
					Effect.exit,
				);
				expect(error).toEqual(Exit.fail("success"));
			}).pipe(Effect.provide(fetchTest)),
		);
	});
});
