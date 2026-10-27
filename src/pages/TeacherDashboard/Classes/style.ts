import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  animation: fadeIn 0.3s ease-in-out;
  height: 100%;
`;

/* ================= Header da Página de Turmas ================= */

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

export const HeaderActions = PageHeader;

export const PageHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HeaderIconCircle = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 50%;
  background: #e0edff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d4ed8;
`;

export const HeaderTitleArea = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  h2 {
    margin: 0;
    font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
    line-height: 1.25;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0.25rem 0 0 0;
    font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
    line-height: 1.5;
    color: #64748b;
  }
`;

export const Title = styled.h2`
  font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
  line-height: 1.25;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

export const NewClassBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #0b2347;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 0 20px;
  height: 44px;
  font-weight: 600;
  font-family: inherit;
  font-size: 0.9375rem;
  line-height: 1.25;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(11, 35, 71, 0.2);

  &:hover:not(:disabled) {
    background-color: #071730;
    box-shadow: 0 6px 16px rgba(11, 35, 71, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const AddButton = NewClassBtn;

export const RightActions = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  width: fit-content;

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

/* ================= Barra de Filtros e Busca ================= */

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
`;

export const FilterSearchInput = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 999px;
  padding: 0 14px;
  height: 42px;
  flex: 1 1 260px;
  max-width: 340px;
  min-width: 200px;
  box-sizing: border-box;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #1f2b45;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
  }

  svg {
    color: #94a3b8;
    flex-shrink: 0;
    margin-right: 8px;
  }

  input {
    border: none;
    background: transparent;
    width: 100%;
    min-width: 0;
    height: 100%;
    font-size: 0.9375rem;
    color: #1e293b;
    outline: none;
    font-family: inherit;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 767px) {
    max-width: 100%;
    min-width: 0;
    width: 100%;
    flex: 1 1 100%;
  }
`;

export const SearchWrapper = FilterSearchInput;

export const FilterCarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const FilterCarouselViewport = styled.div<{
  $canScrollLeft?: boolean;
  $canScrollRight?: boolean;
}>`
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 22px;
      pointer-events: none;
      z-index: 2;
      transition: opacity 0.2s ease;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, #f8fafc 15%, rgba(248, 250, 252, 0));
      opacity: ${(p) => (p.$canScrollLeft ? 1 : 0)};
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, #f8fafc 15%, rgba(248, 250, 252, 0));
      opacity: ${(p) => (p.$canScrollRight ? 1 : 0)};
    }
  }
`;

export const CarouselArrowBtn = styled.button<{ $active?: boolean }>`
  display: none;

  @media (max-width: 767px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: 50%;
    border: 1.5px solid ${(p) => (p.$active ? "#cbd5e1" : "#e2e8f0")};
    background: #ffffff;
    color: ${(p) => (p.$active ? "#1f2b45" : "#94a3b8")};
    cursor: ${(p) => (p.$active ? "pointer" : "default")};
    opacity: ${(p) => (p.$active ? 1 : 0.45)};
    box-shadow: ${(p) =>
      p.$active ? "0 2px 6px rgba(15, 23, 42, 0.08)" : "none"};
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;

    &:active {
      transform: ${(p) => (p.$active ? "scale(0.94)" : "none")};
    }
  }
`;

export const FilterControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  min-width: 0;

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    scroll-behavior: smooth;
    padding: 2px 2px 4px;

    &::-webkit-scrollbar {
      display: none;
    }

    > div,
    > button {
      flex: 0 0 auto;
      width: auto;
    }
  }
`;

export const StatusFilterDot = styled.span<{ $color?: string; $ring?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(p) => p.$color || "#10b981"};
  box-shadow: 0 0 0 3px ${(p) => p.$ring || "#dcfce7"};
  display: inline-block;
  flex-shrink: 0;
  margin: 0 2px;
`;

export const FilterSelect = styled.select`
  height: 42px;
  border-radius: 999px;
  border: 1.5px solid #cbd5e1;
  background-color: #ffffff;
  padding: 0 34px 0 14px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;

  &:hover {
    border-color: #94a3b8;
    background-color: #f8fafc;
  }

  &:focus {
    border-color: #1f2b45;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.08);
  }
`;

export const FilterIconButton = styled.button`
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 999px;
  border: 1.5px solid #cbd5e1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #334155;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #94a3b8;
    color: #1f2b45;
  }

  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }
`;

export const ClearFiltersLink = styled.button`
  background: transparent;
  border: none;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  font-family: inherit;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s ease;

  &:hover {
    text-decoration: underline;
    color: #1d4ed8;
  }

  @media (max-width: 767px) {
    margin-left: auto;
    padding: 2px 4px;
  }
`;

/* ================= Cards de Turma (Sem Capa, com Usuários) ================= */

export const ClassesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const TurmaCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  transition: all 0.22s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
    transform: translateY(-2px);
  }
