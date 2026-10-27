import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  animation: fadeIn 0.3s ease-out forwards;

  @media (max-width: 640px) {
    gap: 0.85rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 999px;
  padding: 0.6rem 1.25rem;
  width: 100%;
  min-width: 240px;
  max-width: 340px;
  flex-shrink: 0;
  border: 1.5px solid #1f2b45;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(31, 43, 69, 0.06);
  box-sizing: border-box;

  &:focus-within {
    border-color: #1f2b45;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.15);
  }

  svg {
    color: #1f2b45;
    margin-right: 0.75rem;
    flex-shrink: 0;
  }

  input {
    border: none;
    outline: none;
    font-size: 0.9375rem;
    font-family: "Rubik", sans-serif;
    font-weight: 500;
    width: 100%;
    min-width: 0;
    color: #1f2b45;
    background: transparent;

    &::placeholder {
      color: #94a3b8;
      font-weight: 400;
    }
  }

  @media (max-width: 767px) {
    max-width: 100%;
    min-width: 0;
  }
`;

export const FilterSelect = styled.select`
  background: #ffffff;
  border: 1.5px solid #1f2b45;
  border-radius: 999px;
  padding: 0.6rem 2.4rem 0.6rem 1.15rem;
  font-size: 0.875rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  color: #1f2b45;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231F2B45%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.85rem top 52%;
  background-size: 0.6rem auto;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(31, 43, 69, 0.06);
  min-width: 170px;
  white-space: nowrap;

  &:hover {
    border-color: #141d2e;
    background-color: #f8fafc;
    box-shadow: 0 2px 8px rgba(31, 43, 69, 0.12);
  }

  &:focus {
    border-color: #1f2b45;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.15);
  }

  @media (max-width: 767px) {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
    padding: 0.55rem 1.8rem 0.55rem 0.85rem;
    font-size: clamp(0.75rem, 2.8vw, 0.85rem);
  }
`;

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
`;

export const CertificateCard = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  padding: clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.6rem);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  gap: clamp(1rem, 2vw, 1.5rem);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #1f2b45;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(31, 43, 69, 0.1);
    border-color: #1f2b45;

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.15rem;
  }
`;

export const CardIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1.2;
  min-width: 0;
`;

