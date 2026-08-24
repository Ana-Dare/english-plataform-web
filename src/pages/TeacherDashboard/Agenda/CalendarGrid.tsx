import React from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay, isToday 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarGridContainer, WeekDayHeader, DayCell, DayNumber, EventChip } from './style';
import type { CalendarEvent } from './EventModal';

interface CalendarGridProps {
  currentMonth: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentMonth, events, onDateClick, onEventClick 
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: ptBR });
  const endDate = endOfWeek(monthEnd, { locale: ptBR });

  const dateFormat = 'd';
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <CalendarGridContainer>
      {weekDays.map(day => (
        <WeekDayHeader key={day}>{day}</WeekDayHeader>
      ))}

      {days.map((day, idx) => {
        const dayEvents = events.filter(e => isSameDay(e.date, day)).sort((a, b) => a.time.localeCompare(b.time));
        
        return (
          <DayCell 
            key={idx} 
            $isCurrentMonth={isSameMonth(day, monthStart)}
            $isToday={isToday(day)}
            onClick={() => onDateClick(day)}
          >
            <DayNumber 
              $isCurrentMonth={isSameMonth(day, monthStart)}
              $isToday={isToday(day)}
            >
              {format(day, dateFormat)}
            </DayNumber>
            
            {dayEvents.map(e => (
              <EventChip 
                key={e.id} 
                $type={e.type}
                title={`${e.time} - ${e.title}`}
                onClick={(ev) => {
                  ev.stopPropagation(); // prevent triggering onDateClick
                  onEventClick(e);
                }}
              >
                {e.time} - {e.title}
              </EventChip>
            ))}
          </DayCell>
        );
      })}
    </CalendarGridContainer>
  );
};

export default CalendarGrid;