`;

export const ClassCard = TurmaCard;

export const TurmaCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  .title-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;

    h3 {
      margin: 0;
      font-size: 1.18rem;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.2px;
      line-height: 1.3;
    }
  }

  p.description {
    margin: 0;
    font-size: 0.84rem;
    color: #64748b;
    line-height: 1.4;
  }
`;

export const ClassCardHeader = styled.div<{ $level?: string }>``;

export const LevelBadgeSolid = styled.span<{ $levelColor: string }>`
  background-color: ${({ $levelColor }) => $levelColor};
  color: #ffffff;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 9999px;
  letter-spacing: 0.5px;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const LevelBadge = LevelBadgeSolid;

export const TurmaStudentsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  .left-area {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }
`;

export const AvatarStack = styled.div`
  display: flex;
  align-items: center;
`;

export const StackedAvatar = styled.div<{
  $bg: string;
  $color: string;
  $index: number;
}>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  border: 2px solid #ffffff;
  margin-left: ${({ $index }) => ($index > 0 ? "-7px" : "0")};
  user-select: none;
  flex-shrink: 0;
`;

export const StudentsCountText = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.84rem;
  font-weight: 600;
  color: #475569;

  svg {
    color: #64748b;
  }
`;

export const TurmaStatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
  white-space: nowrap;

  ${({ $active }) =>
    $active
      ? `
    background-color: #ecfdf5;
    color: #16a34a;
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #16a34a;
    }
  `
      : `
    background-color: #fffbeb;
    color: #d97706;
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #d97706;
    }
  `}
`;

export const TurmaProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;

    .progress-label {
      color: #64748b;
      font-weight: 500;
    }

    .progress-value {
      color: #0f172a;
      font-weight: 700;
    }
  }
`;

export const TurmaProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
`;

export const TurmaProgressBarFill = styled.div<{ $width: number }>`
  width: ${({ $width }) => Math.min(Math.max($width, 0), 100)}%;
  height: 100%;
  background-color: #2563eb;
  border-radius: 9999px;
  transition: width 0.3s ease;
`;

export const TurmaNextLessonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: #64748b;

  svg {
    color: #64748b;
    flex-shrink: 0;
  }
`;

export const TurmaCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid #f1f5f9;

  .view-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #0f172a;
    transition: color 0.15s ease;

    &:hover {
      color: #2563eb;
    }
  }

  button.more-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    padding: 4px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
  }
`;

export const ClassCardBody = styled.div``;
export const ClassCardInfo = styled.div``;
export const StudentsPreview = AvatarStack;
export const StudentAvatarSmall = StackedAvatar;
export const MoreStudents = styled.div``;

/* ================= Paginação de Turmas ================= */

export const ClassesPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 1rem;
  width: 100%;
  flex-wrap: nowrap;

  @media (max-width: 680px) {
    gap: 0.5rem;
  }
`;

export const PaginationSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #64748b;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 680px) {
    font-size: 0.78rem;
    gap: 4px;
  }
`;

export const PaginationButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  @media (max-width: 680px) {
    gap: 4px;
  }
`;

