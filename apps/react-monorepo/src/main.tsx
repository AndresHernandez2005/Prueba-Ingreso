import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { SincoTheme } from '@sinco/react';
import '@fontsource/nunito';
import '@fontsource/roboto';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={SincoTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
