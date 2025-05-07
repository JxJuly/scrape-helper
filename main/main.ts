import path from 'path';

import { app, BrowserWindow } from 'electron';

import { setupIpcHandlers } from './ipc';
import { reporter } from './service/reporter';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  reporter.win = mainWindow;

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.resolve(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}`, 'index.html'));
  }
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  setupIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
