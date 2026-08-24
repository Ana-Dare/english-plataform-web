import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100vw;
  background-color: #0b0b1a; /* Escuro sofisticado da identidade visual */
  color: #fff;
  padding: 3rem 10% 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif;
  border-top: 1px solid rgba(212, 175, 55, 0.2);

  @media (max-width: 768px) {
    padding: 3rem 5% 2rem;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: left;
    align-items: flex-start;
  }
`;

export const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2;
  letter-spacing: 1px;

  span {
    color: #D4AF37; /* Dourado */
  }
`;

export const FooterLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FooterLinkItem = styled.li`
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
      color: #D4AF37;
    }
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  max-width: 1200px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: left;
    align-items: flex-start;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #D4AF37;
      transform: translateY(-2px);
    }
  }
`;
