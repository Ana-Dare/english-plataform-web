import { 
  CareerContainer, 
  ContentWrapper, 
  TextCard, 
  Badge, 
  Title, 
  Description, 
  CTAButton, 
  Disclaimer, 
  ImageWrapper 
} from './style';
import professionalMan from '../../assets/images/home/professional_man.png';
import { Reveal } from '../Reveal';

const CareerSection = () => {
  return (
    <CareerContainer>
      <ContentWrapper>
        <Reveal direction="right" delay={200}>
          <TextCard>
            <Badge>Carreira sem Fronteiras</Badge>
            <Title>Domine o idioma dos negócios e <span>dobre suas chances</span></Title>
            <Description>
              Você sabia que profissionais fluentes em inglês ganham até <strong>72% a mais</strong>? 
              Não perca grandes oportunidades. Com nosso método prático, você ganha 
              confiança para liderar reuniões, fechar contratos e expandir sua carreira internacionalmente.
            </Description>
            <CTAButton>Quero alavancar minha carreira</CTAButton>
            <Disclaimer>*Segundo a 58ª Pesquisa Salarial da Catho</Disclaimer>
          </TextCard>
        </Reveal>

        <Reveal direction="left" delay={400}>
          <ImageWrapper>
            <img src={professionalMan} alt="Profissional em ambiente corporativo" />
          </ImageWrapper>
        </Reveal>
      </ContentWrapper>
    </CareerContainer>
  );
};

export default CareerSection;
