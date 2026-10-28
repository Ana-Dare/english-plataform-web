import React, { useState, useMemo } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks, startOfWeek, endOfWeek, format, isSameDay, isAfter, startOfDay, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Clock, CalendarDays, Search } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  AgendaPageLayout, AgendaContainer, AgendaHeader, MonthTitle, HeaderControls, 
  IconButton, PrimaryButton, SearchWrapper, ViewToggle, ViewToggleButton,
  UpcomingContainer, UpcomingHeader, UpcomingList, UpcomingEventCard,
  EventTimeIndicator, EventCardContent, EventCardTitle, EventCardMeta,
  EventCardDate, EventTypeBadge, EmptyUpcoming
} from './style';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import type { CalendarEvent } from './EventModal';
import useToast from '../../../contexts/Toast/useToast';
import { useClasses } from '../../../contexts/Classes';
import {
  cancelClassLesson,
  createClassLesson,
  listLessons,
  updateClassLesson,
  type Lesson,
} from '../services/material';

type ViewMode = 'mensal' | 'semanal';

const typeLabels: Record<string, string> = {
  'aula': 'Aula',
  'reuniao': 'Reunião',
  'pessoal': 'Pessoal',
};

function apiErrorMessage(error: unknown, fallback: string) {
  const response = (error as { response?: { data?: { error?: string } } })?.response;
  return response?.data?.error || fallback;
}

function lessonToEvent(lesson: Lesson, className?: string): CalendarEvent {
  const start = new Date(lesson.startTime);
  const [hours = '0', minutes = '0'] = lesson.duration.split(':');
  const end = new Date(start.getTime() + (Number(hours) * 60 + Number(minutes)) * 60000);
  const timeFmt = (value: Date) =>
    value.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return {
    id: String(lesson.id),
    lessonId: lesson.id,
    classId: lesson.classId,
    date: start,
    type: 'aula',
    title: className || lesson.title,
    time: Number.isNaN(start.valueOf()) ? '00:00' : timeFmt(start),
    endTime: Number.isNaN(end.valueOf()) ? undefined : timeFmt(end),
    description: lesson.description ?? undefined,
  };
}

