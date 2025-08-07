import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { REACT_APP_ROOT } from './config.ts';

createRoot(document.getElementById(`${REACT_APP_ROOT}`)!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
