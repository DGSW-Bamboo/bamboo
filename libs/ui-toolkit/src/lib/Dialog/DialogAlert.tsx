import React, { useCallback } from 'react';
import { Box, Button, Dialog, Text } from '@primer/components';

type Props = {
  isOpen: boolean;
  handleDialog: () => void;
  header: string;
  handleClick?: (arg?: any) => void;
  buttonText: string;
  buttonFontColor?: string;
  content?: string;
  dialogHeaderColor?: string;
  buttonSize?: string;
};

const DialogAlert = ({
  isOpen,
  handleDialog,
  header,
  handleClick,
  buttonText,
  buttonFontColor,
  content,
  buttonSize = '100%',
  dialogHeaderColor,
}: Props) => {
  const handleClickButton = useCallback(() => {
    handleClick();
  }, [handleClick]);

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={handleDialog}
      aria-labelledby="header-id"
    >
      <Dialog.Header id="header-id">
        <Text
          fontFamily="sans-serif"
          color={dialogHeaderColor}
          fontWeight={600}
          fontSize={14}
        >
          {header}
        </Text>
      </Dialog.Header>
      <Box p={3}>
        <Box>{content}</Box>
        <Button size={buttonSize} onClick={handleClickButton}>
          <Text color={buttonFontColor}>{buttonText}</Text>
        </Button>
      </Box>
    </Dialog>
  );
};

export default DialogAlert;
