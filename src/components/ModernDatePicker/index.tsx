import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import {
  format,
  parse,
  isValid,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  startOfDay,
  endOfDay,
  setYear,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  DatePickerWrapper,
  DateInputTrigger,
  DateNativeInput,
  CalendarIconButton,
  PopoverCalendar,
  CalendarHeader,
  MonthTitle,
  YearSelectorBtn,
  YearPickerHeader,
  YearPickerBackBtn,
  YearGridContainer,
  YearCard,
  NavButton,
  WeekdaysRow,
  WeekdayLabel,
  DaysGrid,
  DayButton,
  CalendarFooter,
  FooterActionBtn,
} from "./style";

export interface ModernDatePickerProps {
  value: string; // "yyyy-MM-dd"
  onChange: (dateStr: string) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  showYearSelector?: boolean;
  placement?: "auto" | "top" | "bottom";
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const formatDateMask = (val: string): string => {
  const digits = val.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export const ModernDatePicker: React.FC<ModernDatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "DD/MM/AAAA",
  error = false,
  disabled = false,
  allowClear = false,
  showYearSelector = true,
  placement = "auto",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"days" | "years">("days");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);
  const [computedPlacement, setComputedPlacement] = useState<"top" | "bottom">("bottom");

  // Reset viewMode to days when popover closes
  useEffect(() => {
    if (!isOpen) {
      setViewMode("days");
    }
  }, [isOpen]);

  // Scroll active year card into center view when opening year picker
  useEffect(() => {
    if (viewMode === "years" && yearListRef.current) {
      const activeEl = yearListRef.current.querySelector<HTMLElement>('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "center", behavior: "auto" });
      }
    }
  }, [viewMode]);

