import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid #f0f0f0;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  text-transform: uppercase;
  line-height: 1.2;
  font-family: 'Playfair Display', serif;
  color: #1a1a1a;
`;

export const MobileMenuButton = styled.button<{ $isOpen?: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $isOpen }) => ($isOpen ? '#ffffff' : '#333')};
  padding: 0.5rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Overlay = styled.div<{ $isOpen?: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
`;

export const MenuWrapper = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    background: #08142c;
    flex-direction: column;
    justify-content: flex-start;
    padding: 100px 2rem 2rem;
    gap: 2.5rem;
    z-index: 1000;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
    box-shadow: -10px 0 30px rgba(0,0,0,0.5);
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    position: static;
    transform: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;
  }
`;

export const NavItem = styled.li`
  font-size: 0.82rem;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  transition: color 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -6px;
    left: 50%;
    background: #0e2a52;
    transition: width 0.3s ease, left 0.3s ease;
    border-radius: 2px;
  }

  &:hover {
    color: #0e2a52;
    &::after {
      width: 100%;
      left: 0;
    }
  }

  @media (max-width: 768px) {
    color: #ffffff;
    font-size: 1.05rem;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1rem;
    
    &::after {
      display: none;
    }

    &:hover {
      color: #D4AF37;
    }
  }
`;

export const CTAButton = styled.button`
  background: #0e2a52;
  color: #ffffff;
  border: none;
  padding: 0.55rem 1.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(14, 42, 82, 0.25);

  &:hover {
    background: #0a1f3d;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(14, 42, 82, 0.4);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0 1.5rem;
    
    button {
      width: 100%;
    }
  }
`;

export const LoginButton = styled(CTAButton)`
  background: transparent;
  color: #333;
  border: 1.5px solid #d0d0d0;
  box-shadow: none;

  &:hover {
    background: #f5f5f5;
    color: #111;
    border-color: #bbb;
    box-shadow: none;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    border-color: rgba(255, 255, 255, 0.4);
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
  }
`;
