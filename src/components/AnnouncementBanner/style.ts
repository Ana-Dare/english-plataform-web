import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const BannerWrapper = styled.div`
  width: 100%;
  background: #C49A6C;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 0.55rem 5%;
  position: relative;
  z-index: 1100;
  animation: ${slideIn} 0.4s ease forwards;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 0.6rem;
    padding: 0.5rem 5%;
    text-align: center;
  }
`;

export const BannerText = styled.p`
  font-size: 0.82rem;
  font-weight: 400;
  color: #1e3a8a;
  font-family: 'Rubik', sans-serif;
  margin: 0;
  letter-spacing: 0.3px;

  span {
    font-style: italic;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const BannerButton = styled.button`
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  padding: 0.3rem 1.2rem;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 700;
  font-family: 'Rubik', sans-serif;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
    transform: scale(1.03);
  }
`;
