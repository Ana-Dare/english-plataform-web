import styled from "styled-components";

export const SectionContainer = styled.section`
  width: 100vw;
  background-color: #010B33;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 520px;
  overflow: hidden;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .overlay-curve {
    position: absolute;
    right: -1px; /* Evitar gap */
    top: 0;
    width: 150px;
    height: 100%;
    background-color: #010B33;
    clip-path: ellipse(100% 100% at 100% 50%);
  }

  @media (max-width: 900px) {
    position: relative;
    width: 100%;
    height: 400px;
    
    .overlay-curve {
      right: auto;
      bottom: -1px;
      top: auto;
      left: 0;
      width: 100%;
      height: 60px;
      clip-path: ellipse(100% 100% at 50% 100%);
    }
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 4rem 10%;
  z-index: 1;
  box-sizing: border-box;
  margin-left: 50%; /* Ocupar apenas a metade direita em telas grandes */

  .text-content {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 900px) {
    margin-left: 0;
    padding: 3rem 5%;
    justify-content: center;
    
    .text-content {
      align-items: center;
      text-align: center;
    }
  }
`;

export const Title = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: #ffffff;
  font-style: italic;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Highlight = styled.span`
  background-color: #E3000F;
  padding: 0 0.5rem;
  display: inline-block;
  margin-top: 0.2rem;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.5;
  margin-bottom: 2rem;
  max-width: 400px;
`;

export const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #25D366;
  color: #ffffff;
  font-weight: 800;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(37, 211, 102, 0.2);

  &:hover {
    background-color: #1ebe57;
    transform: translateY(-3px);
    box-shadow: 0 15px 25px rgba(37, 211, 102, 0.4);
  }
`;
