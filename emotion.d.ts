import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    borderRadius: { [key: string]: string };
    borderWidth: { [key: string | number]: string };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    colors: { [key: string]: { [key: number]: string } };
    fontSize: { [key: string]: string };
    fontWeight: { [key: string]: string };
    height: { [key: string | number]: string };
    lineHeight: { [key: string]: number };
    margin: { [key: string | number]: string };
    maxHeight: { [key: string | number]: string };
    maxWidth: { [key: string | number]: string };
    minHeight: { [key: string | number]: string };
    minWidth: { [key: string | number]: string };
    padding: { [key: string | number]: string };
    space: { [key: string | number]: string };
    width: { [key: string | number]: string };
  }
}
