import { useState } from 'react';
import type { FC, Ref } from 'react';
import isFunction from 'lodash.isfunction';
import { StyledSwitch, StyledSwitchProps } from './Switch.styles';

interface SwitchProps extends StyledSwitchProps {
  innerRef?: Ref<HTMLButtonElement>;
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  disabled?: boolean;
}

const Switch: FC<SwitchProps> = ({
  innerRef,
  isChecked: initialIsChecked = false,
  onChange,
  ...props
}) => {
  const [isChecked, setChecked] = useState(initialIsChecked);

  return (
    <StyledSwitch
      ref={innerRef}
      role='switch'
      aria-checked={isChecked ? 'true' : 'false'}
      tabIndex={0}
      onClick={() => {
        if (isFunction(onChange)) onChange(!isChecked);
        setChecked(!isChecked);
      }}
      {...props}
    >
      <span>
        <span />
      </span>
    </StyledSwitch>
  );
};

export default Switch;
