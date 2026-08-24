import { useState } from "react";
import {
  JourneyWrapper,
  JourneyContainer,
  JourneyTextPanel,
  Subtitle,
  Title,
  Description,
  TabsContainer,
  TabItem,
  JourneyImagePanel,
  ImageCard,
  ImageCardContent
} from "./style";

import journeyImage1 from "../../assets/images/home/journey1.png";
import journeyImage2 from "../../assets/images/home/journey2.png";

const tabsData = [
  {
    id: 1,
    title: "Fluência de Verdade",
    text: "Aprenda a se comunicar com confiança em qualquer situação, do casual ao corporativo, com foco no uso real da língua."
  },
  {
    id: 2,
    title: "Traduções Precisas",
    text: "Serviços de tradução profissional que respeitam o contexto e a cultura, garantindo que sua mensagem chegue intacta."
  },
  {
    id: 3,
    title: "Acompanhamento Personalizado",
    text: "Cada aluno tem um ritmo. Oferecemos um suporte próximo e dedicado para garantir seu progresso contínuo e consistente."
  },
  {
    id: 4,
    title: "Material Dinâmico",
    text: "Chega de livros engessados. Utilizamos conteúdos atuais, artigos, vídeos e situações cotidianas reais nos EUA."
  }
];

const JourneySection = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <JourneyWrapper>
      <JourneyContainer>
        <JourneyTextPanel>
          <Subtitle>Dê o primeiro passo na sua jornada</Subtitle>
          <Title>Há um mundo de possibilidades ao seu alcance</Title>
          <Description>
            Entrar numa escola de idiomas é como abrir as portas para um universo
            repleto de possibilidades e aprendizados. Dê início a sua jornada
            emocionante conosco!
          </Description>

          <TabsContainer>
            {tabsData.map((tab) => (
              <TabItem 
                key={tab.id} 
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <h4>{tab.title}</h4>
                <p>{tab.text}</p>
              </TabItem>
            ))}
          </TabsContainer>
        </JourneyTextPanel>

        <JourneyImagePanel>
          <ImageCard bgImage={journeyImage1}>
            <ImageCardContent>
              <h3>Explore</h3>
              <p>Conecte-se com o mundo.</p>
            </ImageCardContent>
          </ImageCard>
          <ImageCard bgImage={journeyImage2}>
            <ImageCardContent>
              <h3>Conquiste</h3>
              <p>Alcance seus objetivos globais.</p>
            </ImageCardContent>
          </ImageCard>
        </JourneyImagePanel>
      </JourneyContainer>
    </JourneyWrapper>
  );
};

export default JourneySection;
