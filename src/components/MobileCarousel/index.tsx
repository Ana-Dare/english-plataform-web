import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileCarouselProps {
  children: React.ReactNode;
  gap?: string;
  mobileGap?: string;
  fadeColor?: string;
  style?: React.CSSProperties;
  className?: string;
  ariaLabelLeft?: string;
  ariaLabelRight?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Viewport = styled.div<{
  $canScrollLeft?: boolean;
  $canScrollRight?: boolean;
  $fadeColor: string;
}>`
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 22px;
      pointer-events: none;
      z-index: 2;
      transition: opacity 0.2s ease;
    }

    &::before {
      left: 0;
      background: linear-gradient(
        to right,
        ${(p) => p.$fadeColor} 15%,
        rgba(248, 250, 252, 0)
      );
      opacity: ${(p) => (p.$canScrollLeft ? 1 : 0)};
    }

    &::after {
      right: 0;
      background: linear-gradient(
        to left,
        ${(p) => p.$fadeColor} 15%,
        rgba(248, 250, 252, 0)
      );
      opacity: ${(p) => (p.$canScrollRight ? 1 : 0)};
    }
  }
`;

const ArrowBtn = styled.button<{ $active?: boolean }>`
  display: none;

  @media (max-width: 767px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    border: 1.5px solid ${(p) => (p.$active ? "#cbd5e1" : "#e2e8f0")};
    background: #ffffff;
    color: ${(p) => (p.$active ? "#1f2b45" : "#94a3b8")};
    cursor: ${(p) => (p.$active ? "pointer" : "default")};
    opacity: ${(p) => (p.$active ? 1 : 0.45)};
    box-shadow: ${(p) =>
      p.$active ? "0 2px 6px rgba(15, 23, 42, 0.08)" : "none"};
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;

    &:active {
      transform: ${(p) => (p.$active ? "scale(0.94)" : "none")};
    }
  }
`;

const Track = styled.div<{ $gap: string; $mobileGap: string }>`
  display: flex;
  align-items: center;
  gap: ${(p) => p.$gap};
  flex-wrap: nowrap;
  min-width: 0;
  width: 100%;

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: ${(p) => p.$mobileGap};
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    scroll-behavior: smooth;
    padding: 2px 2px 4px;

    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      flex: 0 0 auto;
    }
  }
`;

const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  gap = "10px",
  mobileGap = "8px",
  fadeColor = "#f8fafc",
  style,
  className,
  ariaLabelLeft = "Deslizar para a esquerda",
  ariaLabelRight = "Deslizar para a direita",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScroll();
    const timer = setTimeout(updateScroll, 100);
    window.addEventListener("resize", updateScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll, children]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -160 : 160,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper style={style} className={className}>
      <ArrowBtn
        type="button"
        $active={canScrollLeft}
        onClick={() => scroll("left")}
        aria-label={ariaLabelLeft}
        title="Anterior"
      >
        <ChevronLeft size={16} strokeWidth={2.4} />
      </ArrowBtn>

      <Viewport
        $canScrollLeft={canScrollLeft}
        $canScrollRight={canScrollRight}
        $fadeColor={fadeColor}
      >
        <Track
          ref={trackRef}
          onScroll={updateScroll}
          $gap={gap}
          $mobileGap={mobileGap}
        >
          {children}
        </Track>
      </Viewport>

      <ArrowBtn
        type="button"
        $active={canScrollRight}
        onClick={() => scroll("right")}
        aria-label={ariaLabelRight}
        title="Próximo"
      >
        <ChevronRight size={16} strokeWidth={2.4} />
      </ArrowBtn>
    </Wrapper>
  );
};

export default MobileCarousel;
