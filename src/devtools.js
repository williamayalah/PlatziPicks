const electronReload = require('electron-reload')
const electronDebug = require('electron-debug')

function devTools() {
  electronReload('src/renderer/index.html')
  electronDebug()
}

module.exports = devTools