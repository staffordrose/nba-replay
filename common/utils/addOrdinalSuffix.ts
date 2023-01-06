export const addOrdinalSuffix = (num: number): string => {
  let a = num % 10,
    b = num % 100;

  if (a == 1 && b != 11) return num + 'st';

  if (a == 2 && b != 12) return num + 'nd';

  if (a == 3 && b != 13) return num + 'rd';

  return num + 'th';
};
