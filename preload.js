const generateServerItem = (selector, serverName) => {
	const serverItem = `
		<div class="server">
            <img src="https://placehold.co/64" alt="">
            <p>${serverName}</p>
        </div>
	`;
	selector.appendChild(serverItem);
}

window.addEventListener("DOMContentLoaded", () => {



});

