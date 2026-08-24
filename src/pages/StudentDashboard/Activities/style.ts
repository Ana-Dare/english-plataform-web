import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  margin-bottom: 24px;

  h2 {
    margin: 0;
    color: #333;
    font-size: 1.8rem;
  }

  p {
    margin: 4px 0 0 0;
    color: #666;
    font-size: 1rem;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 24px;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 12px 0;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#2563eb' : '#888')};
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: ${({ $active }) => ($active ? '#2563eb' : '#555')};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #2563eb;
    border-radius: 3px 3px 0 0;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.3s ease;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

export const ActivityCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
    border-color: #d4af37;
  }
`;

export const ActivityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IconBox = styled.div<{ $type: 'urgent' | 'normal' | 'done' }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  background-color: ${({ $type }) => {
    switch ($type) {
      case 'urgent': return '#EAE0D5'; // Beige
      case 'done': return '#dcfce7'; // Light green
      default: return '#e0e7ff'; // Light blue
    }
  }};

  color: ${({ $type }) => {
    switch ($type) {
      case 'urgent': return '#1e3a8a';
      case 'done': return '#22c55e';
      default: return '#2563eb';
    }
  }};
`;

export const TextDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h4 {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }

  span {
    font-size: 0.9rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 6px;
    
    svg {
      color: #999;
    }
  }
`;

export const StatusTag = styled.div<{ $status: 'pending' | 'urgent' | 'graded' | 'submitted' }>`
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 4px;

  background-color: ${({ $status }) => {
    switch ($status) {
      case 'urgent': return '#fee2e2';
      case 'graded': return '#dcfce7';
      case 'submitted': return '#e0e7ff';
      default: return '#f3f4f6';
    }
  }};

  color: ${({ $status }) => {
    switch ($status) {
      case 'urgent': return '#b91c1c';
      case 'graded': return '#15803d';
      case 'submitted': return '#1d4ed8';
      default: return '#4b5563';
    }
  }};
`;

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
  background-color: ${({ $primary }) => ($primary ? '#2563eb' : 'transparent')};
  color: ${({ $primary }) => ($primary ? '#fff' : '#2563eb')};
  border: 1px solid ${({ $primary }) => ($primary ? '#2563eb' : '#2563eb')};
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? '#1d4ed8' : '#eff6ff')};
  }

  &:disabled {
    background-color: #10b981;
    border-color: #10b981;
    color: #fff;
    cursor: default;
  }
`;

export const GradeBadge = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #15803d;
  background-color: #dcfce7;
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
`;
