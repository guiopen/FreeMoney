import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Limpa o event listener ao desmontar o componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {windowWidth, windowHeight};
}

export default useWindowSize;