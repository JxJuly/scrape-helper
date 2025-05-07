import type { WindowApi } from '../main/types';

declare global {
  interface Window {
    fileApi: WindowApi['fileApi'];
    scrapeApi: WindowApi['scrapeApi'];
  }
}
