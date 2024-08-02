import * as Effect from "effect/Effect";
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";
import { FetchError, ParsingResponseJsonError } from "@wolfcola/errors";

/**
 * Fetch Service
 * @remarks
 * the object of the Fetch service
 */
class Fetch extends Context.Tag("@wolfcola/Fetch")<
	Fetch,
	typeof fetchFunctionsLive
>() {}

const fetchFunctionsTest = {
	/**
	 * Post
	 *
	 * @param {Url} url: The url to post to
	 * @param {any} body: The body of the post
	 * @param {Headers extends HeadersInit} headers: The headers to optionally pass to post
	 * @returns the Response parsed, a generic you can pass to type the call
	 *
	 */
	post: <
		const Url extends string,
		Response,
		Body extends BodyInit | null,
		Headers extends HeadersInit | null,
	>(
		url: Url,
		body: Body,
		headers?: Headers,
	) =>
		Effect.tryPromise({
			try: (_signal) =>
				Promise.resolve(new Response(JSON.stringify("success"))),
			catch: () => new FetchError(),
		}).pipe(
			Effect.tryMapPromise({
				try: (response) => response.json() as Promise<Response>,
				catch: (error) => new ParsingResponseJsonError(error),
			}),
		),
	/**
	 * Get
	 *
	 * @param {Url} url: The url to post to
	 * @param {Headers extends HeadersInit} headers: The headers to optionally pass to Get
	 * @returns the Response parsed, a generic you can pass to type the call
	 *
	 */
	get: <
		const Url extends string,
		Response,
		Headers extends HeadersInit | undefined,
	>(
		url: Url,
		headers?: Headers,
	) =>
		Effect.tryPromise({
			try: (signal) => Promise.resolve(new Response(JSON.stringify("success"))),
			catch: () => new FetchError(),
		}).pipe(
			Effect.tryMapPromise({
				try: (response) => response.json() as PromiseLike<Response>,
				catch: (error) => new ParsingResponseJsonError(error),
			}),
		),
};

const fetchFunctionsLive = {
	/**
	 * Get
	 *
	 * @param {URL} url: The url to post to
	 * @param {Headers extends HeadersInit} headers: The headers to optionally pass to Get
	 * @returns the Response parsed, a generic you can pass to type the call
	 *
	 */
	get: <
		const Url extends string,
		Response,
		Headers extends HeadersInit | undefined,
	>(
		url: Url,
		headers?: Headers,
	) =>
		Effect.tryPromise({
			try: (signal) => fetch(url, { method: "GET", headers, signal }),
			catch: () => new FetchError(),
		}).pipe(
			Effect.tryMapPromise({
				try: (response) => response.json() as PromiseLike<Response>,
				catch: (error) => new ParsingResponseJsonError(error),
			}),
		),
	/**
	 * Post
	 *
	 * @param url: The url to post to
	 * @param body: The body of the post
	 * @param headers: The headers to optionally pass to post
	 * @returns the Response parsed, a generic you can pass to type the call
	 *
	 */
	post: <
		const Url extends string,
		Response,
		Body extends BodyInit,
		Headers extends HeadersInit,
	>(
		url: Url,
		body: Body,
		headers: Headers,
	) =>
		Effect.tryPromise({
			try: (signal) => fetch(url, { method: "POST", body, headers, signal }),
			catch: (error: unknown) => new FetchError(),
		}).pipe(
			Effect.tryMapPromise({
				try: (response) => response.json() as PromiseLike<Response>,
				catch: (error) => new ParsingResponseJsonError(error),
			}),
		),
};

const fetchTest = Layer.succeed(Fetch, fetchFunctionsTest);
const fetchLive = Layer.succeed(Fetch, fetchFunctionsLive);

export { Fetch, fetchLive, fetchTest };
