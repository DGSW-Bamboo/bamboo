import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { client } from './client';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './style/GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <App />
        </ApolloProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
