const serverList = async () => {
	const response = await fetch("http://185.172.57.22:3000/server");
	const data = await response.json();
	console.log(data)
	const DOMServerList = document.getElementById("serverList");

	for (let i = 0; i < data.length; i++) {
		console.log(data[i]);
		const previous = DOMServerList.innerHTML;
		const icon = `./public/img/${data[i]}/icon.png`;
		generateServerItem(DOMServerList, previous, data[i], icon);
	}

}

const generateServerItem = (selector, previousSelector, serverName, serverIcon) => {
	const serverItem = `
		<div class="server" id="${serverName}">
            <img src="${serverIcon}" id="${serverName}" alt="">
            <p id="${serverName}">${serverName}</p>
        </div>
	`;
	selector.innerHTML = previousSelector + serverItem;
}

const generateServerConsole = async (selector, instance, serverIp, nbrPlayer, statusPill) => {
	const serverConsole = `
		<img src="./public/img/${instance}/icon.png" alt="" class="consoleIcon">
        
        <img src="./public/img/${instance}/bg.png" alt="" class="consoleBg">

        <button id="${instance}" class="launchBtn">
            Launch
        </button>
        <div class="information">
        	<p class="serverIp">${serverIp}</p>
        	
        	<div class="connectedPlayer">
        		${statusPill}
        		<p class="playerConnected">${nbrPlayer}</p>
			</div>
		</div>
	`;
	selector.innerHTML = serverConsole;
}

const isOnline = async (port) => {
	const fetchApi = await fetch("https://api.mcsrvstat.us/3/185.172.57.22");
	const data = await fetchApi.json();

	if (data.online == true) {
		if(port == data.port) {
			return true
		}else {
			return false
		}
	}else {
		return false
	}

}

const getConnectedPlayer = async () => {
	const fetchApi = await fetch("https://api.mcsrvstat.us/3/185.172.57.22");
	const data = await fetchApi.json();

	return data.players.online

}

serverList().then(() => {
	const serverItemList = document.querySelectorAll(".server");


	//SERVER LOOP
	for (let i = 0; i < serverItemList.length; i++) {


		serverItemList[i].addEventListener("click", async (e) => {


			//RETRIEVE SERVER CONFIG

			const configCall = await fetch("http://185.172.57.22:3000/server/config?server=" + e.target.id);
			const serverConfigResponse = await configCall.json();

			const serverConfig = JSON.parse(serverConfigResponse);

			console.log(serverConfig.name)

			const serverIp = serverConfig.ip + ':' +serverConfig.port;

			const isServerOnline = await isOnline(serverConfig.port);

			let nbrPlayer;

			let statusPill;
			let nbrPlayerText;

			if (isServerOnline == true) {
				statusPill = `<div className="statusPill online"></div>`;
				nbrPlayer = await getConnectedPlayer();
				nbrPlayerText = `${nbrPlayer} joueurs connectés`;
			}else {
				statusPill = `<div className="statusPill offline"></div>`;
				nbrPlayerText = "OFFLINE"
			}

			console.log(isServerOnline);
			console.log(nbrPlayer);

			//DISPLAY SERVER CONSOLE

			const DOMServerConsole = document.querySelector(".srvConsole");

			DOMServerConsole.classList.remove("inactive")

			generateServerConsole(DOMServerConsole, e.target.id, serverIp, nbrPlayerText, statusPill).then(() => {
				const btn = document.querySelector(".launchBtn");

				btn.addEventListener("click", async (e) => {
					const instance = e.currentTarget.id;
					const response = await fetch('http://185.172.57.22:3000/server/launch?server=' + instance);
					const data = await response.json();
				})
			})

		})
	}
});

