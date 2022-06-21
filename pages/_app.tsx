import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import Header from './Containers/Head';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider>
      <Header title="LearnPlay" />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
