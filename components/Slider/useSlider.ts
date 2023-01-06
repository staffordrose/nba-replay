import { useId } from 'react';
import { normalizeProps, useMachine, useSetup } from '@zag-js/react';
import * as slider from '@zag-js/slider';

export type UseSliderProps = {
  name: string;
  origin?: 'start' | 'center';
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (details: { value: number }) => void;
  onChangeEnd?: (details: { value: number }) => void;
  disabled?: boolean;
  readonly?: boolean;
};

export const useSlider = ({
  name,
  origin = 'start',
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange,
  onChangeEnd,
  disabled = false,
  readonly = false,
}: UseSliderProps) => {
  const [state, send] = useMachine(
    slider.machine({
      name,
      origin,
      min,
      max,
      step,
      value,
      onChange,
      onChangeEnd,
      disabled,
      readonly,
    })
  );
  const ref = useSetup<HTMLDivElement>({ send, id: useId() });
  const api = slider.connect(state, send, normalizeProps);

  return { ref, api };
};
