import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

const AgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 24px;
  width: 2px;
  background-color: #e0e0e0;
  z-index: 1;
`;

const AgendaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
`;

const TimeBubble = styled.div`
  background-color: #3165e3;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(49, 101, 227, 0.2);
`;

const ContentCard = styled.div`
  flex: 1;
  background-color: #f1f4fb;
  border: 1px solid #c9d8fa;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e6ecfa;
    border-color: #b1c7f7;
  }
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    color: #0b1f5c;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: #4a5a80;
  }
`;

const DailyAgenda = () => {
  const classes = [
    { time: '14:00', name: 'Turma Beginner 1', students: '12 alunos' },
    { time: '16:00', name: 'Aula VIP - Camila', students: '1 aluna' },
    { time: '19:00', name: 'Turma Beginner 2', students: '9 alunos' },
  ];

  return (
    <AgendaContainer>
      <TimelineLine />
      {classes.map((cls, idx) => (
        <AgendaItem key={idx}>
          <TimeBubble>{cls.time}</TimeBubble>
          <ContentCard>
            <ClassInfo>
              <h4>{cls.name}</h4>
              <p>{cls.students}</p>
            </ClassInfo>
            <ChevronDown size={20} color="#3165e3" />
          </ContentCard>
        </AgendaItem>
      ))}
    </AgendaContainer>
  );
};

export default DailyAgenda;
