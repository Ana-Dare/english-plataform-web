import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ActionBtn = styled.button<{ $colorType: 'blue' | 'yellow' }>`
  border: none;
  background-color: ${({ $colorType }) => $colorType === 'blue' ? '#dbe4fa' : '#fcedb3'};
  color: ${({ $colorType }) => $colorType === 'blue' ? '#1c3e96' : '#997300'};
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Rubik', sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    filter: brightness(0.95);
  }
`;

const QuickActions = () => {
  return (
    <Grid>
      <ActionBtn $colorType="blue">Criar turma</ActionBtn>
      <ActionBtn $colorType="blue">Nova atividade</ActionBtn>
      <ActionBtn $colorType="blue">Postar material</ActionBtn>
      
      <ActionBtn $colorType="yellow">Emitir certificado</ActionBtn>
      <ActionBtn $colorType="yellow">Registrar chamada</ActionBtn>
      <ActionBtn $colorType="yellow">Agendar reposição</ActionBtn>
    </Grid>
  );
};

export default QuickActions;
