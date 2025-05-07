import { MakerDMG } from '@electron-forge/maker-dmg';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { VitePlugin } from '@electron-forge/plugin-vite';

import type { ForgeConfig } from '@electron-forge/shared-types';

const config: ForgeConfig = {
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerDMG()],
  packagerConfig: {
    name: 'scrape-helper',
  },
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'main/main.ts',
          target: 'main',
          config: 'configs/vite.main.config.ts',
        },
        {
          entry: 'main/preload.ts',
          target: 'preload',
          config: 'configs/vite.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'configs/vite.renderer.config.ts',
        },
      ],
    }),
  ],
};

export default config;
