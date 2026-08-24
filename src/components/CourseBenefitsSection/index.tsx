import { CalendarDays, Smartphone, FileCheck } from 'lucide-react';
import { Reveal } from '../Reveal';
import { 
  SectionContainer, 
  ContentWrapper, 
  TextColumn, 
  Title, 
  Subtitle, 
  BenefitsList, 
  BenefitItem, 
  IconWrapper, 
  BenefitContent, 
  ImageColumn 
} from './style';
import studentImage2 from '../../assets/images/home/alunos.jpg';

const CourseBenefitsSection = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <TextColumn>
          <Reveal direction="up" delay={100}>
            <Title>
              BENEFÍCIOS DO CURSO DE INGLÊS ONLINE <span>AULAS E TRADUÇÕES</span>
            </Title>
            <Subtitle>
              Confira todos os recursos que fazem da Aulas e Traduções o melhor curso de inglês online para quem quer aprender de forma completa e acelerada:
            </Subtitle>
          </Reveal>

          <BenefitsList>
            <Reveal direction="left" delay={300}>
              <BenefitItem>
                <IconWrapper>
                  <CalendarDays />
                </IconWrapper>
                <BenefitContent>
                  <h4>FLEXIBILIDADE PARA APRENDER INGLÊS ONLINE DO SEU JEITO</h4>
                  <p>
                    Aulas ao vivo em turma ou aula de inglês online particular, você escolhe o que melhor se encaixa na sua rotina. Estude de casa, do trabalho, em viagens ou de qualquer lugar. Início em qualquer época do ano e horários que cabem na sua agenda.
                  </p>
                </BenefitContent>
              </BenefitItem>
            </Reveal>

            <Reveal direction="left" delay={400}>
              <BenefitItem>
                <IconWrapper>
                  <Smartphone />
                </IconWrapper>
                <BenefitContent>
                  <h4>APP EXCLUSIVO: PRATIQUE INGLÊS ONLINE QUANDO E ONDE QUISER</h4>
                  <p>
                    Aplicativo próprio da plataforma com exercícios interativos, avaliação de pronúncia e correção imediata. Acelera o aprendizado e ajuda a fixar o conteúdo visto nas aulas ao vivo.
                  </p>
                </BenefitContent>
              </BenefitItem>
            </Reveal>

            <Reveal direction="left" delay={500}>
              <BenefitItem>
                <IconWrapper>
                  <FileCheck />
                </IconWrapper>
                <BenefitContent>
                  <h4>AVALIAÇÕES E CERTIFICAÇÕES RECONHECIDAS</h4>
                  <p>
                    Acompanhe seu progresso com certificações e metodologias reconhecidas internacionalmente. A gratuidade de avaliações globais inicia a partir de níveis avançados para atestar sua fluência real.
                  </p>
                </BenefitContent>
              </BenefitItem>
            </Reveal>
          </BenefitsList>
        </TextColumn>

        <Reveal direction="right" delay={300}>
          <ImageColumn>
            <div className="image-wrapper">
              <img src={studentImage2} alt="Estudante aproveitando os benefícios do curso" />
            </div>
          </ImageColumn>
        </Reveal>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default CourseBenefitsSection;
