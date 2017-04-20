'use strict';
const electron = require('electron');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 900,
		height: 600,
		minWidth: 800,
		minHeight: 400
	});

	win.loadURL(`file://${__dirname}/index.html?storageloc=` + encodeURIComponent(app.getAppPath()));
	win.on('closed', onClosed);

	return win;
}

/*app.on('browser-window-created',function(e,window) {
  window.setMenu(null);
});*/

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
