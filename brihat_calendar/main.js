// Modules to control application life and create native browser window
if (require('electron-squirrel-startup')) return;
const {app, BrowserWindow, Tray, Menu, screen} = require('electron')
const path = require('path')
const { ipcMain } = require('electron')

// Enable live reload for all the files inside your project directory
const electron = require('electron')
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron-forge.cmd')
});

let mainWindow = null
let tray = null

const gotTheLock = app.requestSingleInstanceLock()

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  // const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};

function createWindow () {
  // Create the browser window.
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 571,
    x: width - 300,
    y: parseInt((height - 71)) - 30,
    icon: path.join(__dirname, 'brihaticon.png'),
    maximizable: false,
    frame: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      // devTools: false,
    }
  })

  // and load the brihat_calendar_mini.html of the app and hide
  mainWindow.loadFile('brihat_calendar_mini.html')
  // mainWindow.hide()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // hide the default menu bar that comes with the browser window
  mainWindow.setMenuBarVisibility(null);
  // mainWindow.setResizable(false);

  mainWindow.on('minimize',function(event){
    event.preventDefault();
    // mainWindow.hide();
  });

  var full_calendar = new BrowserWindow({
    width: 439,
    height: 700,
    show: false,
    // parent: mainWindow,
    // x: width - 350,
    // y: parseInt((height - 700) / 2) - 10,
    icon: path.join(__dirname, 'brihaticon.png'),
    darkTheme: true,
    maximizable: false,
    frame: false,
    // titleBarStyle: 'customButtonsOnHover',
    opacity: 1.0,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      zoomFactor: 0.9,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    }
  })
  full_calendar.loadFile('brihat_calendar.html')
  // full_calendar.show();
  full_calendar.setMenuBarVisibility(false)
  full_calendar.setResizable(false)


  ipcMain.on('show-full-calendar', function () {
    if(full_calendar.isVisible()) {
        full_calendar.focus()
    }
    else {
      full_calendar.show()
    }
    // full_calendar.on('close', function () {
    // console.log('I do not want to be closed')
    // full_calendar.hide()
    // Unlike usual browsers that a message box will be prompted to users, returning
    // a non-void value will silently cancel the close.
    // It is recommended to use the dialog API to let the user confirm closing the
    // application.
    // e.returnValue = false // equivalent to `return false` but not recommended
    // })
    full_calendar.show()
  })

  ipcMain.on('close-full-calendar', function () {
    full_calendar.hide()
    // if(full_calendar.isVisible()) {
    //     full_calendar.focus()
    // }
    // else {
    //   full_calendar.show()
    // }
    // full_calendar.on('close', function () {
    // console.log('I do not want to be closed')
    // full_calendar.hide()
    // // Unlike usual browsers that a message box will be prompted to users, returning
    // // a non-void value will silently cancel the close.
    // // It is recommended to use the dialog API to let the user confirm closing the
    // // application.
    // // e.returnValue = false // equivalent to `return false` but not recommended
    // })
    // full_calendar.show()
  })

  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show/Hide Date', click: function () {
        if(mainWindow.isMinimized()) {
            mainWindow.restore()
        }
        else {
          if(full_calendar.isVisible()) {
            full_calendar.hide()
          }
          mainWindow.minimize()
          mainWindow.hide()
        }
        if(full_calendar.isVisible()) {
            full_calendar.hide()
        }
      }
    },
    {
      label: 'Show/Hide Calendar', click: function () {
        if(mainWindow.isMinimized()) {
            mainWindow.restore()
            full_calendar.show()
        }
        else {
          if(full_calendar.isVisible()) {
            full_calendar.hide()
          }
          else {
            full_calendar.show()
          }
        }
      }
    },
    {
      label: 'Quit', click: function () {
        app.isQuiting = true
        app.quit()
      }
    }
  ])
  const icon_path = path.join(__dirname, '/brihaticon.png');
  // tray = new Tray('./brihaticon.png')
  tray = new Tray(icon_path)
  tray.setToolTip('Brihat Calendar v1.0')
  tray.setContextMenu(contextMenu)
  tray.on('double-click', function () {
    mainWindow.show()
  })
}

if (!gotTheLock) {
  app.quit()
}
else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      else mainWindow.show()
      mainWindow.focus()
    }
  })
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
  app.setAppUserModelId("Brihat Calendar")
}
