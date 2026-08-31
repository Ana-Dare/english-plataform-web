import styled, { css } from 'styled-components';

/* ====== PAGE LAYOUT: Calendar (left) + Upcoming Events (right) ====== */
export const AgendaPageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

// Main Container (Left column - Calendar)
export const AgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  padding: 1.5rem;
`;
export const AgendaHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    button {
      width: 100%;
    }
  }
`;

export const MonthTitle = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-size: 1.4rem;
  color: #1F2B45;
  font-weight: 700;
  margin: 0;
  text-transform: capitalize;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const IconButton = styled.button`
  background: #f9f6f4;
  border: 1px solid rgba(31, 43, 69, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: #1F2B45;
  transition: all 0.2s ease;

  &:hover {
    background: #e8e0db;
    transform: scale(1.05);
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-shrink: 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.3);
    background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
  flex-shrink: 0;
`;

export const ViewToggleButton = styled.button<{ $active: boolean }>`
  font-family: 'Rubik', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  background: ${({ $active }) => $active ? '#1F2B45' : 'transparent'};
  color: ${({ $active }) => $active ? '#fff' : '#64748b'};
  box-shadow: ${({ $active }) => $active ? '0 2px 8px rgba(31, 43, 69, 0.2)' : 'none'};

  &:hover {
    background: ${({ $active }) => $active ? '#1F2B45' : '#e2e8f0'};
    color: ${({ $active }) => $active ? '#fff' : '#1F2B45'};
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  width: 100%;
  min-width: 260px;
  max-width: 320px;
  flex-shrink: 0;
  border: 1px solid #1F2B45;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05);

  &:focus-within {
    border-color: #C57A67;
    box-shadow: 0 0 0 3px rgba(197, 122, 103, 0.15);
  }

  svg {
    color: #C57A67;
    margin-right: 0.8rem;
    flex-shrink: 0;
  }

  input {
    border: none;
    outline: none;
    font-size: 0.95rem;
    font-family: inherit;
    width: 100%;
    color: #1e293b;
    background: transparent;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Calendar Grid — compact version
export const CalendarGridContainer = styled.div<{ $isWeekly?: boolean }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: rgba(31, 43, 69, 0.08);
  border: 1px solid rgba(31, 43, 69, 0.08);
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 600px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 8px;
    padding-bottom: 8px;
    min-width: 100%;
    
    > div {
      min-width: 50px;
    }
  }
`;

export const WeekDayHeader = styled.div`
  background-color: #f9f6f4;
  padding: 0.8rem 0.3rem;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  color: #1F2B45;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DayCell = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean; $isWeekly?: boolean }>`
  background-color: ${({ $isCurrentMonth }) => ($isCurrentMonth ? '#fff' : '#fafafa')};
  min-height: ${({ $isWeekly }) => $isWeekly ? '180px' : '80px'};
  padding: ${({ $isWeekly }) => $isWeekly ? '0.6rem' : '0.4rem'};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f4f6f8;
  }

  ${({ $isToday }) =>
    $isToday &&
    css`
      background-color: rgba(197, 122, 103, 0.05); /* Salmão super claro */
    `}

  @media (max-width: 600px) {
    min-height: ${({ $isWeekly }) => $isWeekly ? '120px' : '50px'};
    padding: 0.2rem;
  }
`;

export const DayNumber = styled.span<{ $isCurrentMonth: boolean; $isToday: boolean }>`
  font-family: 'Rubik', sans-serif;
  font-size: 0.8rem;
  font-weight: ${({ $isToday }) => ($isToday ? '700' : '500')};
  color: ${({ $isCurrentMonth, $isToday }) => 
    $isToday ? '#fff' : $isCurrentMonth ? '#4D4D4D' : '#bbb'};
  margin-bottom: 0.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  ${({ $isToday }) =>
    $isToday &&
    css`
      background-color: #C57A67; /* Salmão */
      border-radius: 50%;
    `}
`;

// Event Chip — compact
export const EventChip = styled.div<{ $type: 'aula' | 'reuniao' | 'pessoal' }>`
  font-family: 'Rubik', sans-serif;
  font-size: 0.65rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;

  ${({ $type }) => {
    switch ($type) {
      case 'aula':
        return css`
          background-color: rgba(31, 43, 69, 0.1);
          color: #1F2B45;
          border-left: 3px solid #1F2B45;
        `;
      case 'reuniao':
        return css`
          background-color: rgba(197, 122, 103, 0.15);
          color: #C57A67;
          border-left: 3px solid #C57A67;
        `;
      case 'pessoal':
        return css`
          background-color: rgba(77, 77, 77, 0.15);
          color: #4D4D4D;
          border-left: 3px solid #4D4D4D;
        `;
    }
  }}
