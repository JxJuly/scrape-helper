import type { BrowserWindow } from 'electron';

class Reporter {
  _win: BrowserWindow;

  set win(next: BrowserWindow) {
    this._win = next;
  }

  send(msg: string, level: 'error' | 'success' | 'info') {
    this._win.webContents.send('report-message', { msg, level });
  }
}

export const reporter = new Reporter();