export const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1.5px solid ${({ $active }) => ($active ? "#0b2347" : "#e2e8f0")};
  background-color: ${({ $active }) => ($active ? "#0b2347" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#475569")};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background-color: ${({ $active }) => ($active ? "#0b2347" : "#f8fafc")};
    border-color: ${({ $active }) => ($active ? "#0b2347" : "#cbd5e1")};
    color: ${({ $active }) => ($active ? "#ffffff" : "#0f172a")};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 680px) {
    min-width: 30px;
    height: 32px;
    padding: 0 8px;
    font-size: 0.75rem;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const EmptyClassesState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: #ffffff;
  border-radius: 16px;
  border: 1.5px dashed #cbd5e1;
  text-align: center;
  gap: 1rem;
  grid-column: 1 / -1;

  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
  }

  h4 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #64748b;
    max-width: 400px;
  }
`;

/* ================= Detail Workspace ================= */

export const DetailContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  border: 1px solid #eaeaea;
`;

export const DetailHeader = styled.div`
  background: linear-gradient(135deg, #08142c 0%, #1a3d6e 100%);
  padding: 2rem 2.5rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DetailBackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  align-self: flex-start;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const DetailHeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
`;

export const DetailTabs = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0 2.5rem;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 1.2rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "#08142c" : "#777")};
  border-bottom: 3px solid
    ${({ $active }) => ($active ? "#08142c" : "transparent")};
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #08142c;
  }
`;

export const DetailContent = styled.div`
  padding: 2.5rem;
  flex: 1;
  background: #fff;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.02em;

  svg {
    color: #3b82f6;
  }
`;

export const CreatePostBox = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s ease;

  &:focus-within {
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
  }

  textarea {
    width: 100%;
    min-height: 120px;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-family: inherit;
    font-size: 1rem;
    resize: none;
    outline: none;
    background: #f8fafc;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus {
      background: #ffffff;
      border-color: #3b82f6;
      box-shadow: inset 0 0 0 1px #3b82f6;
    }
  }
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PostCard = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  strong {
    color: #1e293b;
    font-size: 1.05rem;
  }

  span {
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
  }
`;

export const PostContent = styled.p`
  color: #334155;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
  white-space: pre-wrap;
`;

/* ================= Materiais & Atividades ================= */

export const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const MaterialCard = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  cursor: pointer;

  &:hover {
    border-color: #08142c;
    box-shadow: 0 8px 25px rgba(8, 20, 44, 0.1);
    transform: translateY(-4px);
  }
`;

export const MaterialIcon = styled.div<{ $type: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $type }) => {
    switch ($type) {
      case "pdf":
        return "#fce8e6";
      case "video":
        return "#fef7e0";
      case "link":
        return "#e8eaed";
      default:
        return "#e8eef4";
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case "pdf":
        return "#d93025";
      case "video":
        return "#f9ab00";
      case "link":
        return "#5f6368";
      default:
        return "#1a73e8";
    }
  }};
`;

export const MaterialInfo = styled.div`
  h4 {
    margin: 0 0 0.4rem 0;
    font-size: 1.1rem;
    color: #1a1a1a;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: #666;
    line-height: 1.4;
  }
`;

/* ================= Agenda ================= */

export const ClassAgendaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const AgendaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(to right, #ffffff, #f8fbff);
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-left: 5px solid #3b82f6;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
    background: linear-gradient(to right, #ffffff, #f0f7ff);
  }
`;

export const AgendaDateBox = styled.div`
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border: 1px solid #7dd3fc;
  color: #0369a1;
  min-width: 75px;
  height: 75px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(56, 189, 248, 0.2);

  strong {
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1;
    color: #0c4a6e;
  }

  span {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    color: #0284c7;
    margin-top: 0.3rem;
    letter-spacing: 0.05em;
  }
`;

export const AgendaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;

  strong {
    color: #1e293b;
    font-size: 1.15rem;
    font-weight: 600;
  }

  span {
    color: #64748b;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }
`;

/* ================= Modal de Criação ================= */

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-in-out;
`;

export const ModalContent = styled.div<{ $expanded?: boolean }>`
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: ${({ $expanded }) => ($expanded ? "800px" : "600px")};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fc;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #08142c;
    font-weight: 700;
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: #f8f9fc;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #555;
  }

  input,
  select {
    padding: 0.75rem 1rem;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: #08142c;
      box-shadow: 0 0 0 3px rgba(8, 20, 44, 0.08);
    }
  }
