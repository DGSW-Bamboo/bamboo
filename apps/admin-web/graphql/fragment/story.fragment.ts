import { gql } from '@apollo/client';

export const STORY_FRAGMENT = gql`
  fragment StoryOnUser on Story {
    _id
    createdAt
    title
    content
    index
    rejectedAt
    state
  }
`;
