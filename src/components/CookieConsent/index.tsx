import { useState, useEffect } from "react";
import { CookieWrapper, CookieTextContainer, CookieButtons, Button } from "./style";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <CookieWrapper>
      <CookieTextContainer>
        <h4>Nós valorizamos sua privacidade</h4>
        <p>
          Utilizamos cookies para aprimorar sua experiência de navegação, exibir anúncios ou conteúdos personalizados 
          e analisar nosso tráfego. Ao clicar em "Aceitar todos", você concorda com o uso de cookies. 
          Consulte nossa <a href="#">Política de Privacidade</a> para mais informações.
        </p>
      </CookieTextContainer>
      <CookieButtons>
        <Button onClick={handleReject}>Rejeitar</Button>
        <Button primary onClick={handleAccept}>Aceitar todos</Button>
      </CookieButtons>
    </CookieWrapper>
  );
};

export default CookieConsent;
