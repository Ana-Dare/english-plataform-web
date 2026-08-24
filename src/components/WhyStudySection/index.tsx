import { Monitor, MessageSquare, GraduationCap, BookOpen, Users, Star } from 'lucide-react';
import { Reveal } from '../Reveal';
import { 
  SectionContainer, 
  Title, 
  Grid, 
  Card, 
  IconContainer, 
  TextContainer 
} from './style';

const features = [
  {
    icon: <Monitor />,
    text: "AULAS 100% ONLINE E AO VIVO (NADA GRAVADO!)"
  },
  {
    icon: <MessageSquare />,
    text: "CONVERSAÇÃO DESDE A PRIMEIRA AULA"
  },
  {
    icon: <GraduationCap />,
    text: "PROFESSOR-MENTOR ACOMPANHANDO SEU PROGRESSO"
  },
  {
    icon: <BookOpen />,
    text: "MATERIAL DIDÁTICO INCLUSO NA ASSINATURA"
  },
  {
    icon: <Users />,
    text: "CONVERSATION CLUB PARA PRÁTICA EM GRUPO"
  },
  {
    icon: <Star />,
    text: "CERTIFICAÇÃO RECONHECIDA E AVALIAÇÃO CONTÍNUA"
  }
];

const WhyStudySection = () => {
  return (
    <SectionContainer>
      <Reveal direction="up" delay={100}>
        <Title>
          POR QUE <span>ESTUDAR</span> NA AULAS E TRADUÇÕES?
        </Title>
      </Reveal>
      
      <Grid>
        {features.map((feature, index) => (
          <Reveal key={index} direction="up" delay={200 + (index * 100)}>
            <Card>
              <IconContainer>
                {feature.icon}
              </IconContainer>
              <TextContainer>
                <h4>{feature.text}</h4>
              </TextContainer>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default WhyStudySection;
