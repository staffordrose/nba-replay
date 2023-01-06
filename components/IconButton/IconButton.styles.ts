import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import isNumber from 'lodash.isnumber';
import isString from 'lodash.isstring';
import { ColorScheme } from '@/common/types';
import { getObjProp } from '@/common/utils';

const VARIANT = 'light';
const COLOR_SCHEME = 'primary';

const variants: {
  [key: string]: (args: { colorScheme?: ColorScheme }) => {
    borderColor1: string;
    borderColor2: string;
    color: string;
    bg: string;
    _hover: {
      bg: string;
    };
    _active: {
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
      bg: `${colorScheme}.600`,
    },
    _active: {
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
      bg: `${colorScheme}.100`,
    },
    _active: {
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

const sizes: { [key: string]: number } = {
  xs: 8,
  sm: 9,
  md: 10,
  lg: 11,
  xl: 12,
};

const iconSizes: { [key: string]: number } = {
  xs: 4,
  sm: 5,
  md: 6,
  lg: 7,
  xl: 8,
};

const borderWidthSizes: { [key: string]: string | number } = {
  xs: 'base',
  sm: 'base',
  md: 2,
  lg: 3,
  xl: 3,
};

const borderRadiusSizes: { [key: string]: string } = {
  xs: 'xs',
  sm: 'sm',
  md: 'base',
  lg: 'lg',
  xl: 'xl',
};

const innerBorderRadiusSizes: { [key: string]: string } = {
  xs: '2xs',
  sm: 'xs',
  md: 'sm',
  lg: 'base',
  xl: 'lg',
};

export interface StyledIconButtonProps {
  variant?: 'solid' | 'light';
  colorScheme?: ColorScheme;
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  iconSize?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  width?: string | number;
  height?: string | number;
  p?: string | number;
  px?: string | number;
  py?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  borderWidth?: string | number;
  borderColor?: string;
  borderRadius?: string | number;
  fontSize?: string;
  fontWeight?: 'light' | 'medium' | 'bold';
  color?: string;
  bg?: string;
  _hover?: {
    bg?: string;
  };
  _active?: {
    bg?: string;
  };
  _disabled?: {
    borderColor?: string;
    color?: string;
    bg?: string;
    opacity?: number;
  };
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export const StyledIconButton = styled.button<StyledIconButtonProps>`
  width: ${({ theme, size, width }) =>
    width ? theme.width[width] : theme.width[sizes[size || 'md']]};
  height: ${({ theme, height, size }) =>
    height ? theme.height[height] : theme.height[sizes[size || 'md']]};
  padding: ${({ theme, borderWidth, size }) =>
    isNumber(borderWidth)
      ? theme.width[borderWidth]
      : theme.borderWidth[borderWidthSizes[size || 'md']]};
  border: none;
  border-radius: ${({ theme, borderRadius, size }) =>
    borderRadius
      ? isString(borderRadius)
        ? theme.borderRadius[borderRadius]
        : borderRadius
      : theme.borderRadius[borderRadiusSizes[size || 'md']]};
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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: ${({ theme }) => theme.width.full};
    height: ${({ theme }) => theme.height.full};
    padding-left: ${({ theme, p, px, pl }) =>
      isNumber(pl) || isNumber(px) || isNumber(p)
        ? theme.padding[pl ?? px ?? p ?? 0]
        : theme.padding[0]};
    padding-right: ${({ theme, p, px, pr }) =>
      isNumber(pr) || isNumber(px) || isNumber(p)
        ? theme.padding[pr ?? px ?? p ?? 0]
        : theme.padding[0]};
    border-radius: ${({ theme, borderRadius, size }) =>
      borderRadius
        ? isString(borderRadius)
          ? theme.borderRadius[borderRadius]
          : borderRadius
        : theme.borderRadius[innerBorderRadiusSizes[size || 'md']]};
    font-size: ${({ theme, fontSize, size }) =>
      fontSize ? theme.fontSize[fontSize] : theme.fontSize[size || 'md']};
    font-weight: ${({ theme, fontWeight }) =>
      theme.fontWeight[fontWeight || 'light']};
    color: ${({
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
    background-color: ${({
      theme,
      active,
      variant = VARIANT,
      colorScheme = COLOR_SCHEME,
      bg,
      _active,
    }) =>
      active
        ? _active?.bg
          ? _active.bg.includes('.')
            ? getObjProp(theme.colors, _active.bg)
            : _active.bg
          : getObjProp(
              theme.colors,
              variants[variant]({ colorScheme })._active.bg
            )
        : bg
        ? bg.includes('.')
          ? getObjProp(theme.colors, bg)
          : bg
        : getObjProp(theme.colors, variants[variant]({ colorScheme }).bg)};

    & > svg {
      width: ${({ theme, iconSize, size }) =>
        iconSize
          ? theme.width[iconSizes[iconSize]]
          : theme.width[iconSizes[size || 'md']]};
      height: ${({ theme, iconSize, size }) =>
        iconSize
          ? theme.height[iconSizes[iconSize]]
          : theme.height[iconSizes[size || 'md']]};
      vertical-align: bottom;
    }
  }

  &:hover {
    & > span {
      background-color: ${({
        theme,
        active,
        variant = VARIANT,
        colorScheme = COLOR_SCHEME,
        _hover,
        _active,
      }) =>
        active
          ? _active?.bg
            ? _active.bg.includes('.')
              ? getObjProp(theme.colors, _active.bg)
              : _active.bg
            : getObjProp(
                theme.colors,
                variants[variant]({ colorScheme })._active.bg
              )
          : _hover?.bg
          ? _hover.bg.includes('.')
            ? getObjProp(theme.colors, _hover.bg)
            : _hover.bg
          : getObjProp(
              theme.colors,
              variants[variant]({ colorScheme })._hover.bg
            )};
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
    }
  }

  &:disabled {
    background: ${({
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
      color: ${({
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
    }
  }
`;
