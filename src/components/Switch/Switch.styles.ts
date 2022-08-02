import styled from '@emotion/styled';
import isNumber from 'lodash.isnumber';
import { ColorScheme } from '../../common/types';
import { getObjProp } from '../../common/utils';

const VARIANT = 'solid';
const COLOR_SCHEME = 'primary';

const variants: {
  [key: string]: (args: { colorScheme?: ColorScheme }) => {
    borderColor1: string;
    borderColor2: string;
    color: string;
    bg: string;
    _hover: {
      color: string;
      bg: string;
    };
    _active: {
      color: string;
      bg: string;
    };
    _disabled: {
      borderColor: string;
      color: string;
      bg: string;
      opacity: number;
    };
  };
} = {
  solid: ({ colorScheme = COLOR_SCHEME }) => ({
    borderColor1: `${colorScheme}.500`,
    borderColor2: `${colorScheme}.600`,
    color: `${colorScheme}.50`,
    bg: `${colorScheme}.500`,
    _hover: {
      color: `${colorScheme}.100`,
      bg: `${colorScheme}.600`,
    },
    _active: {
      color: `${colorScheme}.200`,
      bg: `${colorScheme}.700`,
    },
    _disabled: {
      borderColor: 'gray.600',
      color: 'gray.50',
      bg: 'gray.500',
      opacity: 0.5,
    },
  }),
  light: ({ colorScheme = COLOR_SCHEME }) => ({
    borderColor1: `${colorScheme}.50`,
    borderColor2: `${colorScheme}.100`,
    color: `${colorScheme}.500`,
    bg: `${colorScheme}.50`,
    _hover: {
      color: `${colorScheme}.600`,
      bg: `${colorScheme}.100`,
    },
    _active: {
      color: `${colorScheme}.700`,
      bg: `${colorScheme}.200`,
    },
    _disabled: {
      borderColor: 'gray.100',
      color: 'gray.500',
      bg: 'gray.50',
      opacity: 0.5,
    },
  }),
};

export interface StyledSwitchProps {
  variant?: 'solid' | 'light';
  colorScheme?: ColorScheme;
  orientation?: 'horizontal' | 'vertical';
  borderColor?: string;
  color?: string;
  bg?: string;
  _hover?: {
    borderColor?: string;
    color?: string;
    bg?: string;
  };
  _active?: {
    borderColor?: string;
    color?: string;
    bg?: string;
  };
  _disabled?: {
    borderColor?: string;
    color?: string;
    bg?: string;
    opacity?: number;
  };
}

