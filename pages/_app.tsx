import '../styles/globals.css';
import 'reset-css'; // used to remove the default browser styling and make the website look same on all browsers
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StoreProvider } from 'easy-peasy';
import PlayerLayout from '../components/playerLayout';
import { store } from '../lib/store';

const theme = extendTheme({
  colors: {
    gray: {
      100: '#F5f5f5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

// export interface MyComponentType extends AppProps {
//   authPage: boolean;
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
