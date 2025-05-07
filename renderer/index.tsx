import { MemoryRouter } from 'react-router';

import { createRoot } from 'react-dom/client';

import { App } from './app';

import './index.css';

const root = createRoot(document.getElementById('root') || document.body);

root.render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);
