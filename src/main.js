"use strict";

const { app, BrowserWindow } = require("electron");
const { devTools } = require("./devtools");


if (process.env.NODE_ENV === "development") {
  devTools();
}

app.whenReady().then(() => {
  let win = new BrowserWindow({
    width: 1000,
    height: 800,
    maximizable: false,
    show: false,
    title: "PlaztiPics",
  });

  win.loadFile("renderer/index.html");

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("move", () => {
    let position = win.getPosition();
    console.log("Position: ", position);
  });
  win.on("closed", () => {
    win = null;
    app.quit();
  });
});
