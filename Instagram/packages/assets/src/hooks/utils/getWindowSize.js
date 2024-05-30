import {useEffect, useState} from 'react';

export default function getWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

export function getElementSize({element = null, parent = null, className = null}) {
  const [size, setSize] = useState({width: 0});

  const detectElement = () => {
    if (element) {
      return element.closest(parent);
    }
    if (className) {
      const elements = document.getElementsByClassName(className);
      return elements?.length ? elements[0] : null;
    }

    return null;
  };

  useEffect(() => {
    handleResize();
  }, [className, element]);

  const handleResize = () => {
    const element = detectElement();
    setSize({
      width: element?.offsetWidth || 0
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
