import { Reveal } from '../Reveal';
import { 
  SectionContainer, 
  ContentWrapper, 
  TextCard, 
  ImageCard 
} from './style';
import studentImage from '../../assets/images/home/info1.png';

const CourseDescriptionSection = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <Reveal direction="right" delay={200}>
          <TextCard>
            <h2>CURSO DE INGLÊS ONLINE: AULAS E TRADUÇÕES</h2>
            
            <p>
              Você confiante no inglês! Aprenda inglês online de verdade, com aulas ao vivo, de onde estiver, e com a metodologia exclusiva Aulas e Traduções.
            </p>
            
            <p>
              O curso de inglês online foi criado para quem quer construir confiança real para falar o idioma, sem ficar apenas na teoria. Aqui você evolui no seu ritmo, pratica conversação desde as primeiras aulas e vê resultados concretos no seu dia a dia — no trabalho, em viagens ou na vida pessoal.
            </p>
            
            <p>
              Flexibilidade total: comece seu curso de inglês online em qualquer época do ano, independentemente do seu nível atual (do básico ao avançado). E o melhor: você conta com todo o suporte dos nossos mentores mais próximos enquanto estuda 100% online.
            </p>
            
            <p>
              Let's do this! Comece hoje e transforme sua fluência em inglês.
            </p>
          </TextCard>
        </Reveal>

        <Reveal direction="left" delay={400}>
          <ImageCard>
            <img src={studentImage} alt="Alunos celebrando aprendizado" />
          </ImageCard>
        </Reveal>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default CourseDescriptionSection;
