import { React, StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './app/graphql';
import { store } from './state-manager/store';
import './index.css'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement)

root.render(
  <Router>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        {/* <QueryClientProvider client={client}> */}
          <App />
        {/* </QueryClientProvider> */}
      </ApolloProvider>
    </Provider>
  </Router>
);