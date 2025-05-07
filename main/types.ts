export interface WindowApi {
  fileApi: {
    loadSettings: () => Promise<any>;
    saveSettings: (settings: any) => void;
    selectDirectory: () => Promise<string>;
    findMedia: (dir: string) => Promise<any[]>;
  };
  scrapeApi: {
    animate: (path: string) => Promise<void>;
    av: (path: string) => Promise<void>;
    onReport: (cb: any) => void;
  };
}