const AgendaTab: React.FC = () => {
  const { addToast } = useToast();
  const { classes } = useClasses();
  const queryClient = useQueryClient();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('mensal');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: lessons = [] } = useQuery({
    queryKey: ['lessons'],
    queryFn: () => listLessons(),
  });

  const events = useMemo(
    () =>
      lessons
        .filter((lesson) => lesson.status !== 'cancelled')
        .map((lesson) => {
          const className = classes.find((cls) => cls.id === lesson.classId)?.name;
          return lessonToEvent(lesson, className);
        }),
    [lessons, classes],
  );

  const invalidateLessons = () => {
    void queryClient.invalidateQueries({ queryKey: ['lessons'] });
    void queryClient.invalidateQueries({ queryKey: ['classLessons'] });
  };

  const createMutation = useMutation({
    mutationFn: ({
      classId,
      title,
      date,
      startTime,
      endTime,
      description,
    }: {
      classId: number;
      title: string;
      date: string;
      startTime: string;
      endTime: string;
      description?: string;
    }) =>
      createClassLesson(classId, {
        title,
        date,
        startTime,
        endTime,
        description,
      }),
    onSuccess: invalidateLessons,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      lessonId,
      title,
      date,
      startTime,
      endTime,
      description,
    }: {
      lessonId: number;
      title: string;
      date: string;
      startTime: string;
      endTime: string;
      description?: string;
    }) =>
      updateClassLesson(lessonId, {
        title,
        date,
        startTime,
        endTime,
        description,
      }),
    onSuccess: invalidateLessons,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelClassLesson,
    onSuccess: invalidateLessons,
  });
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  const handlePrev = () => viewMode === 'mensal' ? prevMonth() : prevWeek();
  const handleNext = () => viewMode === 'mensal' ? nextMonth() : nextWeek();

  const headerTitle = useMemo(() => {
    if (viewMode === 'mensal') {
      return format(currentMonth, 'MMMM yyyy', { locale: ptBR });
    }
    const weekStart = startOfWeek(currentWeek, { locale: ptBR });
    const weekEnd = endOfWeek(currentWeek, { locale: ptBR });
    return `${format(weekStart, "d 'de' MMM", { locale: ptBR })} — ${format(weekEnd, "d 'de' MMM", { locale: ptBR })}`;
  }, [viewMode, currentMonth, currentWeek]);

  const filteredEvents = useMemo(() => {
    if (!searchQuery) return events;
    return events.filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      typeLabels[e.type].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [events, searchQuery]);

  // Upcoming events: from today forward, sorted by date then time
  const upcomingEvents = useMemo(() => {
    const todayStart = startOfDay(new Date());
    return filteredEvents
      .filter(e => isSameDay(e.date, todayStart) || isAfter(e.date, todayStart))
      .sort((a, b) => {
        const dateCompare = a.date.getTime() - b.date.getTime();
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      });
  }, [filteredEvents]);

  const handleDateClick = (date: Date) => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    const clickedStr = format(date, "yyyy-MM-dd");
    if (clickedStr < todayStr) {
      addToast("Não é permitido agendar eventos em datas passadas.", "warning");
      return;
    }
    setSelectedDate(date);
    setEventToEdit(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEventToEdit(event);
    setSelectedDate(event.date);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (eventData.type !== 'aula' || !eventData.classId) {
      addToast('A agenda da plataforma salva apenas aulas vinculadas a uma turma.', 'warning');
      return;
    }

    const date = format(eventData.date, 'yyyy-MM-dd');
    const payload = {
      classId: eventData.classId,
      title: eventData.title,
      date,
      startTime: eventData.time,
      endTime: eventData.endTime || eventData.time,
      description: eventData.description,
    };

    if (eventToEdit?.lessonId) {
      updateMutation.mutate(
        { lessonId: eventToEdit.lessonId, ...payload },
        {
          onSuccess: () => {
            addToast('Aula atualizada com sucesso!', 'success');
            setIsModalOpen(false);
          },
          onError: (error) => {
            addToast(apiErrorMessage(error, 'Não foi possível atualizar a aula.'), 'error');
          },
        },
      );
      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        addToast('Aula agendada com sucesso!', 'success');
        setIsModalOpen(false);
      },
      onError: (error) => {
        addToast(apiErrorMessage(error, 'Não foi possível agendar a aula.'), 'error');
      },
    });
  };

  const handleDeleteEvent = (id: string) => {
    const lessonId = Number(id);
    if (!lessonId) return;
    cancelMutation.mutate(lessonId, {
      onSuccess: () => addToast('Aula cancelada com sucesso.', 'success'),
      onError: (error) => {
        addToast(apiErrorMessage(error, 'Não foi possível cancelar a aula.'), 'error');
      },
    });
  };

  const openNewEventModal = () => {
    setSelectedDate(new Date());
    setEventToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <AgendaPageLayout>
      {/* LEFT: Compact Calendar */}
      <AgendaContainer>
        <AgendaHeader>
          <HeaderControls>
            <IconButton onClick={handlePrev}><ChevronLeft size={18} /></IconButton>
            <IconButton onClick={handleNext}><ChevronRight size={18} /></IconButton>
            <MonthTitle>{headerTitle}</MonthTitle>
          </HeaderControls>

          <ViewToggle>
            <ViewToggleButton $active={viewMode === 'mensal'} onClick={() => setViewMode('mensal')}>Mensal</ViewToggleButton>
            <ViewToggleButton $active={viewMode === 'semanal'} onClick={() => setViewMode('semanal')}>Semanal</ViewToggleButton>
          </ViewToggle>

                                  <div className="right-actions">
              <SearchWrapper>
                <Search size={22} />
                <input 
                  type="text" 
                  placeholder="Pesquisar eventos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchWrapper>

              <PrimaryButton onClick={openNewEventModal}>
                <Plus size={16} /> Novo
              </PrimaryButton>
            </div>
        </AgendaHeader>

        <CalendarGrid 
          currentMonth={currentMonth}
          currentWeek={currentWeek}
          viewMode={viewMode}
          events={filteredEvents} 
          onDateClick={handleDateClick} 
          onEventClick={handleEventClick} 
        />
      </AgendaContainer>

      {/* RIGHT: Upcoming Events */}
      <UpcomingContainer>
        <UpcomingHeader>
          <h3>Próximos Eventos</h3>
          <span>{upcomingEvents.length} evento{upcomingEvents.length !== 1 ? 's' : ''}</span>
        </UpcomingHeader>
        <UpcomingList>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <UpcomingEventCard key={event.id} $type={event.type} onClick={() => handleEventClick(event)}>
                <EventTimeIndicator $type={event.type} />
                <EventCardContent>
                  <EventCardTitle>{event.title}</EventCardTitle>
                  <EventCardMeta>
                    <Clock size={12} />
                    {event.time}{event.endTime ? ` – ${event.endTime}` : ''}
                    <EventTypeBadge $type={event.type}>
                      {typeLabels[event.type]}
                    </EventTypeBadge>
                  </EventCardMeta>
                  <EventCardDate>
                    {isSameDay(event.date, new Date()) 
                      ? 'Hoje' 
                      : isSameDay(event.date, addDays(new Date(), 1))
                        ? 'Amanhã'
                        : format(event.date, "EEEE, d 'de' MMMM", { locale: ptBR })
                    }
                  </EventCardDate>
                </EventCardContent>
              </UpcomingEventCard>
            ))
          ) : (
            <EmptyUpcoming>
              <CalendarDays size={36} />
              <p>Nenhum evento próximo</p>
            </EmptyUpcoming>
          )}
        </UpcomingList>
      </UpcomingContainer>

      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        eventToEdit={eventToEdit}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </AgendaPageLayout>
  );
};

export default AgendaTab;


