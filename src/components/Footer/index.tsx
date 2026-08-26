import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail } from "lucide-react";
import {
  FooterContainer,
  FooterContent,
  FooterLogo,
  FooterLinks,
  FooterLinkItem,
  FooterBottom,
  SocialIcons,
} from "./style";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          Aulas e<br />
          <span>Traduções</span>
        </FooterLogo>

        <FooterLinks>
          <FooterLinkItem>
            <Link to="/">Home</Link>
          </FooterLinkItem>
          <FooterLinkItem>
            <Link to="/cursos">Cursos</Link>
          </FooterLinkItem>
          <FooterLinkItem>
            <a href="#metodologia">Metodologia</a>
          </FooterLinkItem>
          <FooterLinkItem>
            <Link to="/login">Login</Link>
          </FooterLinkItem>
        </FooterLinks>

        <SocialIcons>
          <a href="#" aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <a href="#" aria-label="Telefone">
            <Phone size={20} />
          </a>
          <a href="#" aria-label="Email">
            <Mail size={20} />
          </a>
        </SocialIcons>
      </FooterContent>

      <FooterBottom>
        <span>
          &copy; {new Date().getFullYear()} Aulas e Traduções. Todos os direitos
          reservados.
        </span>
        <span>Desenvolvido com excelência.</span>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
