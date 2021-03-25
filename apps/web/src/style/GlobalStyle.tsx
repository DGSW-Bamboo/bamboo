/** @jsx jsx */
import { Global, css, jsx } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}
    />
  );
};

export default GlobalStyle;
