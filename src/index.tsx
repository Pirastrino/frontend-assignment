import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {Normalize} from 'styled-normalize';

import App from './App';
import WebVitals from './WebVitals';
import './i18n/i18n';
import theme from './theme';

const MOUNT_NODE = document.getElementById('root');

createRoot(MOUNT_NODE!).render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <HelmetProvider>
        <App />
        <Normalize />
        <WebVitals showStatusInConsoleLog />
      </HelmetProvider>
    </ChakraProvider>
  </StrictMode>
);
