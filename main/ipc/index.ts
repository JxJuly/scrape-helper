import { setupFileHandlers } from './file.handler';
import { setupScrapeHandlers } from './scrape.handler';

export function setupIpcHandlers() {
  setupFileHandlers();
  setupScrapeHandlers();
}
