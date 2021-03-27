import React from 'react';
import { BorderBox } from '@primer/components';
import { WidthRatio } from './StoryCard.type';

/**어드민, 메인, 글쓰기 페이지에서 쓰임 */

interface IStoryCard {
  size: WidthRatio;
  borderColor?: string;
}

const StoryCard = ({
  size,
  borderColor = 'rgb(225, 228, 232)',
}: IStoryCard) => {
  let cardSize = '';
  let padding = 0;

  switch (size) {
    case (size = 'XS'):
      cardSize = '285px';
      padding = 1;
      break;
    case (size = 'M'):
      cardSize = '767px';
      padding = 2;
      break;
    case (size = 'XL'):
      cardSize = '1024px';
      padding = 3;
      break;
  }

  return (
    <BorderBox
      width={'100%'}
      maxWidth={cardSize}
      borderColor={borderColor}
      borderRadius={4}
      p={padding}
    >
      <div>sad</div>
    </BorderBox>
  );
};

export default StoryCard;
