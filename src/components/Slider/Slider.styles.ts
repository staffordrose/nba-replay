import styled from '@emotion/styled';
import { ColorScheme } from '../../common/types';
import { getObjProp } from '../../common/utils';

const VARIANT = 'solid';
const COLOR_SCHEME = 'primary';

const variants: {
  [key: string]: (args: { colorScheme?: ColorScheme }) => {
    thumbBg: string;
    trackBg: string;
    rangeBg: string;
    _hover: {
      thumbBg: string;
    };
    _active: {
      thumbBg: string;
    };
  };
} = {
  solid: ({ colorScheme = COLOR_SCHEME }) => ({
    thumbBg: `${colorScheme}.500`,
    trackBg: `${colorScheme}.100`,
    rangeBg: `${colorScheme}.400`,
    _hover: {
      thumbBg: `${colorScheme}.600`,
    },
    _active: {
      thumbBg: `${colorScheme}.700`,
    },
  }),
};

export interface StyledSliderProps {
  variant?: 'solid';
  colorScheme?: ColorScheme;
  isDragging?: boolean;
  thumbBg?: string;
  trackBg?: string;
  rangeBg?: string;
  _hover?: {
    thumbBg?: string;
  };
  _active?: {
    thumbBg?: string;
  };
}

export const StyledSlider = styled.div<StyledSliderProps>`
  [data-part='root'] {
    cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'pointer')};
  }

  [data-part='thumb'] {
    width: ${({ theme }) => theme.width[8]};
    height: ${({ theme }) => theme.height[8]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    outline: none;
    background-color: ${({
      theme,
      variant = VARIANT,
      colorScheme = COLOR_SCHEME,
      thumbBg,
    }) =>
      thumbBg
        ? thumbBg.includes('.')
          ? getObjProp(theme.colors, thumbBg)
          : thumbBg
        : getObjProp(theme.colors, variants[variant]({ colorScheme }).thumbBg)};
    cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};

    &:hover {
      background-color: ${({
        theme,
        variant = VARIANT,
        colorScheme = COLOR_SCHEME,
        _hover,
      }) =>
        _hover?.thumbBg
          ? _hover.thumbBg.includes('.')
            ? getObjProp(theme.colors, _hover.thumbBg)
            : _hover.thumbBg
          : getObjProp(
              theme.colors,
              variants[variant]({ colorScheme })._hover.thumbBg
            )};
    }
    &:active {
      background-color: ${({
        theme,
        variant = VARIANT,
        colorScheme = COLOR_SCHEME,
        _active,
      }) =>
        _active?.thumbBg
          ? _active.thumbBg.includes('.')
            ? getObjProp(theme.colors, _active.thumbBg)
            : _active.thumbBg
          : getObjProp(
              theme.colors,
              variants[variant]({ colorScheme })._active.thumbBg
            )};
    }
  }

  [data-part='control'] {
    position: relative;
    display: flex;
    align-items: center;
    padding-top: ${({ theme }) => theme.padding[3.5]};
    padding-bottom: ${({ theme }) => theme.padding[3.5]};
  }

  [data-part='track'] {
    flex: 1 1 0%;
    width: ${({ theme }) => theme.width.full};
    height: ${({ theme }) => theme.space[1]};
    border-radius: ${({ theme }) => theme.space[0.5]};
    background-color: ${({
      theme,
      variant = VARIANT,
      colorScheme = COLOR_SCHEME,
      trackBg,
    }) =>
      trackBg
        ? trackBg.includes('.')
          ? getObjProp(theme.colors, trackBg)
          : trackBg
        : getObjProp(theme.colors, variants[variant]({ colorScheme }).trackBg)};
  }

  [data-part='range'] {
    height: ${({ theme }) => theme.height.full};
    border-radius: inherit;
    background-color: ${({
      theme,
      variant = VARIANT,
      colorScheme = COLOR_SCHEME,
      rangeBg,
    }) =>
      rangeBg
        ? rangeBg.includes('.')
          ? getObjProp(theme.colors, rangeBg)
          : rangeBg
        : getObjProp(theme.colors, variants[variant]({ colorScheme }).rangeBg)};
  }
`;
