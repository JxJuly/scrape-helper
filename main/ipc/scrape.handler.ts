import { Scraper, TMDBScrapePlugin, BangumiScrapePlugin, JAVDBScrapePlugin } from '@july_cm/media-scraper';
import { ipcMain } from 'electron';

import { loadSettings } from './file.handler';
import { reporter } from '../service/reporter';

function scrapeReporter(info: any) {
  reporter.send(info.msg, info.level);
}

export const animate = async (filePath: string) => {
  const settings = loadSettings();
  const plugins = [];
  if (settings?.TMDB?.Token) {
    plugins.push({
      use: new TMDBScrapePlugin({
        token: settings.TMDB.Token,
        isAdult: true,
        language: 'ja-JP',
      }),
    });
  }
  if (settings?.Bangumi?.Token) {
    plugins.push({
      use: new BangumiScrapePlugin({
        token: settings.Bangumi.Token,
      }),
      pick: ['rating', 'plot', 'tag', 'genre', 'bgmid', 'studio', 'showtitle'],
    });
  }
  const scraper = new Scraper({
    mode: 'complete',
    downloadImage: true,
    plugins,
  });

  await scraper.run(filePath);
};

export const av = async (filePath: string) => {
  const scraper = new Scraper({
    mode: 'complete',
    downloadImage: true,
    reporter: scrapeReporter,
    plugins: [
      {
        use: new JAVDBScrapePlugin(),
      },
    ],
  });
  await scraper.run(filePath);
};

export function setupScrapeHandlers() {
  ipcMain.handle('scrape:animate', (_, path) => animate(path));
  ipcMain.handle('scrape:av', (_, path) => av(path));
}
