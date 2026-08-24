import { useEffect, useRef, useState } from 'react';
import { FreedomContainer, TextContent, Title, Description, ActionButton, ImagesGrid, GridImage } from './style';
import imgMountain from '../../assets/images/home/travel_mountain_1781109378838.png';
import imgNature from '../../assets/images/home/travel_nature_1781109387637.png';
import imgCity from '../../assets/images/home/travel_city_1781109397406.png';
import imgRuins from '../../assets/images/home/travel_ruins_1781109407962.png';

const FreedomSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <FreedomContainer ref={sectionRef}>
      <TextContent isVisible={isVisible}>
        <Title>
          Conquiste sua<br />
          liberdade<br />
          com a <span>Aulas e<br/>Traduções</span>
        </Title>
        <Description>
          Bem-vindo à Aulas e Traduções, a melhor plataforma de ensino de idiomas 
          focada no seu desenvolvimento global! Aqui, aprender vai além do conteúdo 
          acadêmico – nossa metodologia conecta você ao mundo real e cria novas oportunidades 
          profissionais e pessoais.
        </Description>
        <ActionButton>Agendar uma aula grátis</ActionButton>
      </TextContent>
      
      <ImagesGrid>
        {/* Top-left */}
        <GridImage src={imgMountain} alt="Liberdade" translateUp isVisible={isVisible} delay={0.2} />
        {/* Top-right */}
        <GridImage src={imgNature} alt="Viagem" style={{ aspectRatio: '4/5' }} isVisible={isVisible} delay={0.5} />
        {/* Bottom-left */}
        <GridImage src={imgCity} alt="Mundo" style={{ aspectRatio: '16/10' }} isVisible={isVisible} delay={0.8} />
        {/* Bottom-right */}
        <GridImage src={imgRuins} alt="Explorar" translateDown style={{ aspectRatio: '1/1' }} isVisible={isVisible} delay={1.1} />
      </ImagesGrid>
    </FreedomContainer>
  );
};

export default FreedomSection;
