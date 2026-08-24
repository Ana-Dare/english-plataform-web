import React from 'react';
import { CardContainer, TopSection, Title, BottomSection, InfoText } from './style';

const NextClassCard: React.FC = () => {
  return (
    <CardContainer>
      <TopSection>
        <Title>Próxima aula: <span>Hoje às 19:00</span></Title>
      </TopSection>
      <BottomSection>
        <InfoText>English Intermediate</InfoText>
        <InfoText><strong>Aula:</strong> Simple Past Conversation</InfoText>
        <InfoText>Turma B2</InfoText>
      </BottomSection>
    </CardContainer>
  );
};

export default NextClassCard;
