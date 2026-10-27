import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarGridContainer,
  WeekDayHeader,
  DayCell,
  DayNumber,
  EventChip,
  ScrollWrapper,
  MoreEventsBadge,
} from "./style";
import DayEventsModal from "./DayEventsModal";
import type { CalendarEvent } from "./EventModal";

interface CalendarGridProps {
  currentMonth: Date;
  currentWeek: Date;
  viewMode: "mensal" | "semanal";
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  currentWeek,
  viewMode,
  events,
  onDateClick,
  onEventClick,
}) => {
  const [selectedDayEvents, setSelectedDayEvents] = useState<{
    date: Date;
    events: CalendarEvent[];
  } | null>(null);

  // Hook responsivo para adaptar o limite de eventos visíveis
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 600;
  const isTablet = windowWidth > 600 && windowWidth <= 960;

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  let days: Date[];

  if (viewMode === "semanal") {
    const weekStart = startOfWeek(currentWeek, { locale: ptBR });
    const weekEnd = endOfWeek(currentWeek, { locale: ptBR });
    days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  } else {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: ptBR });
    const endDate = endOfWeek(monthEnd, { locale: ptBR });
    days = eachDayOfInterval({ start: startDate, end: endDate });
  }

  const monthStart = startOfMonth(currentMonth);

  return (
    <>
      <ScrollWrapper>
        <CalendarGridContainer $isWeekly={viewMode === "semanal"}>
          {weekDays.map((day) => (
            <WeekDayHeader key={day}>{day}</WeekDayHeader>
          ))}

          {days.map((day, idx) => {
            const dayEvents = events
              .filter((e) => isSameDay(e.date, day))
              .sort((a, b) => a.time.localeCompare(b.time));

            // Limite inteligente por célula para garantir que nunca transborde
            const cellLimit = (() => {
              if (viewMode === "semanal") {
                return isMobile ? 2 : isTablet ? 3 : 5;
              }
              // Visão mensal: se houver mais eventos do que cabe com folga, esconde e mostra "+X mais"
              if (isMobile) {
                return 1;
              }
              if (isTablet) {
                return dayEvents.length > 2 ? 1 : 2;
              }
              // Desktop: até 2 eventos mostra direto; se tiver 3+, mostra 1 + "+X mais"
              return dayEvents.length > 2 ? 1 : 2;
            })();

            const visibleEvents = dayEvents.slice(0, cellLimit);
            const hiddenCount = dayEvents.length - visibleEvents.length;

            const handleCellClick = () => {
              if (dayEvents.length > 0) {
                setSelectedDayEvents({ date: day, events: dayEvents });
              } else {
                onDateClick(day);
              }
            };

            return (
              <DayCell
                key={idx}
                $isCurrentMonth={
                  viewMode === "semanal" ? true : isSameMonth(day, monthStart)
                }
                $isToday={isToday(day)}
                $isWeekly={viewMode === "semanal"}
                onClick={handleCellClick}
              >
                <DayNumber
                  $isCurrentMonth={
                    viewMode === "semanal" ? true : isSameMonth(day, monthStart)
                  }
                  $isToday={isToday(day)}
                >
                  {format(day, "d")}
                </DayNumber>

                {visibleEvents.map((e) => (
                  <EventChip
                    key={e.id}
                    $type={e.type}
                    title={`${e.time}${e.endTime ? ` – ${e.endTime}` : ""} - ${e.title}`}
                    onClick={(ev) => {
                      ev.stopPropagation(); // impede acionamento de clique na célula
                      onEventClick(e);
                    }}
                  >
                    <span className="chip-time">{e.time}</span>
                    <span className="chip-title">{e.title}</span>
                  </EventChip>
                ))}

                {hiddenCount > 0 && (
                  <MoreEventsBadge
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setSelectedDayEvents({ date: day, events: dayEvents });
                    }}
                    title={`Ver todos os ${dayEvents.length} eventos deste dia`}
                  >
                    +{hiddenCount}
                  </MoreEventsBadge>
                )}
              </DayCell>
            );
          })}
        </CalendarGridContainer>
      </ScrollWrapper>

      {/* Modal/Popover com a lista completa dos eventos daquele dia */}
      <DayEventsModal
        isOpen={!!selectedDayEvents}
        date={selectedDayEvents?.date ?? null}
        events={selectedDayEvents?.events ?? []}
        onClose={() => setSelectedDayEvents(null)}
        onEventClick={onEventClick}
        onAddEvent={onDateClick}
      />
    </>
  );
};

export default CalendarGrid;
