// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

function createWindow () {
  let mainWindow = new BrowserWindow({show:false});
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.loadURL('http://192.168.1.150:3000');
    mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

