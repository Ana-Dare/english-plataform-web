import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Badge = styled.span<{ $variant?: 'primary' | 'secondary' | 'blue' | 'red' }>`
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background-color: #C57A67;
          color: white;
        `;
      case 'secondary':
        return `
          background-color: transparent;
          color: #1F2B45;
          font-weight: 800;
        `;
      case 'blue':
        return `
          background-color: #E8F0FE;
          color: #4A72FF;
        `;
      case 'red':
        return `
          background-color: #FEE8E8;
          color: #C57A67;
        `;
      default:
        return `
          background-color: #f0f0f0;
          color: #333;
        `;
    }
  }}
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  }
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  min-width: 0; /* Prevents overflow in grid */
`;

export const IconBox = styled.div<{ $color?: string, $bg?: string }>`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 8px;
  background-color: ${({ $bg }) => $bg || '#E8F0FE'};
  color: ${({ $color }) => $color || '#4A72FF'};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StatInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.8rem;
    color: #888;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ProgressSection = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  }
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 4px;
  }

  p {
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
  }
`;

export const Percentage = styled.span`
  font-size: 1.35rem;
  font-weight: 800;
  color: #C57A67;
`;

export const ProgressBar = styled.div`
  height: 8px;
  background-color: #F0F0F0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const ProgressFill = styled.div<{ $width: string }>`
  height: 100%;
  width: ${({ $width }) => $width};
  background-color: #C57A67;
  border-radius: 4px;
`;

export const ProgressFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #888;
  font-weight: 600;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 6px;
  }
`;

export const AgendaSection = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 16px;
  }
`;

export const AgendaGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ColumnHeader = styled.h4`
  font-size: 1.1rem;
  font-weight: 800;
  color: #1F2B45;
  margin-bottom: 16px;
`;

export const ClassesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

export const ClassCard = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateX(4px);
    border-color: #4A72FF;
  }
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f9f9f9;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const DateBox = styled.div`
  background-color: #1F2B45;
  color: white;
  border-radius: 8px;
  width: 56px;
  height: 56px;
  min-width: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1;
  }

  span {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 4px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    padding: 8px;
    flex-direction: row;
    gap: 8px;

    span {
      margin-top: 0;
    }
  }
`;

export const ClassDetails = styled.div`
  flex: 1;
  min-width: 0;

  .title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    flex-wrap: wrap;

    h5 {
      font-size: 1rem;
      font-weight: 800;
      color: #1F2B45;
    }

    svg {
      color: #888;
      width: 16px;
      height: 16px;
    }
  }

  p {
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
  }
`;

export const Dot = styled.div<{ $color?: string }>`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color || '#C57A67'};
`;

export const EventCard = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateX(4px);
    border-color: #4A72FF;
  }
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  h5 {
    font-size: 0.95rem;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 4px;
  }

  p {
    font-size: 0.8rem;
    color: #888;
    font-weight: 500;
  }
`;

export const EventTime = styled.span<{ $color?: string }>`
  font-size: 0.85rem;
  color: ${({ $color }) => $color || '#C57A67'};
  font-weight: 800;
  white-space: nowrap;
`;


