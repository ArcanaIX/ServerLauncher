const {app,BrowserWindow} = require('electron');

const path = require('node:path');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.loadFile('./src/index.html')
}

app.whenReady().then(() => {
	createWindow();
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})