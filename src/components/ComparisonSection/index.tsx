import { MinusCircle, CheckCircle2 } from "lucide-react";
import {
  ComparisonContainer,
  ComparisonCard,
  TopLabel,
  Title,
  TableGrid,
  TableHeaderLabel,
  TableHeaderBad,
  TableHeaderGood,
  RowLabel,
  CellBad,
  CellGood,
  CTAButton
} from "./style";

const ComparisonSection = () => {
  const rows = [
    {
      label: "Tempo",
      bad: "Perde 5 anos estudando",
      good: "Curso completo para ser fluente em até 12 meses"
    },
    {
      label: "Método",
      bad: "Só 'decoreba' e muita teoria",
      good: "Método leve e descomplicado"
    },
    {
      label: "Vocabulário",
      bad: "Dificuldade de memorizar palavras",
      good: "Aprenda vocabulário com situações e vivências reais"
    },
    {
      label: "Gramática",
      bad: "Muita gramática e regra que você nunca vai usar",
      good: "Expressões, gírias e frases usadas na vida real"
    },
    {
      label: "Aulas",
      bad: "Aulas engessadas, chatas e em horários específicos",
      good: "Aulas para assistir quando e quantas vezes quiser"
    }
  ];

  return (
    <ComparisonContainer>
      <ComparisonCard>
        <TopLabel>Nossos Diferenciais</TopLabel>
        <Title>Vantagens das Aulas e Traduções</Title>

        <TableGrid>
          {/* Header */}
          <TableHeaderLabel></TableHeaderLabel>
          <TableHeaderBad>Escolas Tradicionais</TableHeaderBad>
          <TableHeaderGood>Aulas e Traduções</TableHeaderGood>

          {/* Rows */}
          {rows.map((row, index) => (
            <div style={{ display: 'contents' }} key={index}>
              <RowLabel>{row.label}</RowLabel>
              <CellBad>
                <MinusCircle size={22} strokeWidth={2} />
                {row.bad}
              </CellBad>
              <CellGood>
                <CheckCircle2 size={22} strokeWidth={2} />
                {row.good}
              </CellGood>
            </div>
          ))}
        </TableGrid>

        <CTAButton>Garanta sua vaga!</CTAButton>
      </ComparisonCard>
    </ComparisonContainer>
  );
};

export default ComparisonSection;
