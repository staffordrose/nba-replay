import { createContext, useContext, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';

export type ScheduleContextProps = {
  scrollToRef: RefObject<HTMLDivElement>;
  scrollAreaRef: RefObject<HTMLDivElement>;
};

const ScheduleContext = createContext<ScheduleContextProps>({
  scrollToRef: null as any,
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
