const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI',{
    fileName: (fileSrc) => ipcRenderer.invoke('image:fileName', fileSrc)
});