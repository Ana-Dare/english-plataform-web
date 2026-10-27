import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }

  h1 {
    font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
    line-height: 1.25;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 0.375rem;
  }

  p {
    color: #4D4D4D;
    font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
    line-height: 1.5;
    font-weight: 500;
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const Badge = styled.span<{ $variant?: 'primary' | 'secondary' | 'blue' | 'red' }>`
  padding: 0.3rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8125rem;
  line-height: 1.3;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  white-space: nowrap;

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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(0.875rem, 1.5vw, 1.25rem);
  width: 100%;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 479px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  }
  background: white;
  border-radius: 14px;
  padding: clamp(1rem, 2vw, 1.25rem);
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const IconBox = styled.div<{ $color?: string, $bg?: string }>`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 10px;
  background-color: ${({ $bg }) => $bg || '#E8F0FE'};
  color: ${({ $color }) => $color || '#4A72FF'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StatInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-size: clamp(1.25rem, 1.5vw + 0.9rem, 1.5rem);
    line-height: 1.25;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.4;
    color: #64748b;
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
  border-radius: 14px;
  padding: clamp(1.25rem, 2.5vw, 1.5rem);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  h4 {
    font-size: clamp(1rem, 0.5vw + 0.9rem, 1.1875rem);
    line-height: 1.3;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.45;
    color: #64748b;
    font-weight: 500;
  }
`;

export const Percentage = styled.span`
  font-size: clamp(1.25rem, 1vw + 1rem, 1.5rem);
  line-height: 1.2;
  font-weight: 800;
  color: #C57A67;
`;

export const ProgressBar = styled.div`
  height: 8px;
  background-color: #F0F0F0;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const ProgressFill = styled.div<{ $width: string }>`
  height: 100%;
  width: ${({ $width }) => $width};
  background-color: #C57A67;
  border-radius: 999px;
`;

export const ProgressFooter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #64748b;
  font-weight: 600;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.375rem;
  }
`;

export const AgendaSection = styled.div`
  min-width: 0;
  width: 100%;

  h3 {
    font-size: clamp(1.125rem, 1vw + 0.875rem, 1.5rem);
    line-height: 1.3;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 1rem;
  }
`;

export const AgendaGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: clamp(1.25rem, 2.5vw, 1.75rem);
  width: 100%;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }
`;

export const ColumnHeader = styled.h4`
  font-size: clamp(1rem, 0.5vw + 0.9rem, 1.125rem);
  line-height: 1.35;
  font-weight: 700;
  color: #1F2B45;
  margin-bottom: 1rem;
`;

export const ClassesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
`;

export const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: white;
  padding: clamp(1.25rem, 2vw, 1.5rem);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  min-width: 0;
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
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f1f5f9;
  min-width: 0;

  @media (max-width: 479px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.875rem;
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
  flex-shrink: 0;

  strong {
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1;
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 4px;
  }

  @media (max-width: 479px) {
    width: 100%;
    height: auto;
    padding: 0.5rem 0.75rem;
    flex-direction: row;
    gap: 0.5rem;

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
    gap: 0.5rem;
    margin-bottom: 0.375rem;
    flex-wrap: wrap;

    h5 {
      font-size: 1rem;
      line-height: 1.35;
      font-weight: 700;
      color: #1F2B45;
    }

    svg {
      color: #64748b;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  }

  p {
    font-size: 0.875rem;
    line-height: 1.4;
    color: #64748b;
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
  gap: 0.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  min-width: 0;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  h5 {
    font-size: 1rem;
    line-height: 1.35;
    font-weight: 700;
    color: #1F2B45;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.4;
    color: #64748b;
    font-weight: 500;
  }
`;

export const EventTime = styled.span<{ $color?: string }>`
  font-size: 0.875rem;
  color: ${({ $color }) => $color || '#C57A67'};
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
`;


