import { createContext, useContext, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';

export type ScheduleContextProps = {
  scrollToRef: RefObject<HTMLDivElement>;
  scrollAreaRef: RefObject<HTMLDivElement>;
};

const ScheduleContext = createContext<ScheduleContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollToRef: null as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollAreaRef: null as any,
});

export const ScheduleContextProvider = (props: { children: ReactNode }) => {
  const scrollToRef = useRef(null);
  const scrollAreaRef = useRef(null);

  return (
    <ScheduleContext.Provider
      {...props}
      value={{
        scrollToRef,
        scrollAreaRef,
      }}
    />
  );
};

export const useScheduleContext = () => {
  return useContext(ScheduleContext);
};
