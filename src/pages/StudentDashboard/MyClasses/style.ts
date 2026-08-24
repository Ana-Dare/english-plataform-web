import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 24px;
  height: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

export const CalendarCard = styled.div`
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  padding: 32px;
  width: 400px;
  height: fit-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 1024px) {
    width: 100%;
    padding: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

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

export const MonthYear = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px 8px;
  text-align: center;
`;

export const WeekDay = styled.div`
  font-size: 0.85rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 8px;
  
  &:first-child, &:last-child {
    color: #2563eb;
  }
`;

export const DayCell = styled.div<{ $type?: 'past' | 'current' | 'event' | 'empty' | 'disabled', $isHovered?: boolean, $isSelected?: boolean }>`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  
  color: ${({ $type }) => ($type === 'disabled' ? '#ccc' : '#333')};
  
  background-color: ${({ $type, $isSelected }) => {
    if ($isSelected && $type !== 'disabled' && $type !== 'empty') return '#d4af37'; // Highlight selected
    switch ($type) {
      case 'past': return '#fcedb3'; // Yellow
      case 'current': return '#fcedb3'; // Yellow
      case 'event': return '#2563eb'; // Blue
      default: return 'transparent';
    }
  }};
  
  color: ${({ $type, $isSelected }) => {
    if ($isSelected && $type !== 'disabled' && $type !== 'empty') return '#000';
    return $type === 'event' ? '#fff' : $type === 'disabled' ? '#ccc' : '#333';
  }};
  
  font-weight: ${({ $type }) => ($type && $type !== 'empty' && $type !== 'disabled' ? 'bold' : 'normal')};
  
  cursor: ${({ $type }) => ($type === 'disabled' || $type === 'empty' ? 'default' : 'pointer')};
  
  border: ${({ $isHovered, $type }) => ($isHovered && $type !== 'disabled' && $type !== 'empty' ? '2px solid #333' : '2px solid transparent')};

  transition: all 0.2s ease;

  &:hover {
    transform: ${({ $type }) => ($type !== 'disabled' && $type !== 'empty' ? 'scale(1.1)' : 'none')};
  }
`;

export const LegendContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: #555;

  .color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
`;

export const DetailsPanel = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  padding: 32px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const DetailsHeader = styled.h2`
  margin: 0 0 24px 0;
  color: #333;
  font-size: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #d4af37;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  strong {
    font-size: 0.9rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  span {
    font-size: 1.1rem;
    color: #333;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
  text-align: center;
  gap: 16px;

  svg {
    color: #ccc;
    width: 64px;
    height: 64px;
  }
`;

export const TooltipContainer = styled.div`
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;
