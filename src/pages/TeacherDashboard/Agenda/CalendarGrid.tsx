import React from "react";
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
  ScrollWrapper
} from "./style";
import type { CalendarEvent } from "./EventModal";

interface CalendarGridProps {
  currentMonth: Date;
  currentWeek: Date;
  viewMode: 'mensal' | 'semanal';
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
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  let days: Date[];

  if (viewMode === 'semanal') {
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
    <ScrollWrapper>
      <CalendarGridContainer $isWeekly={viewMode === 'semanal'}>
      {weekDays.map((day) => (
        <WeekDayHeader key={day}>{day}</WeekDayHeader>
      ))}

      {days.map((day, idx) => {
        const dayEvents = events
          .filter((e) => isSameDay(e.date, day))
          .sort((a, b) => a.time.localeCompare(b.time));

        return (
          <DayCell
            key={idx}
            $isCurrentMonth={viewMode === 'semanal' ? true : isSameMonth(day, monthStart)}
            $isToday={isToday(day)}
            $isWeekly={viewMode === 'semanal'}
            onClick={() => onDateClick(day)}
          >
            <DayNumber
              $isCurrentMonth={viewMode === 'semanal' ? true : isSameMonth(day, monthStart)}
              $isToday={isToday(day)}
            >
              {format(day, "d")}
            </DayNumber>

            {dayEvents.map((e) => (
              <EventChip
                key={e.id}
                $type={e.type}
                title={`${e.time}${e.endTime ? ` – ${e.endTime}` : ''} - ${e.title}`}
                onClick={(ev) => {
                  ev.stopPropagation(); // prevent triggering onDateClick
                  onEventClick(e);
                }}
              >
                {e.time}{e.endTime ? `–${e.endTime}` : ''} {e.title}
              </EventChip>
            ))}
          </DayCell>
        );
      })}
    </CalendarGridContainer>
    </ScrollWrapper>
  );
};

export default CalendarGrid;
