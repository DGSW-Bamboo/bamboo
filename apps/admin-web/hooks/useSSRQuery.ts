import { addApolloState, initializeApolloClient } from '../lib/apolliClient';
import { DocumentNode } from 'graphql';

export async function useSsrQuery(query: DocumentNode) {
  const apolloClient = initializeApolloClient()
  await apolloClient.query({
    query,
  })

  return addApolloState(apolloClient, {
    props: {},
  });
}
