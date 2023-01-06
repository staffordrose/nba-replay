export const rgbToHsl = (str: string) => {
  const arr = str
    .substring(str.indexOf('(') + 1, str.lastIndexOf(')'))
    .split(',')
    .map((str) => Number(str.trim()));

  let r = arr[0],
    g = arr[1],
    b = arr[2];
  (r /= 255), (g /= 255), (b /= 255);

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h *= 360;
  s *= 100;
  l *= 100;

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
};
