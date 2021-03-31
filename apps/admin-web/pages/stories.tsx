import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { addApolloState, initializeApolloClient } from '../lib/apolliClient';
import { GetServerSideProps } from 'next';

const QUERY = gql`
  query Stories {
    getAllStories {
      _id
      approvedAt
      censoredAt
      content
      index
      rejectedAt
      state
    }
  }
`;

export default function Stories () {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) return 'loading...'
  if (error) return 'error!';

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}, {}> = async () => {
  const apolloClient = initializeApolloClient()
  await apolloClient.query({
    query: QUERY,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}
