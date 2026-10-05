import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  animation: fadeIn 0.4s ease-out forwards;

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

export const FilterSelect = styled.select`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1.5px solid #1f2b45;
  border-radius: 999px;
  padding: 0.55rem 2.4rem 0.55rem 1.1rem;
  font-size: 0.88rem;
  font-family: "Rubik", inherit;
  font-weight: 500;
  color: #1f2b45;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23C57A67%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.85rem top 52%;
  background-size: 0.6rem auto;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 2px 8px rgba(31, 43, 69, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  min-width: 160px;
  letter-spacing: 0.01em;
  white-space: nowrap;

  &:hover {
    border-color: #c57a67;
    background-color: #fff8f6;
    box-shadow: 0 4px 12px rgba(197, 122, 103, 0.18);
    color: #c57a67;
  }

  &:focus {
    border-color: #c57a67;
    box-shadow:
      0 0 0 3px rgba(197, 122, 103, 0.18),
      0 2px 8px rgba(31, 43, 69, 0.06);
    color: #c57a67;
    background-color: #fff8f6;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  width: 100%;
  min-width: 260px;
  max-width: 320px;
  flex-shrink: 0;
  border: 1px solid #1f2b45;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05);

  &:focus-within {
    border-color: #c57a67;
    box-shadow: 0 0 0 3px rgba(197, 122, 103, 0.15);
  }

  svg {
    color: #c57a67;
    margin-right: 0.8rem;
    flex-shrink: 0;
  }

  input {
    border: none;
    outline: none;
    font-size: 0.95rem;
    font-family: inherit;
    width: 100%;
    color: #1e293b;
    background: transparent;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 2px solid rgba(31, 43, 69, 0.1);
  padding-bottom: 0;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "#1F2B45" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#4D4D4D")};
  border: none;
  border-radius: 8px 8px 0 0;
  padding: 0.6rem 1.5rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  transform: translateY(2px);

  &:hover {
    color: ${({ $active }) => ($active ? "#fff" : "#1F2B45")};
  }
`;

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CertificateCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #1f2b45;
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    border-color: #cbd5e1;

    &::before {
      transform: scaleY(1);
    }

    button {
      background: #1f2b45;
      color: #fff;
      border-color: #1f2b45;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Avatar = styled.div<{ $bg: string; $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  flex-shrink: 0;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-family: "Rubik", sans-serif;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-left: 1.2rem;
  flex: 1;
`;

export const StudentName = styled.h3`
  margin: 0;
  font-family: "Rubik", sans-serif;
  font-size: 1.1rem;
  color: #1f2b45;
  font-weight: 700;
`;

export const LevelBadge = styled.span`
  background: rgba(197, 122, 103, 0.15);
  color: #c57a67;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-family: "Rubik", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
  align-self: flex-start;
`;

export const CardMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-family: "Rubik", sans-serif;

  span:first-child {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  span:last-child {
    font-size: 0.95rem;
    color: #1f2b45;
    font-weight: 700;
  }
`;

export const ViewProfileBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #1f2b45;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`;

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid rgba(31, 43, 69, 0.2);
  color: #1f2b45;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(31, 43, 69, 0.05);
  }
`;

export const DetailContainer = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #eef4fc 0%, #d8e5f5 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    right: -5%;
    top: -20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    border-radius: 50%;
  }
`;

export const ProfileAvatar = styled.div<{ $bg: string; $color: string }>`
  width: 90px;
  height: 90px;
  border-radius: 20px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border: 4px solid #fff;
  z-index: 1;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1;
`;

export const ProfileName = styled.h2`
  margin: 0;
  font-family: "Rubik", sans-serif;
  font-size: 1.8rem;
  color: #1f2b45;
  font-weight: 700;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export const PremiumCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(31, 43, 69, 0.04);
  border: 1px solid rgba(31, 43, 69, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: #888;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  transition: color 0.2s;

  &:hover {
    color: #1f2b45;
  }
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const SectionTitle = styled.h4`
  margin: 0;
  font-family: "Rubik", sans-serif;
  font-size: 1.2rem;
  color: #1f2b45;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #3b82f6; /* Azul claro acento */
  }
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProgressText = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2b45;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: #f59e0b; /* Amarelo/Laranja estilo andamento */
  border-radius: 4px;
  width: ${({ $progress }) => $progress}%;
  transition: width 1s ease-in-out;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fdfdfd;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  font-family: "Rubik", sans-serif;
  font-size: 0.95rem;
  color: #333;

  svg {
    color: #1f2b45;
    opacity: 0.7;
  }
`;

export const SendCertificateBtn = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1f2b45;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(31, 43, 69, 0.15);
  margin-top: 1rem;

  &:hover {
    background: #141d2e;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(31, 43, 69, 0.2);
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;

    button {
      width: 100%;
      justify-content: center;
      margin-top: 0;
    }
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: #fdfdfd;
  border: 1px solid rgba(31, 43, 69, 0.05);
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }
`;

export const InfoLabel = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

export const InfoValue = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 1rem;
  color: #1f2b45;
  font-weight: 500;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 11px;
    top: 10px;
    bottom: 10px;
    width: 2px;
    background: #eef4fc;
  }
`;

export const TimelineItem = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

export const TimelineIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #0f172a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
  box-shadow:
    0 0 0 4px #fff,
    0 2px 4px rgba(15, 23, 42, 0.2);
`;

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  flex: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
    border-color: #cbd5e1;
  }
`;

export const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const TimelineTitle = styled.span`
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  color: #1f2b45;
  font-size: 1.05rem;
`;

export const TimelineDate = styled.span`
  font-family: "Rubik", sans-serif;
  font-size: 0.85rem;
  color: #888;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const TimelineScore = styled.span<{ $score: number }>`
  font-family: "Rubik", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  background: ${({ $score }) =>
    $score >= 90 ? "#d4f5d4" : $score >= 70 ? "#fff3cc" : "#fce4e4"};
  color: ${({ $score }) =>
    $score >= 90 ? "#166534" : $score >= 70 ? "#854d0e" : "#991b1b"};
`;

export const TimelineActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: transparent;
  border: 1px solid rgba(31, 43, 69, 0.2);
  color: #1f2b45;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-family: "Rubik", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(31, 43, 69, 0.05);
    border-color: #1f2b45;
  }
`;

export const MaterialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
`;

export const MaterialCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.2rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);

  /* Framer motion handles transform, we just handle border and shadow */
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:hover {
    border-color: #c57a67;
    box-shadow: 0 8px 20px rgba(197, 122, 103, 0.15);
  }
`;

export const MaterialIcon = styled.div<{ $type: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $type }) =>
    $type === "PDF"
      ? "#fee2e2"
      : $type === "Audio"
        ? "#e0e7ff"
        : "rgba(197, 122, 103, 0.1)"};
  color: ${({ $type }) =>
    $type === "PDF" ? "#ef4444" : $type === "Audio" ? "#4f46e5" : "#C57A67"};
`;

export const MaterialInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const MaterialTitle = styled.span`
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  color: #1f2b45;
  font-size: 0.95rem;
`;

export const MaterialMeta = styled.span`
  font-family: "Rubik", sans-serif;
  color: #888;
  font-size: 0.8rem;
`;
