import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { listLessons } from "../services/material";

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
  background-color: #e0d8d3;
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
  background-color: #2b3a4e;
  color: #f0ebe7;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(43, 58, 78, 0.2);
`;

const ContentCard = styled.div`
  flex: 1;
  min-width: 0;
  background-color: #ffffff;
  border: 1px solid #e8e0db;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9f6f4;
    border-color: #d4957f;
  }
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;

  h4 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.35;
    color: #2b3a4e;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.4;
    color: #64748b;
  }
`;

interface DailyAgendaProps {
  onSelect?: () => void;
}

const DailyAgenda = ({ onSelect }: DailyAgendaProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["lessons", "today", today],
    queryFn: () => listLessons({ start_date: today, end_date: today }),
  });

  const scheduled = lessons.filter((lesson) => lesson.status === "scheduled");

  return (
    <AgendaContainer>
      <TimelineLine />
      {isLoading && (
        <AgendaItem>
          <TimeBubble>--</TimeBubble>
          <ContentCard>
            <ClassInfo>
              <h4>Carregando aulas de hoje...</h4>
              <p>Buscando a agenda na API</p>
            </ClassInfo>
          </ContentCard>
        </AgendaItem>
      )}
      {!isLoading && scheduled.length === 0 && (
        <AgendaItem>
          <TimeBubble>--</TimeBubble>
          <ContentCard onClick={onSelect}>
            <ClassInfo>
              <h4>Nenhuma aula hoje</h4>
              <p>Abra a agenda para agendar uma nova aula</p>
            </ClassInfo>
            <ChevronDown size={20} color="#7a8a9e" />
          </ContentCard>
        </AgendaItem>
      )}
      {scheduled.map((lesson) => {
        const start = new Date(lesson.startTime);
        const time = Number.isNaN(start.valueOf())
          ? "--"
          : start.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });
        return (
          <AgendaItem key={lesson.id}>
            <TimeBubble>{time}</TimeBubble>
            <ContentCard onClick={onSelect}>
              <ClassInfo>
                <h4>{lesson.title}</h4>
                <p>{lesson.status === "scheduled" ? "Aula agendada" : lesson.status}</p>
              </ClassInfo>
              <ChevronDown size={20} color="#7a8a9e" />
            </ContentCard>
          </AgendaItem>
        );
      })}
    </AgendaContainer>
  );
};

export default DailyAgenda;
