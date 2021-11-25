const electron = require("electron");
const app = electron.app;
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const { setup: setupPushReceiver } = require("electron-push-receiver");
const { ipcMain } = require("electron");

// Call it before 'did-finish-load' with mainWindow a reference to your window

let mainWindow;

// Deep linked url
let deeplinkingUrl;

// Force Single Instance Application
const gotTheLock = app.requestSingleInstanceLock();
if (gotTheLock) {
  app.on("second-instance", (e, argv) => {
    // Someone tried to run a second instance, we should focus our window.

    // Protocol handler for win32
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform === "win32") {
      // Keep only command line / deep linked arguments
      deeplinkingUrl = argv.slice(1);
    }
    logEverywhere("app.makeSingleInstance# " + deeplinkingUrl);

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
} else {
  app.quit();
  return;
}

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
      : `file://${path.join(__dirname, "index.html")}`
  );

  // Initialize electron-push-receiver component. Should be called before 'did-finish-load'
  setupPushReceiver(mainWindow.webContents);

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("ping", "🤘");
  });

  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.webContents.on("did-fail-load", () => {
    mainWindow.loadURL(
      isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "index.html")}`
    );
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

if (!app.isDefaultProtocolClient("trooops")) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient("trooops");
}

app.on("will-finish-launching", function () {
  // Protocol handler for osx
  app.on("open-url", function (event, url) {
    event.preventDefault();
    deeplinkingUrl = url;
    logEverywhere("open-url# " + deeplinkingUrl);
  });
});

function logEverywhere(s) {
  console.log(s);
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`console.log("${s}")`);
  }
}
