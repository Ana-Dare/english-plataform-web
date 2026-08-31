import { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalImageArea,
  ModalFormArea,
  ModalFormTitle,
  FormInput,
  ModalSubmitButton
} from "./style";
import CustomDropdown from "../CustomDropdown";

const PromoModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [interesse, setInteresse] = useState("");

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
            
            <CustomDropdown
              value={interesse}
              onChange={setInteresse}
              options={[
                { value: '', label: 'Qual o seu interesse?' },
                { value: 'aulas', label: 'Aulas de Inglês' },
                { value: 'traducoes', label: 'Serviços de Tradução' },
                { value: 'teste', label: 'Agendar Aula Teste Grátis' },
              ]}
            />

            <ModalSubmitButton type="submit">Quero Minha Aula Teste</ModalSubmitButton>
          </form>
        </ModalFormArea>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PromoModal;
