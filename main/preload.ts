import { contextBridge, ipcRenderer } from 'electron';

import type { WindowApi } from './types';

contextBridge.exposeInMainWorld('fileApi', {
  loadSettings: () => ipcRenderer.invoke('file:load-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('file:save-settings', settings),
  selectDirectory: () => ipcRenderer.invoke('file:select-directory'),
  findMedia: (dir: string) => ipcRenderer.invoke('file:find-media', dir),
} as WindowApi['fileApi']);

contextBridge.exposeInMainWorld('scrapeApi', {
  animate: (path: string) => ipcRenderer.invoke('scrape:animate', path),
  av: (path: string) => ipcRenderer.invoke('scrape:av', path),
  onReport: (cb: any) => ipcRenderer.on('report-message', (_, msg) => cb(msg)),
} as WindowApi['scrapeApi']);
