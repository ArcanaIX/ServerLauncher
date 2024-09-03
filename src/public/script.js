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
            <img src="${serverIcon}" alt="">
            <p>${serverName}</p>
        </div>
	`;
	selector.innerHTML = previousSelector + serverItem;
}

const generateServerConsole = async (selector, instance) => {
	const serverConsole = `
		<img src="./public/img/${instance}/icon.png" alt="" class="consoleIcon">
        
        <img src="./public/img/${instance}/bg.png" alt="" class="consoleBg">

        <button id="${instance}" class="launchBtn">
            Launch
        </button>
	`;
	selector.innerHTML = serverConsole;
}

serverList().then(() => {
	const serverItemList = document.querySelectorAll(".server");

	for (let i = 0; i < serverItemList.length; i++) {
		serverItemList[i].addEventListener("click", (e) => {
			const DOMServerConsole = document.querySelector(".srvConsole");

			DOMServerConsole.classList.remove("inactive")

			generateServerConsole(DOMServerConsole, e.currentTarget.id).then(() => {
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

