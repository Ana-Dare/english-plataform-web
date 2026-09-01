import React, { useState, useEffect } from "react";
import { X, User, Calendar, Clock, Video, StickyNote } from "lucide-react";
import { format } from "date-fns";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HeaderSave,
  ModalScroll,
  FormGroup,
  FieldError,
  FieldIconWrap,
  TimeRow,
  SegmentGroup,
  SegmentBtn,
  ToggleRow,
  ToggleCopy,
  Switch,
  RepeatCard,
  WeekdayRow,
  WeekdayBtn,
  ButtonGroup,
  ModalButton,
} from "./style";
import CustomSelect from "./CustomSelect";
import useToast from "../../../contexts/Toast/useToast";

export type EventType = "aula" | "reuniao" | "pessoal";
export type ClassMode = "individual" | "grupo";

export interface CalendarEvent {
  id: string;
  date: Date;
  type: EventType;
  title: string;
  time: string;
  description?: string;
  endTime?: string;
  classMode?: ClassMode;
  meetLink?: string;
  generateMeet?: boolean;
  repeat?: boolean;
  weekdays?: number[];
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onDelete?: (id: string) => void;
  eventToEdit?: CalendarEvent | null;
  selectedDate: Date | null;
}

const mockTurmas = [
  "Turma Beginner 1",
  "Particular - Camila",
  "Turma Advanced",
  "Particular - Marcos",
  "Turma Intermediate",
];

const WEEKDAYS = [
  { id: 1, label: "S" },
  { id: 2, label: "T" },
  { id: 3, label: "Q" },
  { id: 4, label: "Q" },
  { id: 5, label: "S" },
  { id: 6, label: "S" },
  { id: 0, label: "D" },
];

type FieldKey = "title" | "date" | "time" | "endTime" | "meetLink" | "weekdays";

