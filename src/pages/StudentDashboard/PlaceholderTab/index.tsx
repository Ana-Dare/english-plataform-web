import React from 'react';
import { motion } from 'framer-motion';
import { PlaceholderContainer, Title, Subtitle, IconContainer } from './style';
import { Compass } from 'lucide-react';

interface PlaceholderTabProps {
  title: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ height: '100%' }}
    >
      <PlaceholderContainer>
        <IconContainer>
          <Compass />
        </IconContainer>
        <Title>{title}</Title>
        <Subtitle>
          Estamos preparando algo incrível para você. Esta seção estará disponível em breve com novas funcionalidades e uma experiência premium.
        </Subtitle>
      </PlaceholderContainer>
    </motion.div>
  );
};

export default PlaceholderTab;
