import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { MdArrowBack, MdSportsBasketball } from 'react-icons/md';
import { Button } from '@/components';
import { useViewportScroll } from '@/hooks';
import { StyledHeader } from './Header.styles';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const router = useRouter();

  const isHome = router.pathname === '/';

  const { scrollY } = useViewportScroll();

  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (scrollY > 56) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
  }, [scrollY]);

  return (
    <StyledHeader showTitle={showTitle}>
      <div>
        <Button
          size='lg'
          fontWeight='bold'
          aria-label='Go back'
          onClick={() => {
            const [, season, gameId] = router.asPath.split('/');

            if (gameId) {
              router.back();
            } else if (season) {
              router.push('/');
            }
          }}
          css={(theme) => css`
            & > span {
              padding-left: ${!isHome && theme.padding[2]};
              white-space: nowrap;
              transition-property: padding;
              transition-duration: 300ms;
              transition-timing-function: ease-in-out;

              & > svg {
                width: ${theme.width[6]};
                height: ${theme.height[6]};
              }
              & > svg:first-of-type {
                width: ${theme.width[!isHome ? 7 : 0]};
                height: ${theme.height[!isHome ? 7 : 0]};
                margin-right: ${theme.space[!isHome ? 2 : 0]};
                opacity: ${!isHome ? 1 : 0};
                transition-property: width height margin opacity;
                transition-duration: 300ms;
                transition-timing-function: ease-in-out;
              }
              & > span {
                display: none;
                visibility: hidden;
                text-transform: uppercase;
              }
              & > span:first-of-type {
                color: ${theme.colors.primary[700]};
                margin-right: 1px;
              }
            }

            @media (min-width: ${theme.breakpoints.sm}) {
              & > span {
                & > svg:last-of-type {
                  margin-right: ${theme.space[1]};
                }
                & > span {
                  display: inline;
                  visibility: visible;
                }
              }
            }
          `}
        >
          <MdArrowBack />
          <MdSportsBasketball />
          <span>re</span>
          <span>play</span>
        </Button>

        <span>{title}</span>
      </div>
    </StyledHeader>
  );
};

export default Header;
