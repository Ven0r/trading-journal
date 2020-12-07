const { app, BrowserWindow } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
// DB requirements
const db = require('./extraResources/database/db')
const account_table = require('./extraResources/database/account_repo')
const asset_repo = require('./extraResources/database/asset_repo')
const trade_repo = require('./extraResources/database/trade_repo')

// Implement Hot Reload
require('electron-reload')(__dirname);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

//Create DB and Tables
const connection = new db('./trading-journal-db.sqlite')
const account = new account_table(connection)
const asset = new asset_repo(connection)
const trade = new trade_repo(connection)

account.createTable().then(()=> asset.createTable()).then(()=> trade.createTable());

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 750,
    icon: 'src/icons/profile.png'
  });
  
  //

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// DB Sqlite3 Connection
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./trading-journal-db.sqlite",
  },
    useNullAsDefault: true
})
