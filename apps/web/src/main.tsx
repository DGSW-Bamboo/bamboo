import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { client } from 'client';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
