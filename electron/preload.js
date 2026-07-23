const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("deskHub", {
    version: "1.0"
});