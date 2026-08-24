import styled from 'styled-components';

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  padding: 40px;
  text-align: center;
`;

export const Title = styled.h2`
  color: #d4af37;
  font-size: 2rem;
  margin-bottom: 16px;
`;

export const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  max-width: 400px;
  line-height: 1.5;
`;

export const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background-color: #fcedb3;
  color: #d4af37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  
  svg {
    width: 40px;
    height: 40px;
  }
`;
