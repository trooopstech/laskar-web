const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const { setup: setupPushReceiver } = require("electron-push-receiver");
const { ipcMain } = require("electron");

// Call it before 'did-finish-load' with mainWindow a reference to your window

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Initialize electron-push-receiver component. Should be called before 'did-finish-load'
  setupPushReceiver(mainWindow.webContents);

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("ping", "🤘");
    mainWindow.webContents.send("ping", "🤘");
    mainWindow.webContents.send("ping", "🤘");
  });

  ipcMain.on("device-token", (event, token) => {
    event.returnValue = token;
    ipcMain.on("user-data", (event, user) => {
      event.returnValue = token;
    });
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
