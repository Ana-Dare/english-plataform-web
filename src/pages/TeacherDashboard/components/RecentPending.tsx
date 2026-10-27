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
  gap: 0.75rem;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0.875rem 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.45;
  color: #2b3a4e;
  font-weight: 500;
  border: 1px solid #e8e0db;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 0;

  &:hover {
    background-color: #f9f6f4;
    border-color: #d4957f;
  }

  svg {
    flex-shrink: 0;
  }
`;

const DotItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: #d4957f;
  }
`;

interface RecentPendingProps {
  onSelect?: (tab: string) => void;
}

const RecentPending = ({ onSelect }: RecentPendingProps) => {
  const pendingTasks = [
    { label: "4 matrículas aguardando confirmação", tab: "alunos" },
    { label: "3 alunos sem turma", tab: "alunos" },
    { label: "14 atividades não corrigidas", tab: "turmas" },
    { label: "2 faltas com atestado", tab: "agenda" },
  ];

  return (
    <PendingList>
      {pendingTasks.map((task, idx) => (
        <PendingItem key={idx} onClick={() => onSelect?.(task.tab)}>
          <DotItem>{task.label}</DotItem>
          {idx < 2 && (
            <AlertTriangle size={16} color="#d4957f" strokeWidth={2} />
          )}
        </PendingItem>
      ))}
    </PendingList>
  );
};

export default RecentPending;
