import React from 'react';
import { Avatar, BorderBox, Flex, Heading, Text } from '@primer/components';
import { Story } from '../graphql-types';

/**어드민, 메인에서 보일 스토리 카드 */

type Props = {
  story: Story;
};

export const StoryCard = React.memo<Props>(({ story }) => {
  return (
    <Flex
      maxWidth="100%"
      paddingTop={3}
      paddingBottom={3}
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "border.primary"
      }}
    >
      <Flex mr={2}>
        <Avatar src="https://avatars.githubusercontent.com/primer" size={32} />
      </Flex>
      <Flex flex={1} flexDirection="column">
        <Flex height="32px" alignItems="center" mb="2px">
          <Text lineHeight="condensed" color="text.primary" fontSize={1} fontWeight="bold">
            익명의 판다&nbsp;
          </Text>
          <Text lineHeight="condensed" color="text.primary" fontSize={1}>
            님의&nbsp;
          </Text>
          <Text lineHeight="condensed" color="text.primary" fontSize={1} fontWeight="bold">
            {story.index !== undefined ? `${story.index}번째` : '새로운'} 제보
          </Text>
        </Flex>
        <BorderBox
          borderRadius={6}
          padding={3}
          borderColor="border.primary"
        >
          <Heading fontSize={2} marginBottom={1} lineHeight="condensed" color="text.primary">
            {story.title}
          </Heading>
          <Text lineHeight="condensed" fontSize={1} color="text.secondary">
            {story.content}
          </Text>
        </BorderBox>
      </Flex>
    </Flex>
  );
});
