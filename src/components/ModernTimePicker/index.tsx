import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Clock, ChevronDown, Check } from "lucide-react";

export interface ModernTimePickerProps {
  value: string; // "HH:mm"
  onChange: (timeStr: string) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  minTime?: string; // "HH:mm"
  maxTime?: string; // "HH:mm"
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  font-family: "Rubik", sans-serif;
`;

const Trigger = styled.button<{
  $isOpen: boolean;
  $error?: boolean;
  $disabled?: boolean;
}>`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.62rem 0.85rem;
  background: ${({ $disabled }) => ($disabled ? "#f4f4f5" : "#ffffff")};
  border: 1.5px solid
    ${({ $error, $isOpen }) =>
      $error ? "#d93025" : $isOpen ? "#1F2B45" : "#8d8d8d"};
  border-radius: 12px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.2s ease;
  user-select: none;
  font-family: "Rubik", sans-serif;
  text-align: left;
  box-shadow: ${({ $isOpen, $error }) =>
    $isOpen
      ? $error
        ? "0 0 0 3px rgba(217, 48, 37, 0.12)"
        : "0 0 0 3px rgba(31, 43, 69, 0.12)"
      : "none"};

  &:hover:not(:disabled) {
    border-color: ${({ $error }) => ($error ? "#d93025" : "#1F2B45")};
  }

