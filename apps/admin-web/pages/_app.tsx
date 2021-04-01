import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApolloClient } from '../lib/apolliClient';
import { ThemeProvider } from '@primer/components';

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApolloClient(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default CustomApp;
