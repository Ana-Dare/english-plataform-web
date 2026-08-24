import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #fcedb3;
  border-radius: 10px;
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
`;

const Title = styled.span`
  font-size: 0.85rem;
  color: #555;
  font-weight: 500;
`;

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.2rem;
`;

const Value = styled.span`
  font-size: 2.5rem;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1;
`;

const Subtitle = styled.span`
  font-size: 0.75rem;
  color: #333;
`;

interface OverviewCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, subtitle }) => {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <ValueRow>
        <Value>{value}</Value>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </ValueRow>
    </CardContainer>
  );
};

export default OverviewCard;
