import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { scheduleItems } from '../../common/data';
import { Button, IconButton } from '../../components';
import ScrollArea from './ScrollArea';
import { useScheduleContext } from '../../context';

const Schedule: FC = () => {
  const router = useRouter();
  const { query } = router;

  const [activeItemId, setActiveItemId] = useState(
    (query.id as string) || scheduleItems[0].id
  );

  const activeItemIndex = scheduleItems.findIndex(
    ({ id }) => id === activeItemId
  );

  useEffect(() => {
    scheduleItemEls.current[activeItemIndex]?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { scrollToRef, scrollAreaRef } = useScheduleContext();

  const scheduleItemEls = useRef<(HTMLElement | null)[]>([]);

  const setScheduleItem = (nextIndex: number) => {
    const nextItem = scheduleItems[nextIndex];
    const nextItemEl = scheduleItemEls.current[nextIndex];

    setActiveItemId(nextItem.id);

    router.push(
      {
        pathname: router.basePath,
        query: { ...router.query, id: nextItem.id },
      },
      '',
      { scroll: false }
    );

    const itemOffsetWidth = nextItemEl?.offsetWidth ?? 0;
    const itemOffsetLeft = nextItemEl?.offsetLeft ?? 0;
    const scrollAreaOffsetWidth = scrollAreaRef.current?.offsetWidth ?? 0;

    scrollAreaRef.current?.scrollTo({
      left: itemOffsetLeft + itemOffsetWidth / 2 - scrollAreaOffsetWidth / 2,
      behavior: 'smooth',
    });

    window.scrollTo({
      top: (scrollToRef.current?.offsetTop ?? 56) - 56,
      behavior: 'smooth',
    });
  };

  return (
    <div
      css={(theme) => css`
        position: relative;
        display: flex;
        gap: ${theme.space[2]};
        align-items: center;
        width: ${theme.width.full};
        max-width: ${theme.maxWidth['7xl']};
        margin: ${theme.margin.center};
        padding: ${theme.padding[2]};
        background: linear-gradient(
          to right,
          transparent 0,
          ${theme.colors.primary[50]} 25%,
          ${theme.colors.primary[50]} 75%,
          transparent 100%
        );
        box-shadow: 0 8px 12px -2px ${theme.colors.whiteAlpha[600]},
          0 4px 8px -4px ${theme.colors.whiteAlpha[600]};

        &::after {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: ${theme.width.full};
          height: ${theme.height.full};
          background-color: ${theme.colors.white};
        }

        & > button {
          display: none;
          visibility: hidden;
        }

        @media (min-width: ${theme.breakpoints.sm}) {
          & > button {
            display: block;
            visibility: visible;
            width: ${theme.width[12]};
            height: ${theme.height[12]};
          }
        }
      `}
    >
      <IconButton
        colorScheme='primary'
        size='xl'
        borderRadius='full'
        onClick={() => {
          if (activeItemIndex > 0) {
            setScheduleItem(activeItemIndex - 1);
          }
        }}
        disabled={activeItemIndex === 0}
      >
        <MdKeyboardArrowLeft />
      </IconButton>

      <ScrollArea>
        {scheduleItems.map(({ id, beforeText, text, afterText }, index) => (
          <Button
            key={id}
            innerRef={(el) => (scheduleItemEls.current[index] = el)}
            variant='solid'
            size='xl'
            height={22}
            px={2}
            onClick={() => setScheduleItem(index)}
            active={id === activeItemId}
          >
            {!!beforeText && (
              <span
                css={(theme) => css`
                  font-size: ${theme.fontSize.xs};
                `}
              >
                {beforeText}
              </span>
            )}

            <span
              css={(theme) => css`
                font-weight: ${theme.fontWeight.medium};
              `}
            >
              {text}
            </span>

            {!!afterText && (
              <span
                css={(theme) => css`
                  font-size: ${theme.fontSize.xs};
                `}
              >
                {afterText}
              </span>
            )}
          </Button>
        ))}
      </ScrollArea>

      <IconButton
        colorScheme='primary'
        size='xl'
        borderRadius='full'
        onClick={() => {
          if (activeItemIndex < scheduleItems.length - 1) {
            setScheduleItem(activeItemIndex + 1);
          }
        }}
        disabled={activeItemIndex === scheduleItems.length - 1}
      >
        <MdKeyboardArrowRight />
      </IconButton>
    </div>
  );
};

export default Schedule;
