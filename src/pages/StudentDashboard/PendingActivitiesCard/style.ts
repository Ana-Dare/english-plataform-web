import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  color: #333;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ActivityItem = styled.div<{ $colorType: 'yellow' | 'blue' }>`
  display: flex;
  background-color: ${({ $colorType }) => ($colorType === 'yellow' ? '#fdf8e1' : '#eaf0fe')};
  border-radius: 12px;
  padding: 16px;
  gap: 16px;
  align-items: center;
`;

export const DateCircle = styled.div<{ $colorType: 'yellow' | 'blue' }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ $colorType }) => ($colorType === 'yellow' ? '#fcd34d' : '#3b82f6')};
  color: ${({ $colorType }) => ($colorType === 'yellow' ? '#000' : '#fff')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0;
`;

export const ActivityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ActivityTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: #333;
  font-weight: 600;
`;

export const ActivityDate = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

export const ActivityDescription = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #444;
  font-style: italic;
`;
