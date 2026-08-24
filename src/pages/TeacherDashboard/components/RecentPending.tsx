import React from 'react';
import styled from 'styled-components';
import { AlertTriangle } from 'lucide-react';

const PendingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const PendingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f1f4fb;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  font-size: 0.85rem;
  color: #3165e3;
  font-weight: 500;
  border: 1px solid #d4e0fc;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e6ecfa;
    border-color: #b1c7f7;
  }
`;

const DotItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #3165e3;
  }
`;

const RecentPending = () => {
  const pendingTasks = [
    '4 matrículas aguardando confirmação',
    '3 alunos sem turma',
    '14 atividades não corrigidas',
    '2 faltas com atestado',
  ];

  return (
    <PendingList>
      {pendingTasks.map((task, idx) => (
        <PendingItem key={idx}>
          <DotItem>{task}</DotItem>
          {idx < 2 && <AlertTriangle size={16} color="#3165e3" strokeWidth={2} />}
        </PendingItem>
      ))}
    </PendingList>
  );
};

export default RecentPending;
