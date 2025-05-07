import fs from 'fs';
import path from 'path';

import { Tool, Match } from '@july_cm/media-scraper';
import { ipcMain, app, dialog } from 'electron';
const userDataPath = app.getPath('userData');
const settingsPath = path.join(userDataPath, 'settings.json');

export function loadSettings() {
  try {
    const data = fs.readFileSync(settingsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return undefined;
  }
}
function saveSettings(settings: any) {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
}

const selectDir = async () => {
  const result = await dialog.showOpenDialog({
    title: '选择一个储存有媒体资源的文件夹',
    properties: ['openDirectory'],
  });
  return result.filePaths[0]?.replaceAll(`\\`, '/');
};

const findMedia = async (dirPath: string) => {
  const [data] = await Tool.findMedia([dirPath]);
  const next = await Promise.all(data.map((file) => getMetaData(file)));
  return next;

  async function getMetaData(filePath: string) {
    const info = Match.getInfo(filePath);
    const metaData = await Tool.getLocalMetaData(info);
    let thumb: undefined | string = undefined;

    if (info.type === 'episode') {
      thumb = getBase64(info.localThumbImagePath);
    }

    return {
      filePath,
      relativeFilePath: path.relative(dirPath, filePath),
      type: info.type,
      metaData,
      poster: getBase64(info.localPosterImagePath),
      thumb,
    };
  }
  function getBase64(posterPath?: string) {
    if (posterPath && fs.existsSync(posterPath)) {
      const data = fs.readFileSync(posterPath);
      return `data:image/jpeg;base64,${data.toString('base64')}`;
    }
  }
};

export function setupFileHandlers() {
  ipcMain.handle('file:load-settings', () => loadSettings());
  ipcMain.handle('file:save-settings', (_, settings) => saveSettings(settings));
  ipcMain.handle('file:select-directory', () => selectDir());
  ipcMain.handle('file:find-media', (_, dir: string) => findMedia(dir));
}
