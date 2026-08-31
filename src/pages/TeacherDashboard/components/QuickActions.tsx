import styled from "styled-components";
import { PlusCircle, FileText, UploadCloud, Award, Users, CalendarDays } from 'lucide-react';
import { motion } from "framer-motion";

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ActionBtn = styled(motion.button)<{ $colorType: "primary" | "secondary" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border: none;
  background: ${({ $colorType }) =>
    $colorType === "primary" ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" : "linear-gradient(135deg, #faf7f2 0%, #efe8dd 100%)"};
  color: ${({ $colorType }) =>
    $colorType === "primary" ? "#ffffff" : "#334155"};
  border: 1px solid ${({ $colorType }) =>
    $colorType === "primary" ? "transparent" : "#e5dccf"};
  padding: 1.2rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  font-family: "Rubik", sans-serif;
  box-shadow: ${({ $colorType }) =>
    $colorType === "primary" ? "0 4px 12px rgba(15, 23, 42, 0.15)" : "0 2px 4px rgba(15, 23, 42, 0.05)"};

  svg {
    transition: transform 0.3s ease;
    color: ${({ $colorType }) =>
      $colorType === "primary" ? "#ffffff" : "#94785c"};
  }

  &:hover {
    box-shadow: ${({ $colorType }) =>
      $colorType === "primary" ? "0 8px 20px rgba(15, 23, 42, 0.25)" : "0 6px 16px rgba(148, 120, 92, 0.2)"};
    border-color: ${({ $colorType }) =>
      $colorType === "primary" ? "transparent" : "#d1c5b4"};
      
    svg {
      transform: scale(1.15);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface QuickActionsProps {
  onAction: (tab: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const QuickActions = ({ onAction }: QuickActionsProps) => {
  return (
    <Grid
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <ActionBtn 
        $colorType="primary" 
        onClick={() => onAction('turmas')}
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <PlusCircle size={24} />
        Criar turma
      </ActionBtn>
      <ActionBtn 
        $colorType="primary" 
        onClick={() => onAction('turmas')}
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <FileText size={24} />
        Nova atividade
      </ActionBtn>
      <ActionBtn 
        $colorType="primary" 
        onClick={() => onAction('turmas')}
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <UploadCloud size={24} />
        Postar material
      </ActionBtn>

      <ActionBtn 
        $colorType="secondary" 
        onClick={() => onAction('certificados')}
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <Award size={24} />
        Emitir certificado
      </ActionBtn>
      <ActionBtn 
        $colorType="secondary" 
        onClick={() => onAction('alunos')}
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <Users size={24} />
        Ver alunos
      </ActionBtn>
      <ActionBtn 
        $colorType="secondary" 
        onClick={() => onAction('agenda')}
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <CalendarDays size={24} />
        Agendar reposição
      </ActionBtn>
    </Grid>
  );
};

export default QuickActions;
