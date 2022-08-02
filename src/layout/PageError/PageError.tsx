import type { FC } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Button, Feedback } from '../../components';

interface PageErrorProps {
  title: string;
  message: string;
}

const PageError: FC<PageErrorProps> = ({ title, message }) => {
  const router = useRouter();

  return (
    <main
      css={(theme) => css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: ${theme.width.full};
        max-width: ${theme.maxWidth['5xl']};
        min-height: calc(${theme.height.screen} - ${theme.height[16]});
        margin: ${theme.margin.center};
      `}
    >
      <Feedback type='error' title={title} message={message} py={16}>
        <Button
          variant='solid'
          colorScheme='error'
          fontWeight='medium'
          onClick={router.back}
        >
          Go back
        </Button>
      </Feedback>
    </main>
  );
};

export default PageError;
