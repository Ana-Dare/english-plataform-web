import React from "react";
import {
  DashboardContainer,
  HeaderSection,
  BadgesContainer,
  Badge,
  StatsRow,
  StatCard,
  IconBox,
  StatInfo,
  ProgressSection,
  ProgressHeader,
  Percentage,
  ProgressBar,
  ProgressFill,
  ProgressFooter,
  AgendaSection,
  AgendaGrid,
  ClassesList,
  EventsList,
  ColumnHeader,
  ClassCard,
  DateBox,
  ClassDetails,
  Dot,
  EventCard,
  EventTime,
} from "./style";
import { Award, BarChart, Calendar, Clock, Link as LinkIcon } from "lucide-react";
import { useStudentClass } from "./hooks/useStudentClass";
import { useStudentProfile } from "./hooks/useStudentProfile";

const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

interface StudentHomeProps {
  onOpenTurma: () => void;
  onOpenProfile: () => void;
}

const StudentHome: React.FC<StudentHomeProps> = ({ onOpenTurma, onOpenProfile }) => {
  const { currentClass, lessons, isLoading } = useStudentClass();
  const { user } = useStudentProfile();

  const completedLessons = lessons.filter((lesson) => lesson.status === "completed");
  const upcomingLessons = lessons
    .filter((lesson) => lesson.status === "scheduled")
    .slice(0, 4);
  const progress =
    lessons.length > 0
      ? Math.round((completedLessons.length / lessons.length) * 100)
      : 0;
  const nextLesson = upcomingLessons[0];
  const nextLessonLabel = nextLesson
    ? new Date(nextLesson.startTime).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Sem aula agendada";

  return (
    <DashboardContainer>
      <HeaderSection>
        <div>
          <h1>Início</h1>
          <p>
            {isLoading
              ? "Carregando sua jornada..."
              : "Acompanhe seu progresso e os próximos passos da sua jornada."}
          </p>
        </div>
        <BadgesContainer>
          <Badge $variant="primary">
            <Dot $color="white" /> {currentClass?.name || "Sem turma"}
          </Badge>
          <Badge $variant="secondary">
            <Dot $color="#1F2B45" /> {user?.profile?.vip ? "VIP" : "Regular"}
          </Badge>
        </BadgesContainer>
      </HeaderSection>

      <StatsRow>
        <StatCard onClick={onOpenProfile}>
          <IconBox $bg="#E8F0FE" $color="#4A72FF">
            <Calendar />
          </IconBox>
          <StatInfo>
            <h4>{completedLessons.length}</h4>
            <p>Aulas Concluídas</p>
          </StatInfo>
        </StatCard>
        <StatCard onClick={onOpenProfile}>
          <IconBox $bg="#E8F0FE" $color="#4A72FF">
            <BarChart />
          </IconBox>
          <StatInfo>
            <h4>{progress}%</h4>
            <p>Progresso do Nível</p>
          </StatInfo>
        </StatCard>
        <StatCard onClick={onOpenTurma}>
          <IconBox $bg="#E8F0FE" $color="#4A72FF">
            <Clock />
          </IconBox>
          <StatInfo>
            <h4>{nextLessonLabel}</h4>
            <p>Próxima Aula</p>
          </StatInfo>
        </StatCard>
        <StatCard onClick={onOpenProfile}>
          <IconBox $bg="#E8F0FE" $color="#4A72FF">
            <Award />
          </IconBox>
          <StatInfo>
            <h4>{user?.name ? 1 : 0}</h4>
            <p>Perfil ativo</p>
          </StatInfo>
        </StatCard>
      </StatsRow>

      <ProgressSection onClick={onOpenProfile}>
        <ProgressHeader>
          <div>
            <h4>Desempenho e Andamento</h4>
            <p>
              {currentClass?.name || "Turma"} - {completedLessons.length} de{" "}
              {lessons.length} aulas concluídas
            </p>
          </div>
          <Percentage>{progress}%</Percentage>
        </ProgressHeader>
        <ProgressBar>
          <ProgressFill $width={`${progress}%`} />
        </ProgressBar>
        <ProgressFooter>
          <span>
            Matrícula:{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("pt-BR")
              : "--"}
          </span>
          <span>Aulas registradas: {lessons.length}</span>
        </ProgressFooter>
      </ProgressSection>

      <AgendaSection>
        <h3>Minha Agenda</h3>
        <AgendaGrid>
          <div>
            <ColumnHeader>Próximas aulas agendadas</ColumnHeader>
            <ClassesList>
              {upcomingLessons.length === 0 && (
                <p style={{ color: "#64748B", padding: "12px 0" }}>
                  Nenhuma aula agendada no momento.
                </p>
              )}
              {upcomingLessons.map((lesson) => {
                const date = new Date(lesson.startTime);
                return (
                  <ClassCard key={lesson.id} onClick={onOpenTurma}>
                    <DateBox>
                      <strong>{String(date.getDate()).padStart(2, "0")}</strong>
                      <span>{MONTHS[date.getMonth()]}</span>
                    </DateBox>
                    <ClassDetails>
                      <div className="title-row">
                        <Dot $color="#C57A67" />
                        <h5>{lesson.title}</h5>
                        <Badge $variant="blue">Turma</Badge>
                        <LinkIcon size={16} />
                      </div>
                      <p>
                        {date.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </ClassDetails>
                  </ClassCard>
                );
              })}
            </ClassesList>
          </div>

          <div>
            <ColumnHeader>Próximos Eventos</ColumnHeader>
            <EventsList>
              {upcomingLessons.length === 0 && (
                <p style={{ color: "#64748B", padding: "12px 0" }}>
                  Nenhum evento próximo.
                </p>
              )}
              {upcomingLessons.map((lesson) => (
                <EventCard key={lesson.id} onClick={onOpenTurma}>
                  <div>
                    <h5>{lesson.title}</h5>
                    <p>
                      {new Date(lesson.startTime).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <EventTime $color="#C57A67">
                    {new Date(lesson.startTime).toLocaleDateString("pt-BR")}
                  </EventTime>
                </EventCard>
              ))}
            </EventsList>
          </div>
        </AgendaGrid>
      </AgendaSection>
    </DashboardContainer>
  );
};

export default StudentHome;
