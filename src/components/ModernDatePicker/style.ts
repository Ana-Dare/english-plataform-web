import styled, { css } from "styled-components";

export const DatePickerWrapper = styled.div<{ $isOpen?: boolean }>`
  position: relative;
  width: 100%;
  font-family: "Rubik", sans-serif;
  z-index: ${({ $isOpen }) => ($isOpen ? 60 : 1)};
`;

export const DateInputTrigger = styled.div<{ $isOpen: boolean; $error?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  height: 44px;
  box-sizing: border-box;
  padding: 0 8px 0 14px;
  background: ${({ $isOpen }) => ($isOpen ? "#ffffff" : "#f8fafc")};
  border: 1.5px solid ${({ $error, $isOpen }) =>
    $error ? "#ef4444" : $isOpen ? "#c57a67" : "#e2e8f0"};
  border-radius: 10px;
  cursor: text;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.2s ease;
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? "0 0 0 4px rgba(197, 122, 103, 0.1)" : "none"};

  &:focus-within {
    background: #ffffff;
    border-color: #c57a67;
    box-shadow: 0 0 0 4px rgba(197, 122, 103, 0.1);
  }

  &:hover:not(:focus-within) {
    border-color: ${({ $error, $disabled }) =>
      $disabled ? undefined : $error ? "#ef4444" : "#cbd5e1"};
  }

  .trigger-left {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    min-width: 0;
    flex: 1;
    height: 100%;

    svg {
      color: ${({ $isOpen }) => ($isOpen ? "#c57a67" : "#64748b")};
      flex-shrink: 0;
      transition: color 0.2s ease;
    }
  }

  .trigger-right {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #94a3b8;
    flex-shrink: 0;
  }
`;

export const DateNativeInput = styled.input`
  border: none !important;
  background: transparent !important;
  outline: none !important;
  font-family: "Rubik", sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  color: #1e293b !important;
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  box-shadow: none !important;

  &::placeholder {
    color: #94a3b8 !important;
    font-weight: 400 !important;
  }

  &:disabled {
    cursor: not-allowed !important;
  }
`;

export const CalendarIconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    color: #c57a67;
    background: rgba(197, 122, 103, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PopoverCalendar = styled.div<{ $placement?: "bottom" | "top" }>`
  position: absolute;
  ${({ $placement }) =>
    $placement === "top"
      ? "bottom: calc(100% + 8px);"
      : "top: calc(100% + 8px);"}
  left: 0;
  z-index: 99999;
  width: 310px;
  max-width: calc(100vw - 32px);
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(31, 43, 69, 0.18), 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  box-sizing: border-box;
  animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes popoverFadeIn {
    from {
      opacity: 0;
      transform: translateY(${({ $placement }) => ($placement === "top" ? "6px" : "-6px")}) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 520px) {
    width: 290px;
    max-width: calc(100vw - 32px);
    padding: 0.75rem;
    left: auto;
    right: 0;
  }

  @media (max-width: 360px) {
    width: 260px;
    padding: 0.6rem;
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
`;

export const MonthTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: #1F2B45;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  gap: 0.45rem;

  .month-name {
    color: #1F2B45;
    font-weight: 700;
  }

  span.year {
    color: #64748b;
    font-weight: 600;
  }
`;

export const YearSelectorBtn = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: 8px;
  border: 1.5px solid ${({ $isActive }) => ($isActive ? "#c57a67" : "#e2e8f0")};
  background: ${({ $isActive }) => ($isActive ? "#fff5f2" : "#f8fafc")};
  color: ${({ $isActive }) => ($isActive ? "#c57a67" : "#1e293b")};
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c57a67;
    background: #fff5f2;
    color: #c57a67;
  }

  svg {
    transition: transform 0.2s ease;
    transform: ${({ $isActive }) => ($isActive ? "rotate(180deg)" : "rotate(0deg)")};
    color: ${({ $isActive }) => ($isActive ? "#c57a67" : "#64748b")};
  }
`;

export const YearPickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #f1f5f9;

  .title {
    font-size: 0.84rem;
    font-weight: 700;
    color: #1e293b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

export const YearPickerBackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #1F2B45;
    color: #ffffff;
    border-color: #1F2B45;
  }
`;

export const YearGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-height: 230px;
  overflow-y: auto;
  padding-right: 4px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const YearCard = styled.button<{ $isSelected: boolean }>`
  height: 38px;
  border-radius: 10px;
  border: 1.5px solid ${({ $isSelected }) => ($isSelected ? "#c57a67" : "#e2e8f0")};
  background: ${({ $isSelected }) => ($isSelected ? "#c57a67" : "#f8fafc")};
  color: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "#1e293b")};
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: ${({ $isSelected }) => ($isSelected ? "700" : "600")};
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ $isSelected }) =>
    $isSelected ? "0 3px 8px rgba(197, 122, 103, 0.3)" : "none"};

  &:hover {
    border-color: #c57a67;
    background: ${({ $isSelected }) => ($isSelected ? "#b06957" : "#fff5f2")};
    color: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "#c57a67")};
  }
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #1F2B45;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #1F2B45;
    color: #ffffff;
    border-color: #1F2B45;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 0.4rem;
`;

export const WeekdayLabel = styled.div`
  text-align: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  padding: 0.25rem 0;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
`;

export const DayButton = styled.button<{
  $isSelected?: boolean;
  $isToday?: boolean;
  $isCurrentMonth?: boolean;
  $isDisabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 34px;
  border: none;
  border-radius: 9px;
  font-family: inherit;
  font-size: 0.84rem;
  font-weight: ${({ $isSelected, $isToday }) => ($isSelected || $isToday ? "700" : "500")};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  transition: all 0.15s ease;
  position: relative;

  ${({ $isDisabled, $isCurrentMonth, $isSelected, $isToday }) => {
    if ($isDisabled) {
      return css`
        background: transparent;
        color: #cbd5e1;
        opacity: 0.45;
        text-decoration: line-through;
      `;
    }

    if ($isSelected) {
      return css`
        background: #1F2B45;
        color: #ffffff;
        box-shadow: 0 2px 8px rgba(31, 43, 69, 0.25);
      `;
    }

    if ($isToday) {
      return css`
        background: rgba(197, 122, 103, 0.12);
        color: #C57A67;
        font-weight: 700;
        border: 1px solid rgba(197, 122, 103, 0.4);

        &:hover {
          background: rgba(197, 122, 103, 0.2);
        }
      `;
    }

    if (!$isCurrentMonth) {
      return css`
        background: transparent;
        color: #cbd5e1;

        &:hover {
          background: #f1f5f9;
          color: #64748b;
        }
      `;
    }

    return css`
      background: transparent;
      color: #1e293b;

      &:hover {
        background: #f1f5f9;
        color: #1F2B45;
      }
    `;
  }}
`;

export const CalendarFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
`;

export const FooterActionBtn = styled.button<{ $primary?: boolean }>`
  border: none;
  background: ${({ $primary }) => ($primary ? "#f1f5f9" : "transparent")};
  color: ${({ $primary }) => ($primary ? "#1F2B45" : "#64748b")};
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $primary }) => ($primary ? "#e2e8f0" : "#f8fafc")};
    color: #1F2B45;
  }
`;
