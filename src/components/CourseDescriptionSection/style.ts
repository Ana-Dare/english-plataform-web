import styled from 'styled-components';

export const SectionContainer = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 6rem 5%;
  background-color: #fafafa;
  box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  align-items: stretch;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const TextCard = styled.div`
  flex: 1;
  background-color: #fcf8f5; /* Light beige/cream color from screenshot */
  padding: 4rem 3rem;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);

  h2 {
    font-size: 1.8rem;
    font-style: italic;
    font-weight: 800;
    color: #0b192c;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const ImageCard = styled.div`
  flex: 0.8;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    min-height: 400px;
  }
`;