  // Determine popover placement based on space
  useEffect(() => {
    if (isOpen && containerRef.current) {
      if (placement === "top") {
        setComputedPlacement("top");
      } else if (placement === "bottom") {
        setComputedPlacement("bottom");
      } else {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 380 && rect.top > 380) {
          setComputedPlacement("top");
        } else {
          setComputedPlacement("bottom");
        }
      }
    }
  }, [isOpen, placement]);

  // Parse initial date from value or fallback to today
  const parsedValue = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
  const validValueDate = parsedValue && isValid(parsedValue) ? parsedValue : null;

  const [typedText, setTypedText] = useState<string>(() => {
    if (validValueDate) return format(validValueDate, "dd/MM/yyyy");
    return "";
  });

  const [viewDate, setViewDate] = useState<Date>(() => {
    if (validValueDate) return validValueDate;
    if (minDate && minDate > new Date()) return minDate;
    return new Date();
  });

  // Sync viewDate and typedText when value changes externally
  useEffect(() => {
    if (value) {
      const parsed = parse(value, "yyyy-MM-dd", new Date());
      if (isValid(parsed)) {
        setTypedText(format(parsed, "dd/MM/yyyy"));
        setViewDate(parsed);
      }
    } else {
      setTypedText("");
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(ev.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatDateMask(raw);
    setTypedText(formatted);

    const digits = formatted.replace(/\D/g, "");
    if (digits.length === 8) {
      const d = parseInt(digits.slice(0, 2), 10);
      const m = parseInt(digits.slice(2, 4), 10);
      const y = parseInt(digits.slice(4, 8), 10);

      if (m >= 1 && m <= 12 && y >= 1900 && y <= 2100) {
        const isoString = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const parsed = parse(isoString, "yyyy-MM-dd", new Date());
        if (
          isValid(parsed) &&
          parsed.getDate() === d &&
          parsed.getMonth() + 1 === m
        ) {
          onChange(isoString);
          setViewDate(parsed);
          return;
        }
      }
    }

    if (digits.length === 0) {
      onChange("");
    }
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate((prev) => addMonths(prev, 1));
  };

  const handleSelectDate = (date: Date) => {
    const formattedIso = format(date, "yyyy-MM-dd");
    const formattedDisplay = format(date, "dd/MM/yyyy");
    setTypedText(formattedDisplay);
    onChange(formattedIso);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTypedText("");
    onChange("");
  };

  const handleSelectToday = () => {
    const today = new Date();
    if (minDate && startOfDay(today) < startOfDay(minDate)) return;
    if (maxDate && endOfDay(today) > endOfDay(maxDate)) return;
    handleSelectDate(today);
  };

  // Generate calendar days
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: ptBR });
  const endDate = endOfWeek(monthEnd, { locale: ptBR });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Year choices for quick selection (e.g., student birthdates or future events)
  const currentYear = viewDate.getFullYear();
  const maxYear = maxDate ? maxDate.getFullYear() : currentYear + 10;
  const minYear = minDate ? minDate.getFullYear() : Math.min(currentYear - 70, maxYear - 80);
  const yearOptions = Array.from(
    { length: Math.max(1, maxYear - minYear + 1) },
    (_, i) => maxYear - i
  );

  return (
    <DatePickerWrapper ref={containerRef} $isOpen={isOpen}>
      <DateInputTrigger
        $isOpen={isOpen}
        $error={error}
        $disabled={disabled}
        onClick={(e) => {
          if (inputRef.current && e.target !== inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <div className="trigger-left">
          <Calendar size={18} />
          <DateNativeInput
            ref={inputRef}
            type="text"
            inputMode="numeric"
            placeholder={placeholder || "DD/MM/AAAA"}
            value={typedText}
            disabled={disabled}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsOpen(false);
            }}
          />
        </div>

        <div className="trigger-right">
          {allowClear && typedText && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              title="Limpar data"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                color: "#94a3b8",
                borderRadius: "4px",
              }}
            >
              <X size={15} />
            </button>
          )}

          <CalendarIconButton
            type="button"
            disabled={disabled}
            title={isOpen ? "Fechar calendário" : "Abrir calendário"}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) setIsOpen((prev) => !prev);
            }}
          >
            <ChevronDown
              size={16}
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </CalendarIconButton>
        </div>
      </DateInputTrigger>

      {isOpen && (
        <PopoverCalendar
          $placement={computedPlacement}
          onClick={(e) => e.stopPropagation()}
        >
          {viewMode === "years" ? (
            <>
              <YearPickerHeader>
                <span className="title">Selecione o Ano</span>
                <YearPickerBackBtn
                  type="button"
                  onClick={() => setViewMode("days")}
                  title="Voltar aos dias"
                >
                  <ChevronLeft size={14} />
                  Voltar aos dias
                </YearPickerBackBtn>
              </YearPickerHeader>

              <YearGridContainer ref={yearListRef}>
                {yearOptions.map((y) => {
                  const isSelected = y === currentYear;
                  return (
                    <YearCard
                      key={y}
                      type="button"
                      $isSelected={isSelected}
                      data-selected={isSelected}
                      onClick={() => {
                        setViewDate((prev) => setYear(prev, y));
                        setViewMode("days");
                      }}
                    >
                      {y}
                    </YearCard>
                  );
                })}
              </YearGridContainer>
            </>
          ) : (
            <>
              <CalendarHeader>
                <NavButton
                  type="button"
                  onClick={handlePrevMonth}
                  title="Mês anterior"
                >
                  <ChevronLeft size={16} />
                </NavButton>

                <MonthTitle>
                  <span className="month-name">
                    {format(viewDate, "MMMM", { locale: ptBR })}
                  </span>
                  {showYearSelector ? (
                    <YearSelectorBtn
                      type="button"
                      $isActive={false}
                      onClick={() => setViewMode("years")}
                      title="Clique para escolher o ano de nascimento"
                    >
                      <span>{currentYear}</span>
                      <ChevronDown size={14} />
                    </YearSelectorBtn>
                  ) : (
                    <span className="year">{format(viewDate, "yyyy")}</span>
                  )}
                </MonthTitle>

                <NavButton
                  type="button"
                  onClick={handleNextMonth}
                  title="Próximo mês"
                >
                  <ChevronRight size={16} />
                </NavButton>
              </CalendarHeader>

              <WeekdaysRow>
                {WEEKDAYS.map((w, idx) => (
                  <WeekdayLabel key={idx}>{w}</WeekdayLabel>
                ))}
              </WeekdaysRow>

              <DaysGrid>
                {days.map((day, idx) => {
                  const isSelected = validValueDate
                    ? isSameDay(day, validValueDate)
                    : false;
                  const isCurrent = isSameMonth(day, monthStart);
                  const todayFlag = isToday(day);

                  const isPastMin = minDate
                    ? startOfDay(day) < startOfDay(minDate)
                    : false;
                  const isFutureMax = maxDate
                    ? endOfDay(day) > endOfDay(maxDate)
                    : false;
                  const isDisabledDay = isPastMin || isFutureMax;

                  return (
                    <DayButton
                      key={idx}
                      type="button"
                      $isSelected={isSelected}
                      $isToday={todayFlag}
                      $isCurrentMonth={isCurrent}
                      $isDisabled={isDisabledDay}
                      disabled={isDisabledDay}
                      onClick={() => !isDisabledDay && handleSelectDate(day)}
                      title={
                        isDisabledDay
                          ? isPastMin
                            ? "Não permitido selecionar datas passadas"
                            : "Data não permitida"
                          : format(day, "dd/MM/yyyy")
                      }
                    >
                      {format(day, "d")}
                    </DayButton>
                  );
                })}
              </DaysGrid>
            </>
          )}

          <CalendarFooter>
            <FooterActionBtn type="button" onClick={() => setIsOpen(false)}>
              Fechar
            </FooterActionBtn>
            <FooterActionBtn
              type="button"
              $primary
              onClick={() => {
                handleSelectToday();
                setViewMode("days");
              }}
              disabled={
                Boolean(
                  (minDate && startOfDay(new Date()) < startOfDay(minDate)) ||
                    (maxDate && endOfDay(new Date()) > endOfDay(maxDate)),
                )
              }
            >
              Hoje
            </FooterActionBtn>
          </CalendarFooter>
        </PopoverCalendar>
      )}
    </DatePickerWrapper>
  );
};

export default ModernDatePicker;
