import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const GalleryWrapper = styled.section`
  width: 100vw;
  background-color: #0a0a0a;
  padding: 6rem 8%;
  box-sizing: border-box;
`;

export const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeInUp} 0.6s ease both;

  span {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #D4AF37;
  }

  h2 {
    font-size: 3.5rem;
    font-weight: 800;
    color: #fff;
    margin: 0.8rem 0 1rem;
    line-height: 1.1;

    em {
      font-style: normal;
      background: linear-gradient(90deg, #D4AF37 0%, #f0cf70 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: #888;
    max-width: 550px;
    margin: 0 auto;
    line-height: 1.6;
    font-weight: 300;
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1.2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const GalleryCard = styled.div<{ span?: number }>`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  grid-column: ${({ span }) => span ? `span ${span}` : "span 1"};
  aspect-ratio: ${({ span }) => span === 2 ? "16/7" : "4/5"};

  @media (max-width: 900px) {
    grid-column: span 1;
    aspect-ratio: 4/3;
  }

  /* Overlay escuro */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%);
    z-index: 1;
    opacity: 0.7;
    transition: opacity 0.4s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.08);
  }
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

export const CardOverlayContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.8rem;
  z-index: 2;
  transform: translateY(10px);
  transition: transform 0.4s ease;

  ${GalleryCard}:hover & {
    transform: translateY(0);
  }

  h4 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
  }

  p {
    margin: 0.4rem 0 0;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.75);
    font-weight: 300;
  }
`;
