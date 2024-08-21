import { Schema } from "@effect/schema";
import { Api } from "effect-http";

const draftedShape = Schema.Struct({
	name: Schema.String,
	team: Schema.String,
	price: Schema.Number,
});

const spec = Api.make({ title: "excel modifier" }).pipe(
	Api.addEndpoint(
		Api.post("drafted", "/drafted", {
			summary: "when a player is drafted",
		}).pipe(Api.setRequestBody(draftedShape)),
	),
);

export { spec };
