import { MessageCircle } from 'lucide-react';
import {
  SectionContainer,
  ImageWrapper,
  ContentWrapper,
  Title,
  Subtitle,
  WhatsAppButton,
  Highlight
} from './style';
import customImage from '../../assets/images/home/woman-thinking.png';

const DoubtSection = () => {
  return (
    <SectionContainer>
      <ImageWrapper>
        <img 
          src={customImage} 
          alt="Aluna com dúvidas" 
        />
        <div className="overlay-curve"></div>
      </ImageWrapper>
      <ContentWrapper>
        <div className="text-content">
          <Title>
            AINDA TEM <br/>
            <Highlight>DÚVIDAS?</Highlight>
          </Title>
          <Subtitle>
            Fale agora com um consultor e entenda como aproveitar a oferta antes que acabe.
          </Subtitle>
          <WhatsAppButton href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={24} />
            TIRAR DÚVIDAS NO WHATSAPP
          </WhatsAppButton>
        </div>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default DoubtSection;
