const electronReload = require("electron-reload");
const electronDebug = require("electron-debug");

exports.devTools = () => {
  electronReload("src/renderer/index.html");
  electronDebug();
};
