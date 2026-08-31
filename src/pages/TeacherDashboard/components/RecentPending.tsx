import styled from "styled-components";
import { AlertTriangle } from "lucide-react";

const PendingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const PendingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  font-size: 0.85rem;
  color: #2b3a4e;
  font-weight: 500;
  border: 1px solid #e8e0db;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9f6f4;
    border-color: #d4957f;
  }
`;

const DotItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #d4957f;
  }
`;

const RecentPending = () => {
  const pendingTasks = [
    "4 matrículas aguardando confirmação",
    "3 alunos sem turma",
    "14 atividades não corrigidas",
    "2 faltas com atestado",
  ];

  return (
    <PendingList>
      {pendingTasks.map((task, idx) => (
        <PendingItem key={idx}>
          <DotItem>{task}</DotItem>
          {idx < 2 && (
            <AlertTriangle size={16} color="#d4957f" strokeWidth={2} />
          )}
        </PendingItem>
      ))}
    </PendingList>
  );
};

export default RecentPending;