export const StyledSwitch = styled.button<StyledSwitchProps>`
  width: ${({ theme, orientation }) =>
    orientation === 'vertical'
      ? `calc(${theme.width[10]} - ${theme.width[0.5]})`
      : `calc(${theme.width[14]} - ${theme.width[0.5]})`};
  height: ${({ theme, orientation }) =>
    orientation === 'vertical'
      ? `calc(${theme.width[14]} - ${theme.width[0.5]})`
      : `calc(${theme.width[10]} - ${theme.width[0.5]})`};
  padding: ${({ theme }) => theme.borderWidth[3]};
  border: none;
  border-radius: ${({ theme }) => theme.space[6]};
  background: ${({
    theme,
    variant = VARIANT,
    colorScheme = COLOR_SCHEME,
    borderColor,
  }) =>
    borderColor
      ? borderColor.includes('.')
        ? getObjProp(theme.colors, borderColor)
        : borderColor
      : `linear-gradient(
      135deg,
      ${getObjProp(
        theme.colors,
        variants[variant]({ colorScheme }).borderColor1
      )},
      ${getObjProp(
        theme.colors,
        variants[variant]({ colorScheme }).borderColor2
      )}
    )`};
  cursor: pointer;

  & > span {
    position: relative;
    display: flex;
    width: ${({ theme }) => theme.width.full};
    height: ${({ theme }) => theme.height.full};
    border-radius: ${({ theme }) => theme.space[5.5]};
    background-color: ${({
      theme,
      variant = VARIANT,
      colorScheme = COLOR_SCHEME,
      bg,
    }) =>
      bg
        ? bg.includes('.')
          ? getObjProp(theme.colors, bg)
          : bg
        : getObjProp(theme.colors, variants[variant]({ colorScheme }).bg)};

    & > span {
      position: absolute;
      display: block;
      width: ${({ theme }) => theme.width[8]};
      height: ${({ theme }) => theme.height[8]};
      border-radius: ${({ theme }) => theme.borderRadius.full};
      background-color: ${({
        theme,
        variant = VARIANT,
        colorScheme = COLOR_SCHEME,
        color,
      }) =>
        color
          ? color.includes('.')
            ? getObjProp(theme.colors, color)
            : color
          : getObjProp(theme.colors, variants[variant]({ colorScheme }).color)};
      transition: transform 300ms ease-in-out;
    }
  }

  &[aria-checked='true'] {
    & > span {
      & > span {
        transform: ${({ theme, orientation }) =>
          orientation === 'vertical'
            ? `translateY(${theme.height[4]})`
            : `translateX(${theme.width[4]})`};
      }
    }
  }

  &:hover {
    & > span {
      background-color: ${({
        theme,
        variant = VARIANT,
        colorScheme = COLOR_SCHEME,
        _hover,
      }) =>
        _hover?.bg
          ? _hover.bg.includes('.')
            ? getObjProp(theme.colors, _hover.bg)
            : _hover.bg
          : getObjProp(
              theme.colors,
              variants[variant]({ colorScheme })._hover.bg
            )};

      & > span {
        background-color: ${({
          theme,
          variant = VARIANT,
          colorScheme = COLOR_SCHEME,
          _hover,
        }) =>
          _hover?.color
            ? _hover.color.includes('.')
              ? getObjProp(theme.colors, _hover.color)
              : _hover.color
            : getObjProp(
                theme.colors,
                variants[variant]({ colorScheme })._hover.color
              )};
      }
    }
  }

  &:active {
    & > span {
      background-color: ${({
        theme,
        variant = VARIANT,
        colorScheme = COLOR_SCHEME,
        _active,
      }) =>
        _active?.bg
          ? _active.bg.includes('.')
            ? getObjProp(theme.colors, _active.bg)
            : _active.bg
          : getObjProp(
              theme.colors,
              variants[variant]({ colorScheme })._active.bg
            )};

      & > span {
        background-color: ${({
          theme,
          variant = VARIANT,
          colorScheme = COLOR_SCHEME,
          _active,
        }) =>
          _active?.color
            ? _active.color.includes('.')
              ? getObjProp(theme.colors, _active.color)
              : _active.color
            : getObjProp(
                theme.colors,
                variants[variant]({ colorScheme })._active.color
              )};
      }
    }
  }

  &:disabled {
    background-color: ${({
      theme,
      variant = VARIANT,
      colorScheme = COLOR_SCHEME,
      _disabled,
    }) =>
      _disabled?.borderColor
        ? _disabled.borderColor.includes('.')
          ? getObjProp(theme.colors, _disabled.borderColor)
          : _disabled.borderColor
        : getObjProp(
            theme.colors,
            variants[variant]({ colorScheme })._disabled.borderColor
          )};
    opacity: ${({ variant = VARIANT, _disabled }) =>
      isNumber(_disabled?.opacity)
        ? _disabled?.opacity
        : variants[variant]({})._disabled.opacity};
    cursor: not-allowed;

    & > span {
      background-color: ${({
        theme,
        variant = VARIANT,
        colorScheme = COLOR_SCHEME,
        _disabled,
      }) =>
        _disabled?.bg
          ? _disabled.bg.includes('.')
            ? getObjProp(theme.colors, _disabled.bg)
            : _disabled.bg
          : getObjProp(
              theme.colors,
              variants[variant]({ colorScheme })._disabled.bg
            )};

      & > span {
        background-color: ${({
          theme,
          variant = VARIANT,
          colorScheme = COLOR_SCHEME,
          _disabled,
        }) =>
          _disabled?.color
            ? _disabled.color.includes('.')
              ? getObjProp(theme.colors, _disabled.color)
              : _disabled.color
            : getObjProp(
                theme.colors,
                variants[variant]({ colorScheme })._disabled.color
              )};
      }
    }
  }
`;
