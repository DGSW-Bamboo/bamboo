import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SERVER } from '../config/config.json';

export const client = new ApolloClient({
  uri: `${SERVER}`,
  cache: new InMemoryCache(),
});
