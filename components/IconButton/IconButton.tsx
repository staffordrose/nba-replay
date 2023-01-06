import type { FC, Ref } from 'react';
import type { SerializedStyles, Theme } from '@emotion/react';
import { StyledIconButton, StyledIconButtonProps } from './IconButton.styles';

export type IconButtonProps = StyledIconButtonProps & {
  innerRef?: Ref<HTMLButtonElement>;
  css?: (theme: Theme) => SerializedStyles;
};

export const IconButton: FC<IconButtonProps> = ({
  innerRef,
  children,
  ...props
}) => {
  return (
    <StyledIconButton ref={innerRef} {...props}>
      <span>{children}</span>
    </StyledIconButton>
  );
};
