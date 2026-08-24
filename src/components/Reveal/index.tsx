import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const getTransform = (direction: 'up' | 'down' | 'left' | 'right') => {
  switch (direction) {
    case 'up': return 'translateY(50px)';
    case 'down': return 'translateY(-50px)';
    case 'left': return 'translateX(50px)';
    case 'right': return 'translateX(-50px)';
    default: return 'translateY(50px)';
  }
};

const RevealWrapper = styled.div<{ $isVisible: boolean; $delay: number; $direction: 'up' | 'down' | 'left' | 'right' }>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible, $direction }) => ($isVisible ? 'translate(0, 0)' : getTransform($direction))};
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  transition-delay: ${({ $delay }) => $delay}ms;
  width: 100%;
  flex: 1;
`;

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: observer.unobserve(entry.target); to animate only once
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <RevealWrapper ref={ref} $isVisible={isVisible} $delay={delay} $direction={direction}>
      {children}
    </RevealWrapper>
  );
};
