import { useEffect, useState } from 'react';
import type { FC, ReactNode, UIEvent } from 'react';
import { css } from '@emotion/react';
import { useScheduleContext } from '../../../context';

interface ScrollAreaProps {
  children: ReactNode;
}

const ScrollArea: FC<ScrollAreaProps> = ({ children }) => {
  const { scrollAreaRef } = useScheduleContext();

  const [leftOpacity, setLeftOpacity] = useState(1);
  const [rightOpacity, setRightOpacity] = useState(1);

  useEffect(() => {
    const el = scrollAreaRef.current;

    const { clientWidth = 0, scrollLeft = 0, scrollWidth = 0 } = el ?? {};

    if (scrollLeft === 0) {
      setLeftOpacity(0);
    } else if (scrollLeft + clientWidth >= scrollWidth) {
      setRightOpacity(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (e: UIEvent<HTMLElement>): void => {
    e.stopPropagation();

    const { clientWidth, scrollLeft, scrollWidth } = e.currentTarget;

    const width = scrollWidth - clientWidth;

    if (scrollLeft < 8) {
      setLeftOpacity(0);
    } else if (scrollLeft > width - 8) {
      setRightOpacity(0);
    } else {
      setLeftOpacity(1);
      setRightOpacity(1);
    }
  };

  return (
    <div
      css={(theme) => css`
        position: relative;
        overflow: hidden;
        width: ${theme.width.full};
        border-radius: ${theme.borderRadius.xl};

        @media (min-width: ${theme.breakpoints.sm}) {
          width: calc(${theme.width.full} - ${theme.width[12]} * 2);
        }
      `}
    >
      <div
        css={(theme) => css`
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: ${theme.width[6]};
          height: ${theme.height.full};
          background: linear-gradient(
            to right,
            ${theme.colors.white},
            ${theme.colors.transparent}
          );
          opacity: ${leftOpacity};
          transition: opacity 300ms ease-in-out;
          pointer-events: none;
        `}
      />
      <div
        css={(theme) => css`
          position: absolute;
          z-index: 1;
          top: 0;
          right: 0;
          width: ${theme.width[6]};
          height: ${theme.height.full};
          background: linear-gradient(
            to left,
            ${theme.colors.white},
            ${theme.colors.transparent}
          );
          opacity: ${rightOpacity};
          transition: opacity 300ms ease-in-out;
          pointer-events: none;
        `}
      />

      <div
        ref={scrollAreaRef}
        onScroll={handleScroll}
        css={(theme) => css`
          overflow-x: auto;
          overflow-y: hidden;
          display: flex;
          gap: ${theme.space[2]};
          align-items: center;
          width: ${theme.width.full};
          scrollbar-width: none;
          -ms-overflow-style: none;

          &::-webkit-scrollbar {
            width: ${theme.width[0]};
            height: ${theme.height[0]};
          }

          & > button > span {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            gap: ${theme.space[1]};
            justify-content: center;
            align-items: center;
            width: ${theme.width.auto};
            min-width: ${theme.width[28]};

            & > span {
              text-transform: uppercase;
            }
          }

          @media (min-width: ${theme.breakpoints.sm}) {
            gap: ${theme.space[2]};
          }
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollArea;
