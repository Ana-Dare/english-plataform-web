import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ModalOverlay, ModalContent, ModalHeader, FormGroup, ButtonGroup, ModalButton } from './style';

export type EventType = 'aula' | 'reuniao' | 'pessoal';

export interface CalendarEvent {
  id: string;
  date: Date;
  type: EventType;
  title: string;
  time: string;
  description?: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (id: string) => void;
  eventToEdit?: CalendarEvent | null;
  selectedDate: Date | null;
}

const mockTurmas = ['Turma Beginner 1', 'Particular - Camila', 'Turma Advanced', 'Particular - Marcos', 'Turma Intermediate'];

const EventModal: React.FC<EventModalProps> = ({ 
  isOpen, onClose, onSave, onDelete, eventToEdit, selectedDate 
}) => {
  const [type, setType] = useState<EventType>('aula');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('14:00');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (eventToEdit) {
      setType(eventToEdit.type);
      setTitle(eventToEdit.title);
      setTime(eventToEdit.time);
      setDescription(eventToEdit.description || '');
    } else {
      setType('aula');
      setTitle('');
      setTime('14:00');
      setDescription('');
    }
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title && type !== 'aula') return; // Basic validation
    if (type === 'aula' && !title) {
      alert("Por favor selecione uma turma.");
      return;
    }

    onSave({
      date: eventToEdit ? eventToEdit.date : (selectedDate || new Date()),
      type,
      title,
      time,
      description
    });
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h3>{eventToEdit ? 'Editar Evento' : 'Novo Evento'}</h3>
          <button onClick={onClose}><X size={24} /></button>
        </ModalHeader>

        <FormGroup>
          <label>Tipo de Evento</label>
          <select value={type} onChange={e => setType(e.target.value as EventType)}>
            <option value="aula">Aula com Turma</option>
            <option value="reuniao">Reunião</option>
            <option value="pessoal">Trabalho / Pessoal</option>
          </select>
        </FormGroup>

        {type === 'aula' ? (
          <FormGroup>
            <label>Turma / Aluno</label>
            <select value={title} onChange={e => setTitle(e.target.value)}>
              <option value="" disabled>Selecione uma turma...</option>
              {mockTurmas.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </FormGroup>
        ) : (
          <FormGroup>
            <label>Título</label>
            <input 
              type="text" 
              placeholder="Ex: Reunião Pedagógica"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </FormGroup>
        )}

        <FormGroup>
          <label>Horário</label>
          <input 
            type="time" 
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>Descrição (opcional)</label>
          <textarea 
            placeholder="Detalhes ou anotações..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>

        <ButtonGroup>
          {eventToEdit && onDelete && (
            <ModalButton $variant="danger" onClick={() => { onDelete(eventToEdit.id); onClose(); }} style={{ marginRight: 'auto' }}>
              Excluir
            </ModalButton>
          )}
          <ModalButton $variant="secondary" onClick={onClose}>
            Cancelar
          </ModalButton>
          <ModalButton $variant="primary" onClick={handleSave}>
            Salvar
          </ModalButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
