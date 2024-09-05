const { contextBridge, ipcRenderer } = require("electron");

console.log("preload.js yüklendi");

contextBridge.exposeInMainWorld("electronAPI", {
  getSystemInfo: () => ipcRenderer.invoke("get-system-info"),
});
