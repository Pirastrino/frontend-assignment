import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import GlobalStyles from './GlobalStyles';
import WebVitals from './WebVitals';
import './i18n/i18n';
import theme from './theme';

const MOUNT_NODE = document.getElementById('root');

createRoot(MOUNT_NODE!).render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <HelmetProvider>
        <App />
        <GlobalStyles />
        <WebVitals showStatusInConsoleLog />
      </HelmetProvider>
    </ChakraProvider>
  </StrictMode>
);
