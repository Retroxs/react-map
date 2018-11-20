// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

function createWindow () {
  let mainWindow = new BrowserWindow({fullscreen:true});
    // mainWindow.maximize();
    // mainWindow.show();
    mainWindow.loadURL('http://192.168.43.20:3000');
    mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

