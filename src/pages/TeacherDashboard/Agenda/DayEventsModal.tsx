import React from "react";
import { X, CalendarDays, Plus, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { CalendarEvent } from "./EventModal";
import {
  DayModalOverlay,
  DayModalContent,
  DayModalHeader,
  DayModalTitle,
  DayModalSubtitle,
  DayModalCloseBtn,
  DayModalBody,
  DayEventItem,
  DayEventItemLeft,
  DayEventTypeBar,
  DayEventDetails,
  DayEventItemTitle,
  DayEventItemMeta,
  DayEventItemBadge,
  DayModalFooter,
  DayModalAddBtn,
  DayModalCancelBtn,
  EmptyDayEvents,
} from "./style";

interface DayEventsModalProps {
  isOpen: boolean;
  date: Date | null;
  events: CalendarEvent[];
  onClose: () => void;
  onEventClick: (event: CalendarEvent) => void;
  onAddEvent: (date: Date) => void;
}

const typeLabels: Record<string, string> = {
  aula: "Aula",
  reuniao: "Reunião",
  pessoal: "Pessoal",
};

const DayEventsModal: React.FC<DayEventsModalProps> = ({
  isOpen,
  date,
  events,
  onClose,
  onEventClick,
  onAddEvent,
}) => {
  if (!isOpen || !date) return null;

  const formattedDate = format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const isPast = format(date, "yyyy-MM-dd") < todayStr;

  return (
    <DayModalOverlay onClick={onClose}>
      <DayModalContent onClick={(e) => e.stopPropagation()}>
        <DayModalHeader>
          <div>
            <DayModalTitle>{capitalizedDate}</DayModalTitle>
            <DayModalSubtitle>
              {events.length} evento{events.length !== 1 ? "s" : ""} agendado
              {events.length !== 1 ? "s" : ""}
            </DayModalSubtitle>
          </div>
          <DayModalCloseBtn onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </DayModalCloseBtn>
        </DayModalHeader>

        <DayModalBody>
          {events.length === 0 ? (
            <EmptyDayEvents>
              <CalendarDays size={32} />
              <p>Nenhum evento neste dia</p>
            </EmptyDayEvents>
          ) : (
            events.map((event) => (
              <DayEventItem
                key={event.id}
                onClick={() => {
                  onClose();
                  onEventClick(event);
                }}
              >
                <DayEventItemLeft>
                  <DayEventTypeBar $type={event.type} />
                  <DayEventDetails>
                    <DayEventItemTitle>{event.title}</DayEventItemTitle>
                    <DayEventItemMeta>
                      <Clock size={12} />
                      <span>
                        {event.time}
                        {event.endTime ? ` – ${event.endTime}` : ""}
                      </span>
                      <DayEventItemBadge $type={event.type}>
                        {typeLabels[event.type] || event.type}
                      </DayEventItemBadge>
                      {event.classMode && (
                        <span>
                          •{" "}
                          {event.classMode === "individual"
                            ? "Individual"
                            : "Em Grupo"}
                        </span>
                      )}
                    </DayEventItemMeta>
                  </DayEventDetails>
                </DayEventItemLeft>
                <ArrowRight size={16} color="#94a3b8" />
              </DayEventItem>
            ))
          )}
        </DayModalBody>

        <DayModalFooter>
          {!isPast && (
            <DayModalAddBtn
              type="button"
              onClick={() => {
                onClose();
                onAddEvent(date);
              }}
            >
              <Plus size={16} /> Novo Evento
            </DayModalAddBtn>
          )}
          <DayModalCancelBtn type="button" onClick={onClose}>
            Fechar
          </DayModalCancelBtn>
        </DayModalFooter>
      </DayModalContent>
    </DayModalOverlay>
  );
};

export default DayEventsModal;
