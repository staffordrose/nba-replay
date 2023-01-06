// Pulled from react-window
// https://github.com/bvaughn/react-window/blob/master/src/shallowDiffers.js
export function shallowDiffers(prev: Object, next: Object): boolean {
  for (let attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }
  for (let attribute in next) {
    // @ts-ignore
    if (prev[attribute] !== next[attribute]) {
      return true;
    }
  }
  return false;
}
