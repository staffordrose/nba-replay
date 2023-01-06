import type { FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { MdOpenInNew } from 'react-icons/md';
import { StyledFooter } from './Footer.styles';

const Footer: FC = () => {
  return (
    <StyledFooter>
      <div>
        <Link href='/'>
          <a>Home</a>
        </Link>

        <a
          href='https://github.com/staffordrose/nba-replay'
          target='_blank'
          rel='noopener noreferrer'
          css={(theme) => css`
            display: inline-flex;
            gap: ${theme.space[1]};
            align-items: center;

            & > svg {
              width: ${theme.width[4.5]};
              height: ${theme.height[4.5]};
            }
          `}
        >
          Github
          <MdOpenInNew />
        </a>
      </div>
    </StyledFooter>
  );
};

export default Footer;
