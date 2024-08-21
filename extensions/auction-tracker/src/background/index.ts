import { playerPool } from "./players";

//const total_teams = 12;
//const players_allowed_per_team = 16;
//const total_players = total_teams * players_allowed_per_team;
//const total_money = total_teams * 200;
//
//let total_money_spent = 0;
//let total_money_remaining = total_money;
//let playersDrafted = 0;
//let remaining_players = total_players - playersDrafted;
//
//function topPlayersRemainingValue() {
//	let total = 0;
//	let remaining = remaining_players;
//
//	for (const [_player, obj] of playerPool) {
//		if (obj.drafted === false) total += obj.value;
//		remaining -= 1;
//		if (remaining < 1) break;
//	}
//	return total;
//}

chrome.runtime.onMessage.addListener(
	(
		{
			fpPercentage,
			leaguePercentage,
		}: { fpPercentage: number; leaguePercentage: number },
		sender,
		sendResponse,
	) => {
		console.log(
			"leaguePercentage",
			leaguePercentage,
			"fp percentage",
			fpPercentage,
		);
		sendResponse("responded from sw");
	},
);
