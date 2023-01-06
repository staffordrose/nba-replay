import isObject from 'lodash.isobject';
import isString from 'lodash.isstring';

type Obj = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const getObjProp = (obj: Obj, path: string) => {
  if (!isString(path)) return null;

  const pathArr: string[] = path.split('.');

  let current = obj;

  while (pathArr.length) {
    if (!isObject(current)) break;
    current = current[pathArr.shift() as keyof typeof current];
  }

  return current;
};
