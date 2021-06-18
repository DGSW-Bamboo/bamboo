import React from 'react';
import { StoryCard } from './StoryCard';
import { ThemeProvider } from '@primer/components';
import { Story, StoryState } from '../graphql-types';

export default {
  title: 'StoryCard',
  component: StoryCard,
};

const MockStory: Story = {
  _id: "1232123213",
  __typename: "Story",
  createdAt: new Date(),
  content: "1231231231231",
  state: StoryState.APPROVED,
  title: "돈 주세요 돈 주세요 돈 주세요 돈 주세요 돈 주세요 돈 주세요 돈 주세요 돈 주세요 돈 주세요"
}

export const Basic = () => (
  <ThemeProvider colorMode="day" dayScheme="light" nightScheme="dark">
    <StoryCard story={MockStory}/>
  </ThemeProvider>
);

Basic.story = {
  name: 'StoryCard',
};
