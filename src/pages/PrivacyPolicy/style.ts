import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Rubik", sans-serif;
  background-color: #fafafa;
`;

export const HeaderBanner = styled.header`
  width: 100vw;
  padding: 12rem 10% 6rem;
  background: linear-gradient(135deg, #0b192c 0%, #1A365D 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  box-sizing: border-box;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
  }

  @media (max-width: 768px) {
    padding: 9rem 5% 4rem;
    h1 {
      font-size: 2.2rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const ContentWrapper = styled.main`
  max-width: 900px;
  width: 100%;
  margin: -3rem auto 4rem;
  background: #fff;
  border-radius: 20px;
  padding: 4rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: -2rem 5% 3rem;
    padding: 2rem 1.5rem;
    width: 90%;
    border-radius: 16px;
  }
`;

export const LastUpdated = styled.p`
  font-size: 0.9rem;
  color: #888;
  font-style: italic;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
`;

export const Section = styled.section`
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1A365D;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin: 1.5rem 0 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #444;
    line-height: 1.8;
    margin-bottom: 0.8rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0.8rem 0;
  }

  li {
    font-size: 1rem;
    color: #444;
    line-height: 1.8;
    padding-left: 1.5rem;
    position: relative;

    &::before {
      content: "•";
      color: #D4AF37;
      font-weight: 700;
      position: absolute;
      left: 0;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`;

export const ContactBox = styled.div`
  background: linear-gradient(135deg, #f8f9fc 0%, #eef2f7 100%);
  border-left: 4px solid #1A365D;
  border-radius: 8px;
  padding: 1.5rem 2rem;
  margin-top: 1rem;

  p {
    margin-bottom: 0.4rem;
    font-size: 0.95rem;
  }

  a {
    color: #1A365D;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BackButton = styled.button`
  background: linear-gradient(135deg, #1A365D 0%, #08142c 100%);
  color: #fff;
  border: none;
  padding: 0.9rem 2.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(8, 20, 44, 0.35);
  }
`;
