import { MonitorPlay, Globe, Zap, Sparkles } from 'lucide-react';
import {
  SectionContainer,
  Header,
  Title,
  Subtitle,
  CardsGrid,
  Card,
  IconWrapper,
  CardTitle,
  CardText
} from './style';
import { Reveal } from '../Reveal';

const WhyChooseUsSection = () => {
  return (
    <SectionContainer>
      <Reveal direction="up">
        <Header>
          <Title>POR QUE ESCOLHER A AULAS E TRADUÇÕES?</Title>
          <Subtitle>Diferenciais que fazem da nossa plataforma referência em ensino.</Subtitle>
        </Header>
      </Reveal>

      <CardsGrid>
        <Reveal direction="up" delay={100}>
          <Card>
            <IconWrapper>
              <MonitorPlay size={28} />
            </IconWrapper>
            <CardTitle>Interatividade</CardTitle>
            <CardText>
              Plataforma exclusiva com exercícios práticos, apps e muito mais para seu desenvolvimento!
            </CardText>
          </Card>
        </Reveal>

        <Reveal direction="up" delay={200}>
          <Card>
            <IconWrapper>
              <Globe size={28} />
            </IconWrapper>
            <CardTitle>Aulas on-line</CardTitle>
            <CardText>
              Modalidade 100% online com aulas totalmente ao vivo de onde você estiver.
            </CardText>
          </Card>
        </Reveal>

        <Reveal direction="up" delay={300}>
          <Card>
            <IconWrapper>
              <Zap size={28} />
            </IconWrapper>
            <CardTitle>Rápido</CardTitle>
            <CardText>
              Metodologia focada na prática para acelerar a sua fluência no idioma em tempo recorde.
            </CardText>
          </Card>
        </Reveal>

        <Reveal direction="up" delay={400}>
          <Card>
            <IconWrapper>
              <Sparkles size={28} />
            </IconWrapper>
            <CardTitle>Imersão</CardTitle>
            <CardText>
              Unimos aprendizado e vivência real, preparando você para viagens, intercâmbios e mercado de trabalho.
            </CardText>
          </Card>
        </Reveal>
      </CardsGrid>
    </SectionContainer>
  );
};

export default WhyChooseUsSection;
