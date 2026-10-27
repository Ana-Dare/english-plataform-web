import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.button)`
  background: rgba(255, 163, 140, 0.25); /* rosa-salmão */
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1.125rem, 2vw, 1.75rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 0.35rem;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
  border: 1px solid rgba(255, 163, 140, 0.4);
  transition: box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  font-family: 'Rubik', sans-serif;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(255, 163, 140, 0.34);
    border-color: rgba(255, 140, 112, 0.65);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #1F2B45;
    outline-offset: 2px;
  }
`;

const Title = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.4;
  color: #475569;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

const ValueRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  margin-top: 0.15rem;
  min-width: 0;
`;

const Value = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: clamp(1.75rem, 2vw + 1.25rem, 2.5rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #64748b;
  font-weight: 500;
`;

interface OverviewCardProps {
  title: string;
  value: string;
  subtitle?: string;
  onClick?: () => void;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  subtitle,
  onClick,
}) => {
  return (
    <CardContainer
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
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
