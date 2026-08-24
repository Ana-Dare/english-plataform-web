import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 24px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
      color: #333;
    }
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`;

export const MonthYear = styled.span`
  font-weight: 600;
  color: #333;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  text-align: center;
`;

export const WeekDay = styled.div`
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 8px;
  
  &:first-child, &:last-child {
    color: #2563eb;
  }
`;

export const DayCell = styled.div<{ $type?: 'past' | 'current' | 'event' | 'empty' | 'disabled' }>`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border-radius: 6px;
  background-color: ${({ $type }) => {
    switch ($type) {
      case 'past': return '#fcedb3'; // Yellow
      case 'current': return '#fcedb3'; // Yellow
      case 'event': return '#2563eb'; // Blue
      default: return 'transparent';
    }
  }};
  color: ${({ $type }) => ($type === 'event' ? '#fff' : $type === 'disabled' ? '#ccc' : '#333')};
  font-weight: ${({ $type }) => ($type && $type !== 'empty' && $type !== 'disabled' ? 'bold' : 'normal')};
  
  cursor: ${({ $type }) => ($type === 'disabled' || $type === 'empty' || !$type ? 'default' : 'pointer')};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $type }) => (!$type ? '#f5f5f5' : '')};
    transform: ${({ $type }) => ($type !== 'disabled' && $type !== 'empty' && $type ? 'scale(1.1)' : 'none')};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: #ffffff;
  width: 400px;
  max-width: 90%;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;

  h2 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 8px;
    
    svg {
      color: #d4af37;
    }
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 4px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

export const ModalDetailRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  strong {
    font-size: 0.85rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  span {
    font-size: 1.05rem;
    color: #333;
  }
`;

export const EventModalContent = styled.div`
  background: #ffffff;
  width: 800px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
`;

export const EventModalHeader = styled.div`
  background-color: #fceeb5;
  padding: 24px;
  text-align: center;
  position: relative;
  
  h2 {
    margin: 0;
    color: #8b6b15;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  p {
    margin: 6px 0 0 0;
    color: #8b6b15;
    font-size: 0.95rem;
  }
`;

export const EventModalCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 8px;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #000;
  }
`;

export const EventModalBody = styled.div`
  padding: 32px;
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const EventModalInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
    line-height: 1.4;
  }

  strong {
    color: #333;
    font-weight: 600;
  }

  .course-level {
    color: #666;
    font-size: 0.85rem;
    margin-bottom: -4px;
  }
`;

export const JoinButton = styled.button`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const EventModalImage = styled.div`
  flex: 1;
  
  img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
`;

