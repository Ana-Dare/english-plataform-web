import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavbarContainer, Logo, NavLinks, NavItem, CTAButton, ButtonGroup, LoginButton, MobileMenuButton, MenuWrapper, Overlay } from "./style";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContainer>
      <Logo onClick={() => navigate('/')}>
        Aulas e<br />
        Traduções
      </Logo>

      <MobileMenuButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </MobileMenuButton>
      
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <MenuWrapper $isOpen={isOpen}>
        <NavLinks>
          <NavItem>Sobre</NavItem>
          <NavItem><Link style={{color: 'inherit', textDecoration: 'none'}} to="/cursos">Cursos</Link></NavItem>
          <NavItem>Metodologia</NavItem>
        </NavLinks>
        
        <ButtonGroup>
          <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
          <CTAButton>Começar Agora</CTAButton>
        </ButtonGroup>
      </MenuWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
