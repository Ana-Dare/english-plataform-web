import { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalImageArea,
  ModalFormArea,
  ModalFormTitle,
  FormInput,
  FormSelect,
  ModalSubmitButton
} from "./style";

const PromoModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show modal if it hasn't been closed in this session
    const hasSeenModal = sessionStorage.getItem("promoModalSeen");
    if (!hasSeenModal) {
      // Small delay to let the page load before popping up
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("promoModalSeen", "true");
    setIsVisible(false);
  };

  // Previne fechar o modal se clicar dentro dele
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={handleModalClick}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        
        <ModalImageArea>
          <h2>
            <span>Comece hoje</span>
            Faça uma aula teste grátis!
          </h2>
        </ModalImageArea>

        <ModalFormArea>
          <ModalFormTitle>Cadastre-se <span>Agora</span></ModalFormTitle>
          
          <form onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
            <FormInput type="text" placeholder="Seu Nome Completo" required />
            <FormInput type="email" placeholder="Seu E-mail" required />
            <FormInput type="tel" placeholder="Seu Telefone / WhatsApp" required />
            
            <FormSelect required>
              <option value="">Qual o seu interesse?</option>
              <option value="aulas">Aulas de Inglês</option>
              <option value="traducoes">Serviços de Tradução</option>
              <option value="teste">Agendar Aula Teste Grátis</option>
            </FormSelect>

            <ModalSubmitButton type="submit">Quero Minha Aula Teste</ModalSubmitButton>
          </form>
        </ModalFormArea>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PromoModal;
