import { total_players, total_money, waitForElement } from "./helpers";
import { playerPool } from "./helpers/players";

async function init() {
	const element = await waitForElement(".current-amount");

	let total_money_spent = 0;
	let total_money_remaining = total_money;
	let playersDrafted = 0;
	let remaining_players = total_players - playersDrafted;

	const draftBoard = new MutationObserver((mutations, observer) => {
		const board = Array.from(mutations[0].addedNodes)[0];
		if (board.textContent) {
			// get player information from draftboard
			const playerName = board.textContent.split("/")[0].trim();
			const amount = board.textContent.split("$")[1].split(" ")[0];
			const teamName = board.textContent.split("-")[1];

			// mark player as drafted
			playersDrafted += 1;
			try {
				const player = playerPool[playerName];
				if (player) {
					playerPool[playerName] = { value: player.value, drafted: true };
				}
			} catch (err) {
				console.log("PLAYER NAME", playerName, "IS NOT IN THE DATABASE");
			}

			// add up money
			total_money_spent += parseInt(amount);
			total_money_remaining = total_money - total_money_spent;

			// calcuate the total value left based on FP
			let totalFPValue = 0;

			// only calculate from the top to the bottom
			// and while we can fill roster spots
			let tempRemainingPlayers = remaining_players;
			while (tempRemainingPlayers - playersDrafted > 0) {
				for (let [name, value] of Object.entries(playerPool)) {
					if (value.drafted) {
						console.log(name);
					}
					if (value.drafted === false) {
						totalFPValue += value.value;
						tempRemainingPlayers -= 1;
					}
				}
			}

			// calculate percentage on the board
			const fpPercentage = (totalFPValue / total_money) * 100;
			const leaguePercentage = (total_money_spent / total_money) * 100;
			if (fpPercentage < leaguePercentage) {
				console.log("THERE SHOULD BE VALUE STARTING SOON");
			}
			chrome.runtime.sendMessage(
				{ fpPercentage, leaguePercentage },
				(response) => {
					console.log("responded", response);
				},
			);
		}
	});

	const draftedPlayers = document.querySelector(".pa3");

	if (draftedPlayers) {
		draftBoard.observe(draftedPlayers, {
			childList: true,
			subtree: true,
		});
	}
}
const port = chrome.runtime.connect({ name: "knockknock" });
try {
	port.postMessage({ joke: "Knock knock" });
} catch (err) {
	console.error("catch block", err);
}
console.log("after post message");
port.onMessage.addListener(function (msg) {
	console.log("the message received in content script", msg);
});
init();
