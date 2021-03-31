import React, { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Button,
  ButtonDanger,
  ButtonPrimary,
  Dialog,
  Text,
} from '@primer/components';
import { DialogType } from './DialogAlert.type';
import { color } from 'styled-system';

interface IDialog {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  focusRef: React.RefObject<HTMLElement>;
  header: string;
  type: DialogType;
  handleClick?: (arg?: any) => void;
}

const DialogAlert = ({
  isOpen,
  setIsOpen,
  focusRef,
  header,
  type = 'normal',
  handleClick,
}: IDialog) => {
  let dialogColor = '#000';

  switch (type) {
    case (type = 'normal'):
      dialogColor = '#000';
      break;
    case (type = 'reject'):
      dialogColor = '#cb2431';
      break;
    case (type = 'accept'):
      dialogColor = '#22863a';
      break;
  }
  return (
    <>
      <span />
      <Dialog
        returnFocusRef={focusRef}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        aria-labelledby="header-id"
      >
        <Dialog.Header id="header-id">
          <Text
            fontFamily="sans-serif"
            color={dialogColor}
            fontWeight={600}
            fontSize={14}
          >
            {header}
          </Text>
        </Dialog.Header>
        <Box p={3}>
          {type === 'accept' ? (
            <ButtonPrimary size={'100%'} onClick={handleClick}>
              승인하겠습니다.
            </ButtonPrimary>
          ) : type === 'reject' ? (
            <ButtonDanger size={'100%'} onClick={handleClick}>
              거절하겠습니다.
            </ButtonDanger>
          ) : (
            <Button size={'100%'} onClick={handleClick}>
              확인했습니다.
            </Button>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default DialogAlert;
