import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Info, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { 
  CardContainer, CalendarHeader, Title, MonthYear, CalendarGrid, WeekDay, DayCell,
  ModalOverlay, ModalContent, ModalCloseButton, ModalDetailRow,
  EventModalContent, EventModalHeader, EventModalCloseButton,
  EventModalBody, EventModalInfo, EventModalImage, JoinButton
} from './style';

const mockEvents = [
  { monthOffset: 0, day: 9, type: 'past', title: 'Avaliação Inicial', time: '14:00 - 15:30', location: 'Online', desc: 'Avaliação de nivelamento de vocabulário e gramática básica.' },
  { monthOffset: 0, day: 17, type: 'current', title: 'Atividade Pendente', time: 'Até as 23:59', location: 'Plataforma', desc: 'Entrega da análise textual "Effective communication".' },
  { monthOffset: 0, day: 24, type: 'event', title: 'Aula Ao Vivo', time: '19:00 - 20:30', location: 'Zoom (Link no mural)', desc: 'Aula sobre Simple Past Conversation & Pronunciation.' },
  
  // Julho
  { monthOffset: 1, day: 5, type: 'event', title: 'Aula Ao Vivo', time: '19:00 - 20:30', location: 'Zoom', desc: 'Aula sobre Present Perfect Continuous.' },
  { monthOffset: 1, day: 14, type: 'past', title: 'Entrega de Ensaio', time: 'Até as 23:59', location: 'Plataforma', desc: 'Ensaio argumentativo de 500 palavras.' },
  { monthOffset: 1, day: 22, type: 'current', title: 'Simulado Oral', time: '15:00 - 16:00', location: 'Zoom', desc: 'Prática de conversação com o professor.' },
  
  // Maio
  { monthOffset: -1, day: 12, type: 'past', title: 'Welcome Class', time: '19:00 - 20:30', location: 'Zoom', desc: 'Aula de boas vindas e apresentação do semestre.' },
  { monthOffset: -1, day: 25, type: 'past', title: 'Listening Practice', time: 'Até as 23:59', location: 'Plataforma', desc: 'Exercícios de escuta de áudios nativos.' },
];

const CalendarCard: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);

  const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  
  const currentDate = new Date(2026, 5 + monthOffset, 1);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const firstDayOfMonth = currentDate.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const daysArray: { day: number, type: string }[] = [];
  
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    daysArray.push({ day: daysInPrevMonth - i, type: 'disabled' });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({ day: i, type: '' });
  }
  const remainingCells = 42 - daysArray.length;
  for (let i = 1; i <= remainingCells; i++) {
    daysArray.push({ day: i, type: 'disabled' });
  }

  const currentDays = daysArray.map(cell => {
    if (cell.type === 'disabled') return cell;
    const event = mockEvents.find(e => e.day === cell.day && e.monthOffset === monthOffset);
    return event ? { ...cell, type: event.type } : cell;
  });

  const handleDayClick = (dayNum: number, type: string) => {
    if (type !== 'disabled' && type !== '' && type !== 'empty') {
      const event = mockEvents.find(e => e.day === dayNum && e.monthOffset === monthOffset);
      if (event) setSelectedEvent(event);
    }
  };

  const handlePrevMonth = () => setMonthOffset(prev => prev - 1);
  const handleNextMonth = () => setMonthOffset(prev => prev + 1);

  const displayMonth = currentDate.toLocaleString('pt-BR', { month: 'long' });

  return (
    <>
      <CardContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title>Agenda</Title>
          <CalendarHeader style={{ marginBottom: 0, gap: '8px' }}>
            <button onClick={handlePrevMonth}><ChevronLeft size={16} /></button>
            <MonthYear style={{ fontSize: '1rem' }}>{displayMonth}</MonthYear>
            <button onClick={handleNextMonth}><ChevronRight size={16} /></button>
          </CalendarHeader>
        </div>
        
        <CalendarGrid>
          {weekDays.map(day => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
          
          {currentDays.map((item, index) => (
            <DayCell 
              key={index} 
              $type={item.type as any}
              onClick={() => handleDayClick(item.day, item.type)}
            >
              {item.day}
            </DayCell>
          ))}
        </CalendarGrid>
      </CardContainer>

      {/* Pop-up / Modal Interativo */}
      <AnimatePresence>
        {selectedEvent && (
          <ModalOverlay 
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            {selectedEvent.type === 'event' ? (
              <EventModalContent
                as={motion.div}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <EventModalCloseButton onClick={() => setSelectedEvent(null)}>
                  <X size={20} />
                </EventModalCloseButton>
                
                <EventModalHeader>
                  <h2>Participar da aula</h2>
                  <p>Vídeo chamada com Turma B2</p>
                </EventModalHeader>

                <EventModalBody>
                  <EventModalInfo>
                    <span className="course-level">English Intermediate</span>
                    <p><strong>Aula:</strong> {selectedEvent.desc ? selectedEvent.desc.split('.')[0] : 'Simple Past Conversation'}</p>
                    <p><strong>Descrição:</strong> Lorem ipsum dolor sit am consectetur adipiscing elit.</p>
                    <p><strong>Materiais:</strong> Lorem ipsum dolor sit am consectetur adipiscing elit.</p>
                    <p><strong>Atividades:</strong> Lorem ipsum dolor sit am consectetur adipiscing elit.</p>
                    
                    <JoinButton onClick={() => window.open('https://zoom.us', '_blank')}>
                      <Video size={18} />
                      Acessar vídeo-chamada
                    </JoinButton>
                  </EventModalInfo>
                  
                  <EventModalImage>
                    <img src="/video_call_laptop.png" alt="Video call preview" />
                  </EventModalImage>
                </EventModalBody>
              </EventModalContent>
            ) : (
              <ModalContent
                as={motion.div}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
              >
                <ModalCloseButton onClick={() => setSelectedEvent(null)}>
                  <X size={20} />
                </ModalCloseButton>

                <h2>
                  <Calendar size={24} /> 
                  {selectedEvent.day} de {displayMonth}
                </h2>

                <ModalDetailRow>
                  <strong><Info size={16} /> Título</strong>
                  <span>{selectedEvent.title}</span>
                </ModalDetailRow>
                
                <ModalDetailRow>
                  <strong><Clock size={16} /> Horário</strong>
                  <span>{selectedEvent.time}</span>
                </ModalDetailRow>

                <ModalDetailRow>
                  <strong><MapPin size={16} /> Local / Formato</strong>
                  <span>{selectedEvent.location}</span>
                </ModalDetailRow>

                <ModalDetailRow style={{ marginTop: '8px' }}>
                  <strong>Descrição</strong>
                  <span style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5' }}>
                    {selectedEvent.desc}
                  </span>
                </ModalDetailRow>
              </ModalContent>
            )}
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default CalendarCard;
