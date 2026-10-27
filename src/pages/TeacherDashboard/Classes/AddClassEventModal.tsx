import React, { useState } from "react";
import { X, BookOpen, CalendarCheck } from "lucide-react";
import { format, startOfDay } from "date-fns";
import ModernDatePicker from "../../../components/ModernDatePicker";
import ModernTimePicker from "../../../components/ModernTimePicker";
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
  ToggleRow,
  ToggleCopy,
  Switch,
  ButtonGroup,
  ModalButton,
} from "../Agenda/style";
import useToast from "../../../contexts/Toast/useToast";

export interface ClassEventData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  syncAgenda: boolean;
}

interface AddClassEventModalProps {
  onClose: () => void;
  onSave: (data: ClassEventData) => void;
}

const addHour = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return "15:00";
  const next = (h + 1) % 24;
  return `${String(next).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const getNextQuarterTime = (d = new Date()) => {
  const currentMinutes = d.getMinutes();
  const roundedMinutes = Math.ceil(currentMinutes / 5) * 5;
  const newDate = new Date(d);
  newDate.setMinutes(roundedMinutes, 0, 0);
  return format(newDate, "HH:mm");
};

const isEndAfterStart = (start: string, end: string) => {
  if (!start || !end) return false;
  return end > start;
};

const AddClassEventModal: React.FC<AddClassEventModalProps> = ({
  onClose,
  onSave,
}) => {
  const { addToast } = useToast();
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const nowHHMM = format(new Date(), "HH:mm");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(todayStr);
  const [startTime, setStartTime] = useState(() => {
    return nowHHMM > "14:00" ? getNextQuarterTime() : "14:00";
  });
  const [endTime, setEndTime] = useState(() => {
    const initStart = nowHHMM > "14:00" ? getNextQuarterTime() : "14:00";
    return addHour(initStart);
  });
  const [syncAgenda, setSyncAgenda] = useState(true);

  const isToday = date === todayStr;
  const currentNowHHMM = format(new Date(), "HH:mm");
  const minStartTime = isToday ? currentNowHHMM : undefined;
  const minEndTime = isToday && (!startTime || startTime < currentNowHHMM) ? currentNowHHMM : startTime;

  const [errors, setErrors] = useState<{
    title?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
  }>({});

  const clearError = (field: keyof typeof errors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next: typeof errors = {};
    const currentCheckHHMM = format(new Date(), "HH:mm");

    if (!title.trim()) {
      next.title = "Informe o título da aula.";
    }

    if (!date) {
      next.date = "Informe a data da aula.";
    } else if (date < todayStr) {
      next.date = "Não é permitido selecionar datas passadas para a aula.";
    }

    if (!startTime) {
      next.startTime = "Informe o horário de início.";
    } else if (date === todayStr && startTime < currentCheckHHMM) {
      next.startTime = "Não é permitido selecionar um horário que já passou hoje.";
    }

    if (!endTime) {
      next.endTime = "Informe o horário de término.";
    } else if (date === todayStr && endTime <= currentCheckHHMM) {
      next.endTime = "Não é permitido selecionar um horário que já passou hoje.";
    } else if (startTime && !isEndAfterStart(startTime, endTime)) {
      next.endTime = "O horário de término deve ser após o início.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      addToast(
        "Por favor, preencha os campos obrigatórios corretamente.",
        "warning",
      );
      return;
    }

    onSave({
      title: title.trim(),
      date,
      startTime,
      endTime,
      syncAgenda,
    });
  };

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
          <h3>Nova Aula da Turma</h3>
          <HeaderSave type="button" onClick={handleSave}>
            Salvar
          </HeaderSave>
        </ModalHeader>

        <ModalScroll>
          {/* Título da Aula */}
          <FormGroup $error={!!errors.title}>
            <label>
              Título da Aula <span>*</span>
            </label>
            <FieldIconWrap>
              <BookOpen size={16} />
              <input
                type="text"
                placeholder="Ex: Aula 03 - Phrasal Verbs"
                value={title}
                onChange={(e) => {
                  clearError("title");
                  setTitle(e.target.value);
                }}
                autoFocus
              />
            </FieldIconWrap>
            {errors.title && <FieldError>{errors.title}</FieldError>}
          </FormGroup>

          {/* Data da Aula com ModernDatePicker e bloqueio de dias passados */}
          <FormGroup $error={!!errors.date}>
            <label>
              Data da Aula <span>*</span>
            </label>
            <ModernDatePicker
              value={date}
              placeholder="Selecione a data da aula"
              minDate={startOfDay(new Date())}
              error={!!errors.date}
              showYearSelector={false}
              onChange={(val) => {
                clearError("date");
                setDate(val);
                if (val === todayStr) {
                  const checkNow = format(new Date(), "HH:mm");
                  if (startTime < checkNow) {
                    const newStart = getNextQuarterTime();
                    setStartTime(newStart);
                    setEndTime(addHour(newStart));
                  }
                }
              }}
            />
            {errors.date && <FieldError>{errors.date}</FieldError>}
          </FormGroup>

          {/* Horários Início e Término */}
          <TimeRow>
            <FormGroup $error={!!errors.startTime}>
              <label>
                Início <span>*</span>
              </label>
              <ModernTimePicker
                value={startTime}
                error={!!errors.startTime}
                minTime={minStartTime}
                onChange={(nextStart) => {
                  clearError("startTime");
                  clearError("endTime");
                  setStartTime(nextStart);
                  if (!endTime || !isEndAfterStart(nextStart, endTime)) {
                    setEndTime(addHour(nextStart));
                  }
                }}
              />
              {errors.startTime && <FieldError>{errors.startTime}</FieldError>}
            </FormGroup>

            <FormGroup $error={!!errors.endTime}>
              <label>
                Término <span>*</span>
              </label>
              <ModernTimePicker
                value={endTime}
                error={!!errors.endTime}
                minTime={minEndTime}
                onChange={(nextEnd) => {
                  clearError("endTime");
                  setEndTime(nextEnd);
                }}
              />
              {errors.endTime && <FieldError>{errors.endTime}</FieldError>}
            </FormGroup>
          </TimeRow>

          {/* Sincronização com a Agenda Principal */}
          <ToggleRow>
            <ToggleCopy>
              <div className="toggle-icon">
                <CalendarCheck size={18} />
              </div>
              <div className="text-area">
                <strong>Sincronizar com a Agenda</strong>
                <span>Adicionar esta aula automaticamente à minha agenda</span>
              </div>
            </ToggleCopy>
            <Switch
              type="button"
              $on={syncAgenda}
              aria-label="Sincronizar com a Agenda"
              onClick={() => setSyncAgenda((v) => !v)}
            />
          </ToggleRow>
        </ModalScroll>

        <ButtonGroup>
          <ModalButton $variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </ModalButton>
          <ModalButton
            className="desktop-save"
            $variant="primary"
            type="button"
            onClick={handleSave}
          >
            Agendar Aula
          </ModalButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddClassEventModal;
