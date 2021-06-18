import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { StoryCard } from '@bamboo/ui-toolkit';
import { useSsrQuery } from '../hooks/useSSRQuery';

const QUERY = gql`
  query Stories {
    getAllStories {
      _id
      createdAt
      title
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

  console.log(data);

  return (
    <div>
      {data.getAllStories.map(story => <StoryCard story={story}/>)}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}, {}> = async () => {
  return useSsrQuery(QUERY);
}
