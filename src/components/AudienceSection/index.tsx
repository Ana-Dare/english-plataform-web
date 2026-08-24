import { Flag, Zap, Rocket, HelpCircle } from "lucide-react";
import {
  AudienceContainer,
  AudienceCard,
  TopLabel,
  Title,
  TimelineWrapper,
  StepColumn,
  IconCircle,
  StepTitle,
  StepText,
  FooterLink
} from "./style";

const AudienceSection = () => {
  return (
    <AudienceContainer>
      <AudienceCard>
        <TopLabel>Aulas e Traduções</TopLabel>
        <Title>Esse curso de inglês foi pensado para quem:</Title>

        <TimelineWrapper>
          <StepColumn>
            <IconCircle>
              <Flag size={35} strokeWidth={1.5} />
            </IconCircle>
            <StepTitle>Iniciante</StepTitle>
            <StepText>Nunca estudou antes, mas deseja dar o primeiro passo</StepText>
          </StepColumn>

          <StepColumn>
            <IconCircle>
              <Zap size={35} strokeWidth={1.5} />
            </IconCircle>
            <StepTitle>Intermediário</StepTitle>
            <StepText>Já estudou e sabe o básico, mas sente que ainda precisa evoluir.</StepText>
          </StepColumn>

          <StepColumn>
            <IconCircle>
              <Rocket size={35} strokeWidth={1.5} />
            </IconCircle>
            <StepTitle>Avançado</StepTitle>
            <StepText>Até se comunica bem, mas quer melhorar e atingir a fluência.</StepText>
          </StepColumn>
        </TimelineWrapper>

        <FooterLink>
          <HelpCircle size={18} />
          Como saber meu nível no inglês?
        </FooterLink>
      </AudienceCard>
    </AudienceContainer>
  );
};

export default AudienceSection;