export const Avatar = styled.div<{ $bg: string; $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-family: "Rubik", sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  border: 2px solid #ffffff;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
`;

export const StudentName = styled.h3`
  margin: 0;
  font-family: "Rubik", sans-serif;
  font-size: 1.05rem;
  color: #1f2b45;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BadgesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

export const LevelBadge = styled.span<{ $onDark?: boolean }>`
  background: ${({ $onDark }) =>
    $onDark ? "rgba(255, 255, 255, 0.15)" : "rgba(31, 43, 69, 0.08)"};
  color: ${({ $onDark }) => ($onDark ? "#ffffff" : "#1f2b45")};
  border: 1px solid
    ${({ $onDark }) =>
      $onDark ? "rgba(255, 255, 255, 0.3)" : "rgba(31, 43, 69, 0.2)"};
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-family: "Rubik", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  white-space: nowrap;
`;

export const PlanBadge = styled.span<{ $onDark?: boolean }>`
  background: ${({ $onDark }) => ($onDark ? "#c57a67" : "rgba(197, 122, 103, 0.15)")};
  color: ${({ $onDark }) => ($onDark ? "#ffffff" : "#c57a67")};
  border: 1px solid
    ${({ $onDark }) => ($onDark ? "#c57a67" : "rgba(197, 122, 103, 0.3)")};
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-family: "Rubik", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`;

export const StatusBadge = styled.span<{ $onDark?: boolean }>`
  background: ${({ $onDark }) => ($onDark ? "#16a34a" : "#ecfdf5")};
  color: ${({ $onDark }) => ($onDark ? "#ffffff" : "#047857")};
  border: 1px solid ${({ $onDark }) => ($onDark ? "#16a34a" : "#a7f3d0")};
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-family: "Rubik", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  white-space: nowrap;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ $onDark }) => ($onDark ? "#ffffff" : "#10b981")};
  }
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex: 1;
  justify-content: center;

  @media (max-width: 860px) {
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    padding: 0.6rem 0;
    border-top: 1px solid #f1f5f9;
    border-bottom: 1px solid #f1f5f9;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-family: "Rubik", sans-serif;

  span:first-child {
    font-size: 0.7rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 700;
  }

  span:last-child {
    font-size: 0.95rem;
    color: #1f2b45;
    font-weight: 700;
  }
`;

export const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const MiniProgressBar = styled.div`
  width: 52px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;

  div {
    height: 100%;
    background: #1f2b45;
    border-radius: 999px;
  }
`;

export const CardAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;

  @media (max-width: 860px) {
    width: 100%;
  }
`;

export const ViewProfileBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: #1f2b45;
  color: #ffffff;
  border: 1.5px solid #1f2b45;
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(31, 43, 69, 0.15);
  white-space: nowrap;

  &:hover {
    background: #141d2e;
    border-color: #141d2e;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.25);
  }

  @media (max-width: 860px) {
    width: 100%;
  }
`;

/* ==================== DOSSIÊ DO ALUNO (ESTRUTURA ORIGINAL DIRETA) ==================== */

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  animation: fadeIn 0.35s ease-out;

  @media (max-width: 640px) {
    gap: 1rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #ffffff;
  color: #1f2b45;
  border: 1.5px solid #1f2b45;
  border-radius: 999px;
  padding: 0.5rem 1.25rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  box-shadow: 0 1px 3px rgba(31, 43, 69, 0.06);

  &:hover {
    background: #1f2b45;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.18);
    transform: translateX(-2px);
  }

  @media (max-width: 640px) {
    padding: 0.35rem 0.85rem;
    font-size: 0.78rem;
  }
`;

/* Header do Aluno em Azul Escuro Oficial */
export const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #1f2b45 0%, #151d2f 100%);
  border: 1.5px solid #1f2b45;
  border-radius: 16px;
  padding: 1.75rem 2.25rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 16px rgba(31, 43, 69, 0.08);
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    flex-direction: row;
    align-items: center;
    padding: 0.9rem 1rem;
    gap: 0.85rem;
    border-radius: 12px;
  }
`;

export const ProfileAvatar = styled.div<{ $bg: string; $color: string }>`
  width: 72px;
  height: 72px;
  min-width: 72px;
  border-radius: 16px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  border: 2.5px solid #ffffff;
  flex-shrink: 0;
  z-index: 1;

  @media (max-width: 640px) {
    width: 52px;
    height: 52px;
    min-width: 52px;
    border-radius: 12px;
    font-size: 1.25rem;
    border-width: 2px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  z-index: 1;
  min-width: 0;
  flex: 1;
`;

export const ProfileName = styled.h2`
  margin: 0;
  font-family: "Rubik", sans-serif;
  font-size: 1.6rem;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.25;
  word-break: break-word;

  @media (max-width: 640px) {
    font-size: 1.15rem;
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 0.45rem;
  align-items: center;
  flex-wrap: wrap;
`;

/* Container de Seção (Sem caixa externa redundante - idêntico ao original) */
export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;

  @media (max-width: 640px) {
    gap: 0.65rem;
  }
`;

export const SectionTitle = styled.h4`
  margin: 0;
  font-family: "Rubik", sans-serif;
  font-size: 1.05rem;
  color: #1f2b45;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #1f2b45;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    font-size: 0.95rem;
    gap: 0.4rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

/* 1. Grade de Perfil Acadêmico e Pessoal (5 cartões brancos diretos) */
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.55rem;
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.85rem 1.1rem;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
  transition: all 0.2s ease;
  min-width: 0;

  &:hover {
    border-color: #1f2b45;
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.06);
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
    gap: 0.2rem;
  }
`;

export const InfoLabel = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 0.72rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;

  svg {
    color: #1f2b45;
  }

  @media (max-width: 640px) {
    font-size: 0.67rem;
    gap: 0.3rem;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

export const InfoValue = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 0.925rem;
  color: #1f2b45;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

/* 2. Grade de Desempenho e Andamento */
export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.55rem;
  }
`;

export const ProgressContainer = styled.div`
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 0.75rem 0.85rem;
    border-radius: 10px;
    gap: 0.5rem;
  }
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressPercentage = styled.span`
  color: #1f2b45;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: 0.95rem;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: #1f2b45;
  border-radius: 999px;
  width: ${({ $progress }) => $progress}%;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

/* 3. Linha do Tempo Acadêmica */
export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  padding-left: 2rem;
  width: 100%;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    left: 11px;
    top: 14px;
    bottom: 14px;
    width: 2px;
    background: #e2e8f0;
  }

  @media (max-width: 600px) {
    padding-left: 1.5rem;
    gap: 0.55rem;

    &::before {
      left: 9px;
    }
  }
