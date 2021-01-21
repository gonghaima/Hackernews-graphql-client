import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './styles/index.css';
import App from './components/App';

import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const token = localStorage.getItem('AUTH_TOKEN') || "random token hardcoded";
const customFetch = (uri, options) => {
  console.log(`token: ${token}`)
  options.headers.authorization = localStorage.getItem('AUTH_TOKEN') ;
  return fetch(uri, options);
};


const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  fetch: customFetch,
  options: {
    reconnect: true,
    connectionParams: {
      authorization: localStorage.getItem('AUTH_TOKEN') 
    },
  }
});


// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  fetch: customFetch
});


const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);


// 3
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// 4
ReactDOM.render(
  < BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);