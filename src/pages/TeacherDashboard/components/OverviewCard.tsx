import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  background: rgba(255, 163, 140, 0.25); /* rosa-salmão */
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 1.5rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(255, 163, 140, 0.4);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.1);
  }
`;

const Title = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.2rem;
`;

const Value = styled.span`
  font-family: 'Outfit', 'Rubik', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
`;

interface OverviewCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, subtitle }) => {
  return (
    <CardContainer 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Title>{title}</Title>
      <ValueRow>
        <Value>{value}</Value>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </ValueRow>
    </CardContainer>
  );
};

export default OverviewCard;
