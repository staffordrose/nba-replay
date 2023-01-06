import { useEffect, useLayoutEffect, useState } from 'react';
import { throttle } from '@/common/utils';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface UseViewportScroll {
  active?: boolean;
}

const useViewportScroll = ({ active = true }: UseViewportScroll = {}) => {
  const [viewportScroll, setViewportScroll] = useState<{
    scrollY: number;
    scrollYProgress: number;
    scrollDir: 'up' | 'down' | null;
  }>({ scrollY: 0, scrollYProgress: 0, scrollDir: null });

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined' && active) {
      const onScroll = () =>
        throttle(() => {
          const yOffset = window.pageYOffset;
          const maxYOffset = document.body.clientHeight - window.innerHeight;

          setViewportScroll((prevState) => ({
            scrollY: yOffset,
            scrollYProgress: yOffset / maxYOffset,
            scrollDir: prevState.scrollY > yOffset ? 'up' : 'down',
          }));
        }, 75);

      window.addEventListener('scroll', onScroll, {
        passive: true,
      });

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, [active]);

  return viewportScroll;
};

export default useViewportScroll;
