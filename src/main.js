"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
const devTools = require("./devtools");
const url = require("url");
const path = require("path");

if (process.env.NODE_ENV === "development") {
  devTools();
}

function createWindow() {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    maximizable: false,
    show: false,
    title: "PlatziPics",
    webPreferences: {
      preload: path.join(__dirname, "/renderer/preload.js"),
    },
  });

  win.loadFile("renderer/index.html");

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    win = null;
    app.quit();
  });
}

function getFileName(event, fileSrc) {
  return path.basename(fileSrc);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  
  ipcMain.handle("image:fileName", getFileName);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