`;

export const TimelineItem = styled(motion.div)`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const TimelineIcon = styled.div`
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #16a34a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow:
    0 0 0 4px #f8f9fa,
    0 2px 6px rgba(22, 163, 74, 0.25);
  flex-shrink: 0;

  @media (max-width: 600px) {
    left: -1.5rem;
    width: 20px;
    height: 20px;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

export const TimelineContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.9rem 1.25rem;
  flex: 1;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
  transition: all 0.2s ease;
  min-width: 0;
  box-sizing: border-box;

  &:hover {
    border-color: #1f2b45;
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.06);
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.65rem 0.8rem;
    border-radius: 10px;
    gap: 0.5rem;
  }
`;

export const TimelineInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex: 1;
`;

export const TimelineTitle = styled.span`
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  color: #1f2b45;
  font-size: 0.95rem;

  @media (max-width: 600px) {
    font-size: 0.825rem;
    word-break: break-word;
  }
`;

export const TimelineDate = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 0.825rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 500;

  svg {
    color: #94a3b8;
  }

  @media (max-width: 600px) {
    font-size: 0.725rem;
  }
`;

export const TimelineStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #bbf7d0;
  border-radius: 999px;
  font-family: "Rubik", sans-serif;
  font-size: 0.74rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 600px) {
    font-size: 0.68rem;
    padding: 0.18rem 0.5rem;
  }
`;

/* 4. Dossiê de Materiais */
export const MaterialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.55rem;
  }
`;

export const MaterialCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.85rem 1.1rem;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: #1f2b45;
    box-shadow: 0 6px 18px rgba(31, 43, 69, 0.12);
    transform: translateY(-2px);

    button {
      background: #1f2b45;
      color: #ffffff;
      border-color: #1f2b45;
    }
  }

  @media (max-width: 640px) {
    padding: 0.65rem 0.75rem;
    gap: 0.55rem;
    border-radius: 10px;
  }
`;

export const MaterialIcon = styled.div<{ $type: string }>`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ $type }) => {
    const t = ($type || "").toLowerCase();
    return t === "pdf" ? "#fee2e2" : t === "audio" ? "#ede9fe" : "#fef3c7";
  }};
  color: ${({ $type }) => {
    const t = ($type || "").toLowerCase();
    return t === "pdf" ? "#dc2626" : t === "audio" ? "#7c3aed" : "#d97706";
  }};

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    border-radius: 8px;

    svg {
      width: 17px;
      height: 17px;
    }
  }
`;

export const MaterialInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
  min-width: 0;
`;

export const MaterialTitle = styled.span`
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  color: #1f2b45;
  font-size: 0.925rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    font-size: 0.825rem;
  }
`;

export const MaterialMeta = styled.span`
  font-family: "Rubik", sans-serif;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    font-size: 0.72rem;
  }
`;

export const MaterialActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #f8fafc;
  color: #1f2b45;
  border: 1.5px solid #1f2b45;
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  font-family: "Rubik", sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #1f2b45;
    color: #ffffff;
    border-color: #1f2b45;
  }

  @media (max-width: 640px) {
    padding: 0.32rem 0.65rem;
    font-size: 0.72rem;
    gap: 0.2rem;

    svg {
      width: 13px;
      height: 13px;
    }
  }
`;

/* 5. Ações de Certificado */
export const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.65rem;
    margin-top: 0.5rem;

    button {
      width: 100%;
      justify-content: center;
      padding: 0.75rem 1.25rem;
      font-size: 0.88rem;
    }
  }
`;

export const SendCertificateBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #1f2b45;
  color: #ffffff;
  border: 2px solid #1f2b45;
  border-radius: 999px;
  padding: 0.85rem 2.25rem;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: 0.925rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(31, 43, 69, 0.2);

  &:hover {
    background: #141d2e;
    border-color: #141d2e;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(31, 43, 69, 0.3);
  }
`;

export const DownloadCertificateBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #ffffff;
  color: #1f2b45;
  border: 2px solid #1f2b45;
  border-radius: 999px;
  padding: 0.85rem 2.25rem;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: 0.925rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(31, 43, 69, 0.06);

  &:hover {
    background: #1f2b45;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(31, 43, 69, 0.15);
  }
`;
