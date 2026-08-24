import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Info, Clock, MapPin, X, Video } from 'lucide-react';
import { 
  Container, CalendarCard, CalendarHeader, MonthYear, CalendarGrid, 
  WeekDay, DayCell, LegendContainer, LegendItem, DetailsPanel, 
  DetailsHeader, DetailRow, EmptyState, TooltipContainer 
} from './style';
import {
  ModalOverlay, EventModalContent, EventModalHeader, EventModalCloseButton,
  EventModalBody, EventModalInfo, EventModalImage, JoinButton
} from '../CalendarCard/style';

// Mock data for events across multiple months
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

const MyClasses: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [monthOffset, setMonthOffset] = useState(0); // 0 = Junho 2026, etc.
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    daysArray.push({ day: i, type: 'empty' });
  }
  const remainingCells = Math.max(35, Math.ceil(daysArray.length / 7) * 7) - daysArray.length;
  for (let i = 1; i <= remainingCells; i++) {
    daysArray.push({ day: i, type: 'disabled' });
  }

  // Merge events into the days array
  const currentDays = daysArray.map(cell => {
    if (cell.type === 'disabled') return cell;
    const event = mockEvents.find(e => e.day === cell.day && e.monthOffset === monthOffset);
    return event ? { ...cell, type: event.type } : cell;
  });

  const getEventData = (dayNum: number) => mockEvents.find(e => e.day === dayNum && e.monthOffset === monthOffset);
  const selectedEvent = selectedDay ? getEventData(selectedDay) : null;

  const handlePrevMonth = () => setMonthOffset(prev => prev - 1);
  const handleNextMonth = () => setMonthOffset(prev => prev + 1);

  const displayMonth = currentDate.toLocaleString('pt-BR', { month: 'long' });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      style={{ height: '100%' }}
    >
      <Container>
        {/* Coluna Esquerda: Calendário */}
        <CalendarCard>
          <CalendarHeader>
            <button onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
            <MonthYear>{displayMonth} 2026</MonthYear>
            <button onClick={handleNextMonth}><ChevronRight size={20} /></button>
          </CalendarHeader>

          <CalendarGrid>
            {weekDays.map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
            
            {currentDays.map((item, index) => {
              const eventData = getEventData(item.day);
              const isInteractable = item.type !== 'disabled' && item.type !== 'empty';

              return (
                <DayCell 
                  key={index} 
                  $type={item.type as any}
                  $isSelected={selectedDay === item.day}
                  $isHovered={hoveredDay === item.day}
                  onMouseEnter={() => isInteractable && setHoveredDay(item.day)}
                  onMouseLeave={() => isInteractable && setHoveredDay(null)}
                  onClick={() => isInteractable && setSelectedDay(item.day)}
                >
                  {item.day}
                  
                  {/* Tooltip on Hover */}
                  <AnimatePresence>
                    {hoveredDay === item.day && eventData && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'absolute', zIndex: 50, top: '-10px', left: '50%', width: '1px', height: '1px' }}
                      >
                        <TooltipContainer>
                          {eventData.title}
                        </TooltipContainer>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </DayCell>
              );
            })}
          </CalendarGrid>

          <LegendContainer>
            <LegendItem>
              <div className="color-dot" style={{ backgroundColor: '#2563eb' }} />
              Aula Confirmada / Nova Prova
            </LegendItem>
            <LegendItem>
              <div className="color-dot" style={{ backgroundColor: '#fcedb3' }} />
              Avaliação Passada / Atividade Pendente
            </LegendItem>
            <LegendItem>
              <div className="color-dot" style={{ border: '2px solid #333' }} />
              Dia Selecionado
            </LegendItem>
          </LegendContainer>
        </CalendarCard>

        {/* Coluna Direita: Painel de Detalhes */}
        <DetailsPanel>
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DetailsHeader>
                  <Calendar size={28} />
                  Detalhes do Evento: {selectedEvent.day} de {displayMonth}
                </DetailsHeader>
                
                <DetailRow>
                  <strong><Info size={16} /> Título</strong>
                  <span>{selectedEvent.title}</span>
                </DetailRow>
                
                <DetailRow>
                  <strong><Clock size={16} /> Horário</strong>
                  <span>{selectedEvent.time}</span>
                </DetailRow>

                <DetailRow>
                  <strong><MapPin size={16} /> Local / Formato</strong>
                  <span>{selectedEvent.location}</span>
                </DetailRow>

                <DetailRow style={{ marginTop: '16px' }}>
                  <strong>Descrição</strong>
                  <span style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
                    {selectedEvent.desc}
                  </span>
                </DetailRow>

                {selectedEvent.type === 'event' && (
                  <JoinButton style={{ marginTop: '24px' }} onClick={() => setIsModalOpen(true)}>
                    <Video size={18} />
                    Entrar na aula
                  </JoinButton>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <EmptyState>
                  <Calendar />
                  <h3>Selecione um dia no calendário</h3>
                  <p>Clique em uma data destacada para ver os detalhes da aula, atividade ou avaliação marcada para aquele dia.</p>
                </EmptyState>
              </motion.div>
            )}
          </AnimatePresence>
        </DetailsPanel>
      </Container>

      {/* Modal de Aula */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <ModalOverlay 
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            style={{ zIndex: 9999 }}
          >
            <EventModalContent
              as={motion.div}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <EventModalCloseButton onClick={() => setIsModalOpen(false)}>
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
          </ModalOverlay>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MyClasses;
