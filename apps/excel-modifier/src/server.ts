import { Config, Effect } from "effect";
import { RouterBuilder } from "effect-http";
import { NodeServer } from "effect-http-node";
import { NodeRuntime } from "@effect/platform-node";
import { spec } from "./spec";
import exceljs from "exceljs";

class FailedToGetDraftedByTeamColumn {
	readonly _tag = "ErrorFetchingWorksheet";
}
class FailedToGetPaidColumn {
	readonly _tag = "ErrorFetchingWorksheet";
}
class ErrorFetchingWorksheet {
	readonly _tag = "ErrorFetchingWorksheet";
}
class ErrorReadingProvidedFilepath {
	readonly _tag = "ErrorReadingProvidedFilepath";
}
class FailureGettingPlayerColumn {
	readonly _tag = "FailureGettingPlayerColumn";
}

const app = RouterBuilder.make(spec).pipe(
	RouterBuilder.handle("drafted", ({ body }) =>
		Effect.gen(function* () {
			const filepath = yield* Config.succeed("filepath");
			const workbook = new exceljs.Workbook();

			const loadedWorkbook = yield* Effect.tryPromise({
				try: () => workbook.xlsx.readFile(filepath),
				catch: () => new ErrorReadingProvidedFilepath(),
			});

			const auctionWorksheet = yield* Effect.try({
				try: () => loadedWorkbook.getWorksheet("Auction"),
				catch: (err) => new ErrorFetchingWorksheet(),
			});

			const playerColumn = yield* Effect.try({
				try: () => auctionWorksheet?.getColumn("B"),
				catch: () => new FailureGettingPlayerColumn(),
			});

			let playerRow = "";
			playerColumn?.eachCell((cell) => {
				const { row } = cell;
				if (cell.value === body.name) {
					playerRow = row;
				}
			});

			if (playerRow.length === 0) {
				console.log("player row not found");
			}

			const paidColumn = yield* Effect.try({
				try: () => auctionWorksheet?.getColumn("J"),
				catch: () => new FailedToGetPaidColumn(),
			});

			paidColumn?.eachCell((cell) => {
				const { row } = cell;
				if (row === playerRow) {
					cell.value = body.price;
				}
			});

			const teamColumn = yield* Effect.try({
				try: () => auctionWorksheet?.getColumn("O"),
				catch: () => new FailedToGetDraftedByTeamColumn(),
			});

			teamColumn?.eachCell((cell) => {
				const { row } = cell;
				if (row === playerRow) {
					cell.value = body.team;
				}
			});

			auctionWorksheet?.commit();
			return Effect.succeed(200 as const);
		}),
	),
	RouterBuilder.build,
);

app.pipe(NodeServer.listen({ port: 3000 }), NodeRuntime.runMain);
