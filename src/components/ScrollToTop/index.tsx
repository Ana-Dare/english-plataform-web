import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { ScrollButton } from './style';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton 
      onClick={scrollToTop} 
      $isVisible={isVisible}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={24} strokeWidth={2.5} />
    </ScrollButton>
  );
};

export default ScrollToTop;
