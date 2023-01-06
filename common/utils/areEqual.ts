import { shallowDiffers } from './shallowDiffers';

// Pulled from react-window
// https://github.com/bvaughn/react-window/blob/master/src/areEqual.js
export const areEqual = (prevProps: Object, nextProps: Object): boolean => {
  // @ts-ignore
  const { style: prevStyle, ...prevRest } = prevProps;
  // @ts-ignore
  const { style: nextStyle, ...nextRest } = nextProps;

  return (
    !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest)
  );
};