  .trigger-left {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-width: 0;
    flex: 1;

    svg {
      color: ${({ $isOpen }) => ($isOpen ? "#1F2B45" : "#6b6b6b")};
      flex-shrink: 0;
    }

    span.value-text {
      color: #1F2B45;
      font-size: 0.9rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span.placeholder-text {
      color: #888;
      font-size: 0.9rem;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .trigger-right {
    display: flex;
    align-items: center;
    color: #94a3b8;
    flex-shrink: 0;
  }
`;

const Popover = styled.div`
  position: fixed;
  z-index: 9999;
  width: 220px;
  background: #ffffff;
  border: 1.5px solid #d4dbe6;
  border-radius: 16px;
  box-shadow:
    0 12px 32px rgba(31, 43, 69, 0.18),
    0 2px 8px rgba(31, 43, 69, 0.08);
  padding: 0.65rem;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
`;

const ColumnsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
  padding-bottom: 0.4rem;
  margin-bottom: 0.4rem;
  border-bottom: 1px solid #eef2f6;
  text-align: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ColumnsBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
`;

const ScrollColumn = styled.div`
  max-height: 184px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const OptionItem = styled.button<{ $active: boolean }>`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 0.42rem 0.5rem;
  font-size: 0.875rem;
  font-family: "Rubik", sans-serif;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  background: ${({ $active }) => ($active ? "#1F2B45" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#334155")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? "#1F2B45" : "#f1f5f9")};
    color: ${({ $active }) => ($active ? "#ffffff" : "#1F2B45")};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: transparent !important;
    color: #94a3b8 !important;
  }
`;

const FooterRow = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.45rem;
  border-top: 1px solid #eef2f6;
  display: flex;
  justify-content: flex-end;
`;

const ConfirmBtn = styled.button`
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 0.42rem 0.75rem;
  font-size: 0.8125rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  background: #1f2b45;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: background 0.18s ease;

  &:hover {
    background: #151d2f;
  }
`;

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const BASE_MINUTES = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

export const ModernTimePicker: React.FC<ModernTimePickerProps> = ({
  value,
  onChange,
  placeholder = "00:00",
  error = false,
  disabled = false,
  minTime,
  maxTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hourColRef = useRef<HTMLDivElement>(null);
  const minColRef = useRef<HTMLDivElement>(null);

  const [rawHour = "14", rawMin = "00"] = (value || "14:00").split(":");
  const selectedHour = HOURS.includes(rawHour) ? rawHour : "14";
  const selectedMin = /^\d{2}$/.test(rawMin) ? rawMin : "00";

  const minutesList = BASE_MINUTES.includes(selectedMin)
    ? BASE_MINUTES
    : [...BASE_MINUTES, selectedMin].sort();

  const isHourDisabled = (h: string) => {
    const hNum = Number(h);
    if (minTime) {
      const [minH, minM] = minTime.split(":").map(Number);
      if (hNum < minH) return true;
      if (hNum === minH && minM > 55) return true;
    }
    if (maxTime) {
      const [maxH] = maxTime.split(":").map(Number);
      if (hNum > maxH) return true;
    }
    return false;
  };

  const isMinuteDisabled = (m: string) => {
    const mNum = Number(m);
    const hNum = Number(selectedHour);
    if (minTime) {
      const [minH, minM] = minTime.split(":").map(Number);
      if (hNum < minH) return true;
      if (hNum === minH && mNum < minM) return true;
    }
    if (maxTime) {
      const [maxH, maxM] = maxTime.split(":").map(Number);
      if (hNum > maxH) return true;
      if (hNum === maxH && mNum > maxM) return true;
    }
    return false;
  };

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const popW = 220;
    const popH = 280;

    const next: React.CSSProperties = {};

    if (rect.bottom + popH + 8 > viewportH && rect.top > popH) {
      next.bottom = viewportH - rect.top + 6;
    } else {
      next.top = Math.min(rect.bottom + 6, Math.max(8, viewportH - popH - 8));
    }

    if (rect.left + popW > viewportW - 8) {
      next.left = Math.max(8, viewportW - popW - 8);
    } else {
      next.left = Math.max(8, rect.left);
    }

    setPopoverStyle(next);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      const activeHourEl = hourColRef.current?.querySelector(
        '[data-active="true"]',
      ) as HTMLElement | null;
      if (activeHourEl && hourColRef.current) {
        hourColRef.current.scrollTop =
          activeHourEl.offsetTop - hourColRef.current.clientHeight / 2 + 18;
      }
      const activeMinEl = minColRef.current?.querySelector(
        '[data-active="true"]',
      ) as HTMLElement | null;
      if (activeMinEl && minColRef.current) {
        minColRef.current.scrollTop =
          activeMinEl.offsetTop - minColRef.current.clientHeight / 2 + 18;
      }
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        (!popoverRef.current || !popoverRef.current.contains(target))
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectHour = (h: string) => {
    if (isHourDisabled(h)) return;
    let nextMin = selectedMin;
    if (minTime) {
      const [minH, minM] = minTime.split(":").map(Number);
      if (Number(h) === minH && Number(nextMin) < minM) {
        const validMin = minutesList.find((minStr) => Number(minStr) >= minM);
        nextMin = validMin || String(minM).padStart(2, "0");
      }
    }
    onChange(`${h}:${nextMin}`);
  };

  const handleSelectMinute = (m: string) => {
    if (isMinuteDisabled(m)) return;
    onChange(`${selectedHour}:${m}`);
  };

  return (
    <Wrapper>
      <Trigger
        ref={triggerRef}
        type="button"
        $isOpen={isOpen}
        $error={error}
        $disabled={disabled}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            if (!isOpen) updatePosition();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <div className="trigger-left">
          <Clock size={16} />
          {value ? (
            <span className="value-text">{value}</span>
          ) : (
            <span className="placeholder-text">{placeholder}</span>
          )}
        </div>
        <div className="trigger-right">
          <ChevronDown
            size={15}
            style={{
              transform: isOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          />
        </div>
      </Trigger>

      {isOpen &&
        !disabled &&
        typeof document !== "undefined" &&
        createPortal(
          <Popover
            ref={popoverRef}
            style={popoverStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <ColumnsHeader>
              <span>Hora</span>
              <span>Min</span>
            </ColumnsHeader>
            <ColumnsBody>
              <ScrollColumn ref={hourColRef}>
                {HOURS.map((h) => {
                  const active = h === selectedHour;
                  const itemDisabled = isHourDisabled(h);
                  return (
                    <OptionItem
                      key={h}
                      type="button"
                      data-active={active}
                      $active={active}
                      disabled={itemDisabled}
                      onClick={() => handleSelectHour(h)}
                    >
                      {h}h
                    </OptionItem>
                  );
                })}
              </ScrollColumn>
              <ScrollColumn ref={minColRef}>
                {minutesList.map((m) => {
                  const active = m === selectedMin;
                  const itemDisabled = isMinuteDisabled(m);
                  return (
                    <OptionItem
                      key={m}
                      type="button"
                      data-active={active}
                      $active={active}
                      disabled={itemDisabled}
                      onClick={() => handleSelectMinute(m)}
                    >
                      {m}m
                    </OptionItem>
                  );
                })}
              </ScrollColumn>
            </ColumnsBody>
            <FooterRow>
              <ConfirmBtn type="button" onClick={() => setIsOpen(false)}>
                <Check size={14} /> Confirmar
              </ConfirmBtn>
            </FooterRow>
          </Popover>,
          document.body,
        )}
    </Wrapper>
  );
};

export default ModernTimePicker;
