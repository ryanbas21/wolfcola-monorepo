function waitForElement(selector: string) {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			console.log(`waitForElement: found ${selector} immediately`);
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver((mutations) => {
			if (document.querySelector(selector)) {
				console.log(`waitForElement: found ${selector} after DOM changed`);
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}

export const total_teams = 12;
export const players_allowed_per_team = 16;
export const total_players = total_teams * players_allowed_per_team;
export const total_money = total_teams * 200;

export { waitForElement };
