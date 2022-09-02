"use strict";

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const devTools = require("./devtools");
const path = require("path");

let win;

if (process.env.NODE_ENV === "development") {
  devTools();
}

function createWindow() {
  win = new BrowserWindow({
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

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  //IPC
  ipcMain.handle("channel:getFileName", (event, fileSrc) => {
    return path.basename(fileSrc);
  });

  ipcMain.on("channel:openDirectory", (event) => {
    dialog.showOpenDialog(win, {
        title: "Seleccione la ubicación",
        buttonLabel: "Abrir ubicación",
        properties: ["openDirectory"],
    }).then((result) => {
        console.log(result.canceled);
        console.log(result.filePaths);
    }).catch((err) => {
        console.log(err)
      });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
