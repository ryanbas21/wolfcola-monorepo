import { useState, useEffect } from "react";

import "./Popup.css";

export const Popup = () => {
	const [count, setCount] = useState(0);
	const [message, sendMsg] = useState("");

	async function getCurrentTab() {
		let queryOptions = { active: true, lastFocusedWindow: true };
		// `tab` will either be a `tabs.Tab` instance or `undefined`.
		let [tab] = await chrome.tabs.query(queryOptions);
		return tab;
	}

	const sendMessage = async (msg: string) => {
		const { id = 0 } = await getCurrentTab();
		chrome.tabs.sendMessage(id, msg);
	};

	useEffect(() => {
		async function handleMessaging() {
			const tabs = await chrome.tabs.query({
				active: true,
				muted: true,
				lastFocusedWindow: true,
			});
			console.log("here are tabs", tabs);
			if (tabs && tabs[0] && tabs[0].id) {
				const port = chrome.tabs.connect(tabs[0].id);
				port.onMessage.addListener((message, port) => {
					console.log("popup has received a message");
					console.log("popups message", message);
					port.postMessage("popup has sent you this message");
				});
				port.postMessage("sending you a message from popupjs");
			}
		}
		handleMessaging();
	}, []);
	return (
		<main>
			<h3>Value on board</h3>
			<h5>{count}</h5>
			<button onClick={() => sendMessage("hello world")}>Send Message</button>
		</main>
	);
};

export default Popup;
