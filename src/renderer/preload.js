const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI',{
    getFileName: (fileSrc) => ipcRenderer.invoke('channel:getFileName', fileSrc),
    openDirectory: () => ipcRenderer.send('channel:openDirectory')
});