const {app, BrowserWindow, Menu, dialog} = require('electron') 
const url = require('url') 
const path = require('path') 
const {ipcMain} = require('electron')  

let window 
let part = 'win_path'+Math.floor(Math.random() * 10);

function createWindow() { 
    window = new BrowserWindow({width: 400, height: 450, resizable: false, webPreferences: {
        nodeIntegration: true,
        partition: part
    }});
    
    
    window.loadURL(url.format ({ 
        pathname: path.join(__dirname, 'index.html'), 
        protocol: 'file:', 
        slashes: true 
    }));
    //window.webContents.openDevTools();  
}  

const clearObj = {
    storages: ['cookies','appcache', 'filesystem', 'indexdb', 'localstorage', 'shadercache', 'websql', 'serviceworkers', 'cachestorage'],
};

const options = {
  type: 'info',
  buttons: ['Ok'],
  defaultId: 2,
  title: 'Cupit Kretek',
  message: 'Semangat, Bro... !!!',
  detail: 'Semoga Software Sederhana ini bermanfaat :D',
  
};

const template = [
    {
        label: 'Hapus Semua',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach((win) => {
                if (win.id > 1) win.close();
              });
            }
            focusedWindow.webContents.session.clearStorageData(clearObj,() => {
              focusedWindow.reload();
            })
          }
        },
      },
      {
        label: 'Hapus Cache',
        accelerator: 'CmdOrCtrl+Shift+Delete',
        click: (item,focusedWindow) => {
          if (focusedWindow) {
              focusedWindow.webContents.session.clearStorageData(clearObj);
          }
        }
      },
      {
        label: 'Tentang',
        accelerator: 'CmdOrCtrl+Shift+Delete',
        click: (item,focusedWindow) => {
          if (focusedWindow) {
              dialog.showMessageBox(null, options);    
          }
        }
      }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(createWindow)

