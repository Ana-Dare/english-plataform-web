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
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #eaeaea;
  padding: 1.2rem;
`;

export const AgendaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const MonthTitle = styled.h2`
  font-size: 1.2rem;
  color: #08142c;
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const IconButton = styled.button`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #d0d0d0;
  }
`;

export const PrimaryButton = styled.button`
  background-color: #08142c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 0.82rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1a3d6e;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(8, 20, 44, 0.2);
  }
`;

// Calendar Grid — compact version
export const CalendarGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #eaeaea;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
`;

export const WeekDayHeader = styled.div`
  background-color: #f8f9fa;
  padding: 0.5rem 0.3rem;
  text-align: center;
  font-weight: 600;
  color: #555;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DayCell = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean }>`
  background-color: ${({ $isCurrentMonth }) => ($isCurrentMonth ? '#fff' : '#fcfcfc')};
  min-height: 68px;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f4f6f8;
  }

  ${({ $isToday }) =>
    $isToday &&
    css`
      background-color: #f0f7ff;
    `}

  @media (max-width: 600px) {
    min-height: 50px;
    padding: 0.2rem;
  }
`;

export const DayNumber = styled.span<{ $isCurrentMonth: boolean; $isToday: boolean }>`
  font-size: 0.75rem;
  font-weight: ${({ $isToday }) => ($isToday ? '700' : '400')};
  color: ${({ $isCurrentMonth, $isToday }) => 
    $isToday ? '#fff' : $isCurrentMonth ? '#333' : '#bbb'};
  margin-bottom: 0.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  
  ${({ $isToday }) =>
    $isToday &&
    css`
      background-color: #08142c;
      border-radius: 50%;
    `}
`;

// Event Chip — compact
export const EventChip = styled.div<{ $type: 'aula' | 'reuniao' | 'pessoal' }>`
  font-size: 0.62rem;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;

  ${({ $type }) => {
    switch ($type) {
      case 'aula':
        return css`
          background-color: #e3f2fd;
          color: #1565c0;
          border-left: 2px solid #1976d2;
        `;
      case 'reuniao':
        return css`
          background-color: #fff8e1;
          color: #f57f17;
          border-left: 2px solid #fbc02d;
        `;
      case 'pessoal':
        return css`
          background-color: #e8f5e9;
          color: #2e7d32;
          border-left: 2px solid #388e3c;
        `;
    }
  }}
`;

/* ====== UPCOMING EVENTS SIDEBAR (Right column) ====== */
export const UpcomingContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: fit-content;
`;

export const UpcomingHeader = styled.div`
  padding: 1rem 1.2rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #08142c;
  }

  span {
    font-size: 0.75rem;
    color: #888;
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
  gap: 0.8rem;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #fafafa;
  }
`;

export const EventTimeIndicator = styled.div<{ $type: 'aula' | 'reuniao' | 'pessoal' }>`
  width: 4px;
  min-height: 40px;
  border-radius: 4px;
  flex-shrink: 0;

  ${({ $type }) => {
    switch ($type) {
      case 'aula':
        return css`background-color: #1976d2;`;
      case 'reuniao':
        return css`background-color: #fbc02d;`;
      case 'pessoal':
        return css`background-color: #388e3c;`;
    }
  }}
`;

export const EventCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

export const EventCardTitle = styled.p`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EventCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #888;
  
  svg {
    flex-shrink: 0;
  }
`;

export const EventCardDate = styled.span`
  font-size: 0.72rem;
  color: #999;
`;

export const EventTypeBadge = styled.span<{ $type: 'aula' | 'reuniao' | 'pessoal' }>`
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${({ $type }) => {
    switch ($type) {
      case 'aula':
        return css`
          background-color: #e3f2fd;
          color: #1565c0;
        `;
      case 'reuniao':
        return css`
          background-color: #fff8e1;
          color: #f57f17;
        `;
      case 'pessoal':
        return css`
          background-color: #e8f5e9;
          color: #2e7d32;
        `;
    }
  }}
`;

export const EmptyUpcoming = styled.div`
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: #aaa;
  font-size: 0.85rem;

  svg {
    margin-bottom: 0.5rem;
    opacity: 0.4;
  }
`;

// Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #08142c;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
    &:hover { color: #333; }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #555;
  }

  input, select, textarea {
    padding: 0.8rem 1rem;
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
    background: #fff;

    &:focus {
      border-color: #08142c;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const ModalButton = styled.button<{ $variant: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: #08142c;
          color: #fff;
          &:hover { background: #1a3d6e; }
        `;
      case 'secondary':
        return css`
          background: #f0f0f0;
          color: #333;
          &:hover { background: #e0e0e0; }
        `;
      case 'danger':
        return css`
          background: transparent;
          color: #d93025;
          border: 1px solid #d93025;
          &:hover { background: #fce8e6; }
        `;
    }
  }}
`;
