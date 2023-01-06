import type { FC, Ref } from 'react';
import type { SerializedStyles, Theme } from '@emotion/react';
import { StyledButton, StyledButtonProps } from './Button.styles';

interface ButtonProps extends StyledButtonProps {
  innerRef?: Ref<HTMLButtonElement>;
  css?: (theme: Theme) => SerializedStyles;
}

const Button: FC<ButtonProps> = ({ innerRef, children, ...props }) => {
  return (
    <StyledButton ref={innerRef} {...props}>
      <span>{children}</span>
    </StyledButton>
  );
};

export default Button;