`;

export const StudentListSelect = styled.div`
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
`;

export const StudentSelectItem = styled.div<{ $selected: boolean }>`
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $selected }) => ($selected ? "#f0f4f8" : "#fff")};

  &:hover {
    background: #f8f9fc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const StudentSelectInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 0.9rem;
    color: #1a1a1a;
  }
  span {
    font-size: 0.75rem;
    color: #888;
  }
`;

export const CheckCircle = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ $selected }) => ($selected ? "#08142c" : "#d0d0d0")};
  background: ${({ $selected }) => ($selected ? "#08142c" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #eaeaea;
    color: #333;
  }
`;

export const PrimaryBtn = styled.button`
  background: #08142c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: #1a3d6e;
  }
`;

export const SecondaryBtn = styled.button`
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: #e0e0e0;
  }
`;

export const DropzoneContainer = styled.div<{ $isDragActive?: boolean }>`
  border: 2px dashed
    ${({ $isDragActive }) => ($isDragActive ? "#08142c" : "#d0d0d0")};
  background-color: ${({ $isDragActive }) =>
    $isDragActive ? "#f0f4f8" : "#fafafa"};
  border-radius: 12px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;

  svg {
    color: ${({ $isDragActive }) => ($isDragActive ? "#08142c" : "#888")};
    width: 48px;
    height: 48px;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    color: #555;
    font-size: 1rem;
    font-weight: 500;
  }

  span {
    color: #888;
    font-size: 0.85rem;
  }

  &:hover {
    border-color: #08142c;
    background-color: #f8f9fc;
  }
`;

export const RichTextWrapper = styled.div`
  .quill {
    background: #fff;
    border-radius: 8px;

    .ql-toolbar {
      border: 1px solid #d0d0d0;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background: #f8f9fc;
    }

    .ql-container {
      border: 1px solid #d0d0d0;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      min-height: 150px;
      font-family: inherit;
      font-size: 0.95rem;
    }

    .ql-editor {
      min-height: 150px;
    }
  }
`;

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const StudentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(8, 20, 44, 0.08);
    border-color: #08142c;
  }
`;

export const JustificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const JustificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

export const JustificationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h4 {
    margin: 0;
    color: #1a1a1a;
    font-size: 1.1rem;
  }

  span {
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

export const JustificationStatus = styled.div<{ $status: string }>`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $status }) =>
    $status === "Aceito"
      ? "#e6f4ea"
      : $status === "Recusado"
        ? "#fce8e6"
        : "#fef7e0"};
  color: ${({ $status }) =>
    $status === "Aceito"
      ? "#1e8e3e"
      : $status === "Recusado"
        ? "#d93025"
        : "#f9ab00"};
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-left: 1.5rem;
`;

export const JustificationActionBtn = styled.button<{
  $type: "approve" | "reject";
}>`
  background: ${({ $type }) =>
    $type === "approve" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${({ $type }) => ($type === "approve" ? "#10b981" : "#ef4444")};
  border: 1px solid
    ${({ $type }) =>
      $type === "approve"
        ? "rgba(16, 185, 129, 0.2)"
        : "rgba(239, 68, 68, 0.2)"};
  border-radius: 50px;
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ $type }) => ($type === "approve" ? "#10b981" : "#ef4444")};
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      ${({ $type }) =>
        $type === "approve"
          ? "rgba(16, 185, 129, 0.25)"
          : "rgba(239, 68, 68, 0.25)"};
  }

  &:active {
    transform: translateY(0);
  }
`;

