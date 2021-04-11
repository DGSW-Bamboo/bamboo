import React, { useCallback, useMemo, useState } from 'react';
import {
  BorderBox,
  ButtonDanger,
  ButtonGroup,
  ButtonPrimary,
  Text,
} from '@primer/components';
import { WidthRatio } from './StoryCard.type';
import styled from 'styled-components';
import DialogAlert from '../Dialog';

/**어드민, 메인에서 보일 스토리 카드 */

type Props = {
  size: WidthRatio;
  hashTag: string;
  content: string;
  isAdmin: boolean;
  handleReject?: () => void;
  handleAccept?: () => void;
};

const StoryCard = ({
  size,
  hashTag,
  content,
  isAdmin,
  handleReject,
  handleAccept,
}: Props) => {
  const [isRejctOpen, setIsRejectOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);

  const borderColor = 'rgb(225, 228, 232)';

  const cardSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return '285px';
      case 'm':
        return '767px';
      case 'xl':
        return '1024px';
    }
  }, [size]);

  const padding = useMemo(() => {
    switch (size) {
      case 'xs':
        return 1;
      case 'm':
        return 2;
      case 'xl':
        return 3;
    }
  }, [size]);

  const handleRejectOpen = useCallback(() => {
    setIsRejectOpen((prevState) => !prevState);
  }, []);

  const handleAcceptOpen = useCallback(() => {
    setIsAcceptOpen((prevState) => !prevState);
  }, []);

  const dialogAlertProps = useMemo(
    () =>
      isRejctOpen
        ? {
            isOpen: isRejctOpen,
            handleDialog: handleRejectOpen,
            header: '게시글을 거절하시겠습니까?',
            handleClick: handleReject,
            buttonText: '거절하겠습니다.',
            buttonFontColor: '#cb2431',
            dialogHeaderColor: '#cb2431',
          }
        : {
            isOpen: isAcceptOpen,
            handleDialog: handleAcceptOpen,
            header: '게시글을 승인하시겠습니까?',
            handleClick: handleAccept,
            buttonText: '승인하겠습니다.',
            buttonFontColor: '#22863a',
            dialogHeaderColor: '#22863a',
          },
    [
      handleAccept,
      handleAcceptOpen,
      handleReject,
      handleRejectOpen,
      isAcceptOpen,
      isRejctOpen,
    ]
  );

  return (
    <BorderBox
      width={'100%'}
      maxWidth={cardSize}
      borderColor={borderColor}
      borderRadius={4}
      p={padding}
    >
      <Text fontFamily="sans-serif" fontWeight={600} fontSize={16}>
        {hashTag}
      </Text>
      <Content>{content}</Content>
      {isAdmin && (
        <>
          <ButtonGroup my={1}>
            <ButtonDanger onClick={handleRejectOpen}>
              게시글 거절하기
            </ButtonDanger>
            <ButtonPrimary onClick={handleAcceptOpen}>
              게시글 승인하기
            </ButtonPrimary>
          </ButtonGroup>

          {(isRejctOpen || isAcceptOpen) && (
            <DialogAlert {...dialogAlertProps} />
          )}
        </>
      )}
    </BorderBox>
  );
};

const Content = styled.div`
  margin: 10px 0px;
  font-size: 14px;
  color: #586069;
`;

export default StoryCard;