`;

/* ====== UPCOMING EVENTS SIDEBAR (Right column) ====== */
export const UpcomingContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: fit-content;
`;

export const UpcomingHeader = styled.div`
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(31, 43, 69, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-family: 'Rubik', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1F2B45;
  }

  span {
    font-family: 'Rubik', sans-serif;
    font-size: 0.8rem;
    color: #4D4D4D;
    font-weight: 500;
  }
`;

export const UpcomingList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
`;

export const UpcomingEventCard = styled.div<{ $type: 'aula' | 'reuniao' | 'pessoal' }>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(31, 43, 69, 0.05);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f6f4;
  }
`;

export const EventTimeIndicator = styled.div<{ $type: 'aula' | 'reuniao' | 'pessoal' }>`
  width: 4px;
  min-height: 48px;
  border-radius: 4px;
  flex-shrink: 0;

  ${({ $type }) => {
    switch ($type) {
      case 'aula':
        return css`background-color: #1F2B45;`;
      case 'reuniao':
        return css`background-color: #C57A67;`;
      case 'pessoal':
        return css`background-color: #4D4D4D;`;
    }
  }}
`;

export const EventCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
`;

export const EventCardTitle = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1F2B45;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EventCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'Rubik', sans-serif;
  font-size: 0.8rem;
  color: #4D4D4D;
  
  svg {
    flex-shrink: 0;
    color: #FFA38C; /* rosa-salmão for icons */
  }
`;

export const EventCardDate = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 0.75rem;
  color: #4D4D4D;
  opacity: 0.8;
`;

export const EventTypeBadge = styled.span<{ $type: 'aula' | 'reuniao' | 'pessoal' }>`
  font-family: 'Rubik', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ $type }) => {
    switch ($type) {
      case 'aula':
        return css`
          background-color: rgba(31, 43, 69, 0.1);
          color: #1F2B45;
        `;
      case 'reuniao':
        return css`
          background-color: rgba(197, 122, 103, 0.15);
          color: #C57A67;
        `;
      case 'pessoal':
        return css`
          background-color: rgba(77, 77, 77, 0.15);
          color: #4D4D4D;
        `;
    }
  }}
`;

export const EmptyUpcoming = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: #4D4D4D;
  font-family: 'Rubik', sans-serif;
  font-size: 0.9rem;

  svg {
    margin-bottom: 0.8rem;
    opacity: 0.5;
    color: #1F2B45;
  }
`;

// Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(31, 43, 69, 0.35);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;

  @media (max-width: 600px) {
    align-items: flex-end;
    padding: 0;
  }
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 92vh;
  padding: 0;
  box-shadow: 0 15px 50px rgba(31, 43, 69, 0.15);
  display: flex;
  flex-direction: column;
  border: 1.5px solid #c4c4c4;
  overflow: hidden;

  @media (max-width: 600px) {
    max-width: 100%;
    max-height: 94vh;
    border-radius: 16px 16px 0 0;
    border-bottom: none;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.15rem;
  border-bottom: 1.5px solid #c4c4c4;
  flex-shrink: 0;

  h3 {
    margin: 0;
    font-family: 'Rubik', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1F2B45;
    flex: 1;
    text-align: center;
  }

  button.close-btn {
    background: #f4f4f5;
    border: 1.5px solid #c4c4c4;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #4D4D4D;
    transition: all 0.2s;
    flex-shrink: 0;
    &:hover { background: #e4e4e7; color: #1F2B45; }
  }

  @media (min-width: 601px) {
    h3 {
      text-align: left;
      order: 1;
    }

    button.close-btn {
      order: 2;
      margin-left: auto;
    }
  }
`;

export const HeaderSave = styled.button`
  display: none;
  background: none;
  border: none;
  color: #C57A67;
  font-family: 'Rubik', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.25rem 0.2rem;

  @media (max-width: 600px) {
    display: block;
  }
`;

export const ModalScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 0.9rem 1.15rem 1rem;
  overflow-y: auto;
  flex: 1;