const addHour = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return "15:00";
  const next = (h + 1) % 24;
  return `${String(next).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const isEndAfterStart = (start: string, end: string) => {
  if (!start || !end) return false;
  return end > start;
};

const randomMeetLink = () => {
  const chunk = () => Math.random().toString(36).slice(2, 6);
  return `https://meet.google.com/${chunk()}-${chunk()}-${chunk()}`;
};

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  eventToEdit,
  selectedDate,
}) => {
  const { addToast } = useToast();
  const [type, setType] = useState<EventType>("aula");
  const [title, setTitle] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [time, setTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");
  const [classMode, setClassMode] = useState<ClassMode>("individual");
  const [meetLink, setMeetLink] = useState("");
  const [generateMeet, setGenerateMeet] = useState(true);
  const [repeat, setRepeat] = useState(false);
  const [weekdays, setWeekdays] = useState<number[]>([1, 3]);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  useEffect(() => {
    if (!isOpen) return;

    const fallbackDate = selectedDate || new Date();
    if (eventToEdit) {
      setType(eventToEdit.type);
      setTitle(eventToEdit.title);
      setDateStr(format(eventToEdit.date, "yyyy-MM-dd"));
      setTime(eventToEdit.time || "09:00");
      setEndTime(eventToEdit.endTime || addHour(eventToEdit.time || "09:00"));
      setDescription(eventToEdit.description || "");
      setClassMode(eventToEdit.classMode || "individual");
      setMeetLink(eventToEdit.meetLink || "");
      setGenerateMeet(eventToEdit.generateMeet ?? !eventToEdit.meetLink);
      setRepeat(eventToEdit.repeat || false);
      setWeekdays(eventToEdit.weekdays?.length ? eventToEdit.weekdays : [1, 3]);
    } else {
      setType("aula");
      setTitle("");
      setDateStr(format(fallbackDate, "yyyy-MM-dd"));
      setTime("09:00");
      setEndTime("10:00");
      setDescription("");
      setClassMode("individual");
      setMeetLink("");
      setGenerateMeet(true);
      setRepeat(false);
      setWeekdays([1, 3]);
    }
    setErrors({});
  }, [eventToEdit, isOpen, selectedDate]);

  if (!isOpen) return null;

  const clearError = (key: FieldKey) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleWeekday = (id: number) => {
    clearError("weekdays");
    setWeekdays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};

    if (!title.trim()) {
      next.title =
        type === "aula" ? "Selecione a turma ou o aluno." : "Informe o título.";
    }
    if (!dateStr) next.date = "Informe a data.";
    if (!time) next.time = "Informe o horário de início.";
    if (!endTime) next.endTime = "Informe o horário de término.";
    else if (time && !isEndAfterStart(time, endTime)) {
      next.endTime = "O término deve ser depois do início.";
    }
    if (type === "aula" && !generateMeet && !meetLink.trim()) {
      next.meetLink = "Informe o link ou ative a geração automática.";
    }
    if (type === "aula" && !generateMeet && meetLink.trim()) {
      try {
        const url = meetLink.startsWith("http")
          ? meetLink
          : `https://${meetLink}`;
        new URL(url);
      } catch {
        next.meetLink = "Link inválido.";
      }
    }
    if (type === "aula" && repeat && weekdays.length === 0) {
      next.weekdays = "Selecione pelo menos um dia.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      addToast("Preencha os campos obrigatórios corretamente.", "warning");
      return;
    }

    const [y, mo, d] = dateStr.split("-").map(Number);
    const eventDate = new Date(y, mo - 1, d);
    const finalLink =
      type === "aula"
        ? generateMeet
          ? randomMeetLink()
          : meetLink.trim()
        : undefined;

    onSave({
      date: eventDate,
      type,
      title: title.trim(),
      time,
      endTime,
      description: description.trim() || undefined,
      classMode: type === "aula" ? classMode : undefined,
      meetLink: finalLink,
      generateMeet: type === "aula" ? generateMeet : undefined,
      repeat: type === "aula" ? repeat : undefined,
      weekdays: type === "aula" && repeat ? weekdays : undefined,
    });
    onClose();
  };

  const isAula = type === "aula";

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <button
            className="close-btn"
            type="button"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
          <h3>
            {eventToEdit
              ? "Editar Evento"
              : isAula
                ? "Nova Aula"
                : "Novo Evento"}
          </h3>
          <HeaderSave type="button" onClick={handleSave}>
            Salvar
          </HeaderSave>
        </ModalHeader>

        <ModalScroll>
          <FormGroup>
            <label>
              Tipo de Evento <span>*</span>
            </label>
            <CustomSelect
              value={type}
              onChange={(val) => {
                setType(val as EventType);
                setTitle("");
                clearError("title");
              }}
              options={[
                { value: "aula", label: "Aula com Turma" },
                { value: "reuniao", label: "Reunião" },
                { value: "pessoal", label: "Trabalho / Pessoal" },
              ]}
            />
          </FormGroup>

          {isAula ? (
            <FormGroup $error={!!errors.title}>
              <label>
                Aluno / Turma <span>*</span>
              </label>
              <CustomSelect
                value={title}
                error={!!errors.title}
                icon={<User size={16} />}
                onChange={(val) => {
                  clearError("title");
                  setTitle(val);
                }}
                options={mockTurmas.map((t) => ({ value: t, label: t }))}
                placeholder="Selecione uma turma..."
              />
              {errors.title && <FieldError>{errors.title}</FieldError>}
            </FormGroup>
          ) : (
            <FormGroup $error={!!errors.title}>
              <label>
                Título <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Reunião Pedagógica"
                value={title}
                onChange={(e) => {
                  clearError("title");
                  setTitle(e.target.value);
                }}
              />
              {errors.title && <FieldError>{errors.title}</FieldError>}
            </FormGroup>
          )}

          <FormGroup $error={!!errors.date}>
            <label>
              Data <span>*</span>
            </label>
            <FieldIconWrap>
              <Calendar size={16} />
              <input
                type="date"
                value={dateStr}
                onChange={(e) => {
                  clearError("date");
                  setDateStr(e.target.value);
                }}
              />
            </FieldIconWrap>
            {errors.date && <FieldError>{errors.date}</FieldError>}
          </FormGroup>

          <TimeRow>
            <FormGroup $error={!!errors.time}>
              <label>
                Início <span>*</span>
              </label>
              <FieldIconWrap>
                <Clock size={16} />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => {
                    clearError("time");
                    clearError("endTime");
                    const next = e.target.value;
                    setTime(next);
                    if (!endTime || !isEndAfterStart(next, endTime)) {
                      setEndTime(addHour(next));
                    }
                  }}
                />
              </FieldIconWrap>
              {errors.time && <FieldError>{errors.time}</FieldError>}
            </FormGroup>
            <FormGroup $error={!!errors.endTime}>
              <label>
                Término <span>*</span>
              </label>
              <FieldIconWrap>
                <Clock size={16} />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    clearError("endTime");
                    setEndTime(e.target.value);
                  }}
                />
              </FieldIconWrap>
              {errors.endTime && <FieldError>{errors.endTime}</FieldError>}
            </FormGroup>
          </TimeRow>

          {isAula && (
            <>
              <FormGroup>
                <label>
                  Tipo de Aula <span>*</span>
                </label>
                <SegmentGroup>
                  <SegmentBtn
                    type="button"
                    $active={classMode === "individual"}
                    onClick={() => setClassMode("individual")}
                  >
                    Individual
                  </SegmentBtn>
                  <SegmentBtn
                    type="button"
                    $active={classMode === "grupo"}
                    onClick={() => setClassMode("grupo")}
                  >
                    Grupo
                  </SegmentBtn>
                </SegmentGroup>
              </FormGroup>

              <FormGroup $error={!!errors.meetLink}>
                <label>Link {generateMeet ? "" : <span>*</span>}</label>
                <FieldIconWrap>
                  <Video size={16} />
                  <input
                    type="text"
                    placeholder="meet.google.com/abc-defg-hij"
                    value={
                      generateMeet
                        ? "Gerado automaticamente no agendamento"
                        : meetLink
                    }
                    disabled={generateMeet}
                    onChange={(e) => {
                      clearError("meetLink");
                      setMeetLink(e.target.value);
                    }}
                  />
                </FieldIconWrap>
                {errors.meetLink && <FieldError>{errors.meetLink}</FieldError>}
              </FormGroup>

              <ToggleRow>
                <ToggleCopy>
                  <strong>Gerar Link Meet</strong>
                  <span>Gerar link automaticamente no agendamento</span>
                </ToggleCopy>
                <Switch
                  type="button"
                  $on={generateMeet}
                  aria-label="Gerar link Meet"
                  onClick={() => {
                    setGenerateMeet((v) => !v);
                    clearError("meetLink");
                  }}
                />
              </ToggleRow>

              <RepeatCard>
                <ToggleRow>
                  <ToggleCopy>
                    <strong>Repetir Aula (Recorrência)</strong>
                    <span>Repetir nos dias selecionados</span>
                  </ToggleCopy>
                  <Switch
                    type="button"
                    $on={repeat}
                    aria-label="Repetir aula"
                    onClick={() => {
                      setRepeat((v) => !v);
                      clearError("weekdays");
                    }}
                  />
                </ToggleRow>
                {repeat && (
                  <>
                    <WeekdayRow>
                      {WEEKDAYS.map((day, idx) => (
                        <WeekdayBtn
                          key={`${day.id}-${idx}`}
                          type="button"
                          $active={weekdays.includes(day.id)}
                          onClick={() => toggleWeekday(day.id)}
                          aria-label={
                            [
                              "Domingo",
                              "Segunda",
                              "Terça",
                              "Quarta",
                              "Quinta",
                              "Sexta",
                              "Sábado",
                            ][day.id]
                          }
                        >
                          {day.label}
                        </WeekdayBtn>
                      ))}
                    </WeekdayRow>
                    {errors.weekdays && (
                      <FieldError>{errors.weekdays}</FieldError>
                    )}
                  </>
                )}
              </RepeatCard>
            </>
          )}

          <FormGroup>
            <label>Observações (opcional)</label>
            <FieldIconWrap $alignTop>
              <StickyNote size={16} />
              <textarea
                placeholder="Adicione notas ou recados importantes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FieldIconWrap>
          </FormGroup>
        </ModalScroll>

        <ButtonGroup>
          {eventToEdit && onDelete && (
            <ModalButton
              $variant="danger"
              type="button"
              onClick={() => {
                onDelete(eventToEdit.id);
                onClose();
              }}
            >
              Excluir
            </ModalButton>
          )}
          <ModalButton $variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </ModalButton>
          <ModalButton
            className="desktop-save"
            $variant="primary"
            type="button"
            onClick={handleSave}
          >
            Salvar
          </ModalButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
