import type { FC, MutableRefObject } from 'react';
import { StyledSlider, StyledSliderProps } from './Slider.styles';

interface SliderProps extends StyledSliderProps {
  innerRef: MutableRefObject<HTMLDivElement>;
  api: { [key: string]: any };
}

const Slider: FC<SliderProps> = ({ innerRef, api, ...props }) => {
  return (
    <StyledSlider {...props} isDragging={api.isDragging}>
      <div ref={innerRef} {...api.rootProps}>
        <div {...api.controlProps}>
          <div {...api.trackProps}>
            <div {...api.rangeProps} />
          </div>
          <div {...api.thumbProps}>
            <input {...api.inputProps} />
          </div>
        </div>
      </div>
    </StyledSlider>
  );
};

export default Slider;