`;

export const FormGroup = styled.div<{ $error?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.28rem;

  label {
    font-family: 'Rubik', sans-serif;
    font-size: 0.74rem;
    font-weight: 700;
    color: #3f3f46;
    letter-spacing: 0.2px;

    span {
      color: #d93025;
      font-weight: 800;
    }
  }

  input, textarea {
    padding: 0.62rem 0.95rem;
    border: 1.5px solid ${({ $error }) => ($error ? "#d93025" : "#8d8d8d")};
    border-radius: 12px;
    font-family: 'Rubik', sans-serif;
    font-size: 0.9rem;
    color: #1F2B45;
    outline: none;
    transition: all 0.2s;
    background: #fff;
    width: 100%;
    box-sizing: border-box;

    &::placeholder {
      color: #888;
    }

    &:focus {
      border-color: ${({ $error }) => ($error ? "#d93025" : "#C57A67")};
      box-shadow: 0 0 0 3px ${({ $error }) =>
        $error ? "rgba(217, 48, 37, 0.12)" : "rgba(197, 122, 103, 0.12)"};
    }

    &:disabled {
      background: #f4f4f5;
      color: #71717a;
      cursor: not-allowed;
    }
  }

  textarea {
    resize: vertical;
    min-height: 72px;
    border-radius: 12px;
    padding-left: 2.4rem;
  }
`;

export const FieldError = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: #d93025;
`;

export const FieldIconWrap = styled.div<{ $alignTop?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  > svg {
    position: absolute;
    left: 0.85rem;
    top: ${({ $alignTop }) => ($alignTop ? "12px" : "50%")};
    transform: ${({ $alignTop }) => ($alignTop ? "none" : "translateY(-50%)")};
    color: #6b6b6b;
    pointer-events: none;
    z-index: 1;
  }

  input {
    padding-left: 2.4rem;
  }
`;

export const TimeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const SegmentGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SegmentBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  font-family: 'Rubik', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1.5px solid ${({ $active }) => ($active ? "#1F2B45" : "#8d8d8d")};
  background: ${({ $active }) => ($active ? "#1F2B45" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#3f3f46")};

  &:hover {
    border-color: #1F2B45;
  }
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.15rem 0;
`;

export const ToggleCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  strong {
    font-size: 0.82rem;
    font-weight: 700;
    color: #1F2B45;
  }

  span {
    font-size: 0.72rem;
    color: #71717a;
    font-weight: 500;
  }
`;

export const Switch = styled.button<{ $on: boolean }>`
  width: 42px;
  height: 24px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  background: ${({ $on }) => ($on ? "#22c55e" : "#c4c4c4")};
  transition: background 0.2s;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ $on }) => ($on ? "21px" : "3px")};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const RepeatCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 0.75rem 0.85rem;
  border: 1.5px solid #9ca3af;
  border-radius: 12px;
  background: #fafafa;
`;

export const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.35rem;
`;

export const WeekdayBtn = styled.button<{ $active: boolean }>`
  aspect-ratio: 1;
  min-height: 34px;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  border: 1.5px solid ${({ $active }) => ($active ? "#1F2B45" : "#8d8d8d")};
  background: ${({ $active }) => ($active ? "#1F2B45" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#3f3f46")};
  transition: all 0.15s;

  &:hover {
    border-color: #1F2B45;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0.75rem 1.15rem 0.95rem;
  border-top: 1.5px solid #c4c4c4;
  background: #f7f7f7;
  flex-shrink: 0;

  @media (max-width: 600px) {
    .desktop-save {
      display: none;
    }
  }
`;

export const ModalButton = styled.button<{ $variant: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.65rem 1.25rem;
  border-radius: 50px; /* botões redondos */
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: #1F2B45;
          color: #fff;
          &:hover { 
            background: #2b3a4e; 
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(31, 43, 69, 0.2);
          }
        `;
      case 'secondary':
        return css`
          background: #f8fafc;
          color: #4D4D4D;
          &:hover { 
            background: #e2e8f0;
            color: #1F2B45; 
          }
        `;
      case 'danger':
        return css`
          background: transparent;
          color: #ef4444; /* red for danger */
          border: 1px solid #ef4444;
          margin-right: auto; /* Push delete button to the left */
          &:hover { 
            background: rgba(239, 68, 68, 0.1); 
          }
        `;
    }
  }}
`;
