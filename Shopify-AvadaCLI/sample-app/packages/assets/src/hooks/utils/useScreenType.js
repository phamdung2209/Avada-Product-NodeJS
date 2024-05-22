import useScreenTypeHook from 'react-screentype-hook';

/**
 * @return {{isMobile: boolean, isTablet: boolean, isDesktop: boolean, isLargeDesktop: boolean}}
 */
export default function useScreenType() {
  return useScreenTypeHook({
    mobile: 400,
    tablet: 800,
    desktop: 1080,
    largeDesktop: 1600
  });
}
