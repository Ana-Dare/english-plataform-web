import React, { useState, useMemo } from 'react';
import { addMonths, subMonths, addWeeks, subWeeks, startOfWeek, endOfWeek, format, isSameDay, isAfter, startOfDay, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Clock, CalendarDays, Search } from 'lucide-react';
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

type ViewMode = 'mensal' | 'semanal';

// Initial Mock Data
const today = new Date();
const initialEvents: CalendarEvent[] = [
  { id: '1', date: today, type: 'aula', title: 'Turma Beginner 1', time: '14:00' },
  { id: '2', date: today, type: 'aula', title: 'Particular - Camila', time: '16:00' },
  { id: '3', date: today, type: 'reuniao', title: 'Reunião Pedagógica', time: '10:00' },
  { id: '4', date: addDays(today, 1), type: 'aula', title: 'Turma Advanced', time: '09:00' },
  { id: '5', date: addDays(today, 1), type: 'pessoal', title: 'Preparar materiais', time: '15:00' },
  { id: '6', date: addDays(today, 2), type: 'reuniao', title: 'Reunião de pais', time: '18:00' },
  { id: '7', date: addDays(today, 3), type: 'aula', title: 'Particular - Marcos', time: '10:00' },
  { id: '8', date: addDays(today, 5), type: 'aula', title: 'Turma Intermediate', time: '14:00' },
];

const typeLabels: Record<string, string> = {
  'aula': 'Aula',
  'reuniao': 'Reunião',
  'pessoal': 'Pessoal',
};

const AgendaTab: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('mensal');
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState('');
  
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
    if (eventToEdit) {
      setEvents(prev => prev.map(e => e.id === eventToEdit.id ? { ...eventData, id: e.id } : e));
    } else {
      setEvents(prev => [...prev, { ...eventData, id: Date.now().toString() }]);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
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
