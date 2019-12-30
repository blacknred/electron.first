// public/electron.js

const path = require("path");
const electron = require("electron");
const isDev = require("electron-is-dev");

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // Determine what to render based on environment
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) mainWindow.webContents.openDevTools(); // chrome dev tools

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("activate", () => {
  if (mainWindow !== null) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "linux") app.quit(); // darwin, win64
});
