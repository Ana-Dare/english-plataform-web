import React from 'react';
import { Container, Title, ActivityList, ActivityItem, DateCircle, ActivityContent, ActivityTitle, ActivityDate, ActivityDescription } from './style';

const activities = [
  {
    day: 9,
    title: 'Análise e produção textual',
    date: '09/06/2026 23:59',
    description: '"Effective communication in the workplace"',
    colorType: 'yellow' as const
  },
  {
    day: 17,
    title: 'Questões dissertativas',
    date: '17/06/2026 23:59',
    description: '"Change the tones of the respective phrases"',
    colorType: 'yellow' as const
  },
  {
    day: 24,
    title: 'Prova 1° bimestre',
    date: '24/06/2026 23:59',
    description: '"Read the questions and answer attentively"',
    colorType: 'blue' as const
  }
];

const PendingActivitiesCard: React.FC = () => {
  return (
    <Container>
      <Title>Atividades Pendentes</Title>
      
      <ActivityList>
        {activities.map((activity, index) => (
          <ActivityItem key={index} $colorType={activity.colorType}>
            <DateCircle $colorType={activity.colorType}>
              {activity.day}
            </DateCircle>
            <ActivityContent>
              <ActivityTitle>{activity.title}</ActivityTitle>
              <ActivityDate>{activity.date}</ActivityDate>
              <ActivityDescription>{activity.description}</ActivityDescription>
            </ActivityContent>
          </ActivityItem>
        ))}
      </ActivityList>
    </Container>
  );
};

export default PendingActivitiesCard;
