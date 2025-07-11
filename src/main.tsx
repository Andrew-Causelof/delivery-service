import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { REACT_APP_ROOT } from './config.ts';

console.log('REACT_APP_ROOT', REACT_APP_ROOT);

createRoot(document.getElementById(`${REACT_APP_ROOT}`)!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
