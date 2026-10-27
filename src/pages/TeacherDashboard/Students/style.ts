import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 2vw, 18px);
  width: 100%;
  animation: fadeIn 0.4s ease-out;
  font-family: "Rubik", sans-serif;

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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loading = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  height: 100%;
  flex: 1;
  justify-content: center;
  width: 100%;

  + i {
    margin-right: 8px;
  }

  &:before {
    animation: 1.5s linear infinite ${spin};
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    border-color: #343a40;
    content: "";
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    will-change: transform;
    transition: all 0.2s ease;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }
`;

export const FiltersRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

export const FiltersContainer = styled(FiltersRow)``;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1.5px solid #1f2b45;
  border-radius: 999px;
  padding: 0 16px;
  width: 300px;
  min-width: 220px;
  max-width: 100%;
  height: 44px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;

  &:focus-within {
    border-color: #2a4a7f;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
  }

  svg {
    color: #94a3b8;
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    padding: 0 10px;
    width: 100%;
    min-width: 0;
    height: 100%;
    font-size: 0.9375rem;
    font-family: "Rubik", sans-serif;
    color: #1e293b;
    outline: none;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #1f2b45;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 0 22px;
  height: 44px;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.25;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(31, 43, 69, 0.15);
  transition: all 0.2s ease;

  svg {
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
    flex-shrink: 0;
  }

  &:hover:not(:disabled) {
    background-color: #151d2f;
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.25);
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    background-color: #0f172a;
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow-x: auto;
  border: 1.5px solid #e2e8f0;

  @media (max-width: 768px) {
    border: none;
    background: transparent;
    box-shadow: none;
    overflow-x: visible;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 820px;
  font-family: "Rubik", sans-serif;

  @media (max-width: 768px) {
    display: block;
    min-width: 100%;

    thead {
      display: none;
    }

    tbody {
      display: flex;
      flex-direction: column;
      gap: 14px;
      width: 100%;
    }
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 16px 20px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #1f2b45;
  background-color: #f8fafc;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-bottom: 1.5px solid #e2e8f0;
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 14px;
  }
  &:last-child {
    border-top-right-radius: 14px;
    text-align: right;
    padding-right: 24px;
  }
`;

export const Tr = styled.tr<{ $inactive?: boolean; $isExpanded?: boolean }>`
  transition: background-color 0.18s ease, border-color 0.18s ease;
  cursor: pointer;
  background-color: ${({ $inactive }) => ($inactive ? "#fafbfd" : "#ffffff")};

  ${({ $inactive }) =>
    $inactive &&
    `
    opacity: 0.82;
  `}

  &:hover {
    background-color: ${({ $inactive }) => ($inactive ? "#f1f5f9" : "#f8fafc")};
  }

  &:hover td {
    background-color: ${({ $inactive }) => ($inactive ? "#f1f5f9" : "#f8fafc")};
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: -2px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 14px 16px;
    gap: 10px;
    border-radius: 16px;
    border: 1.5px solid
      ${({ $inactive, $isExpanded }) =>
        $isExpanded
          ? "#1F2B45"
          : $inactive
            ? "#cbd5e1"
            : "#e2e8f0"};
    background-color: ${({ $inactive }) => ($inactive ? "#f8fafc" : "#ffffff")};
    box-shadow: ${({ $isExpanded }) =>
      $isExpanded
        ? "0 4px 16px rgba(31, 43, 69, 0.08)"
        : "0 1px 4px rgba(0, 0, 0, 0.03)"};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background-color: ${({ $inactive }) => ($inactive ? "#f1f5f9" : "#ffffff")};
      border-color: ${({ $isExpanded }) => ($isExpanded ? "#1F2B45" : "#cbd5e1")};
    }
  }
`;

export const Td = styled.td<{ $secondaryOnMobile?: boolean; $isExpanded?: boolean }>`
  padding: 16px 20px;
  font-size: 0.92rem;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
  transition: background-color 0.18s ease;

  &:last-child {
    text-align: right;
    padding-right: 24px;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    border: none;
    width: 100%;

    &::before {
      content: attr(data-label);
      font-weight: 700;
      font-size: 0.74rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    ${({ $secondaryOnMobile, $isExpanded }) =>
      $secondaryOnMobile &&
      !$isExpanded &&
      css`
        display: none !important;
      `}

    ${({ $secondaryOnMobile, $isExpanded }) =>
      $secondaryOnMobile &&
      $isExpanded &&
      css`
        display: flex !important;
        animation: mobileDetailFadeIn 0.22s ease-out;
        padding-top: 6px;
        padding-bottom: 6px;
        border-top: 1px dashed #f1f5f9;

        @keyframes mobileDetailFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}

    &[data-label="Nome"] {
      &::before {
        display: none;
      }
    }

    &[data-label="Ações"] {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      padding-top: 10px;
      border-top: 1px solid #f1f5f9;

      &::before {
        display: none;
      }
    }
  }
`;

export const StudentCell = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Avatar = styled.div<{ $color: string; $inactive?: boolean }>`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background-color: ${({ $color, $inactive }) =>
    $inactive ? "#e2e8f0" : `${$color}15`};
  color: ${({ $color, $inactive }) => ($inactive ? "#64748b" : $color)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.88rem;
  border: 1.5px solid
    ${({ $color, $inactive }) => ($inactive ? "#cbd5e1" : `${$color}35`)};
  overflow: hidden;
  user-select: none;
  filter: ${({ $inactive }) => ($inactive ? "grayscale(90%)" : "none")};
  opacity: ${({ $inactive }) => ($inactive ? 0.75 : 1)};
  transition: all 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const StudentInfo = styled.div<{ $inactive?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    color: ${({ $inactive }) => ($inactive ? "#64748b" : "#0f172a")};
    font-weight: 600;
    font-size: 0.95rem;
    transition: color 0.2s ease;
  }

  .inactive-tag {
    display: inline-flex;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 600;
    color: #64748b;
    background: #f1f5f9;
    padding: 1px 6px;
    border-radius: 4px;
    width: fit-content;
    line-height: 1.2;
    border: 1px solid #e2e8f0;
  }
`;

export const LevelBadge = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background-color: ${({ $color }) => ($color ? `${$color}18` : "#f1f5f9")};
  color: ${({ $color }) => $color || "#475569"};
  border: 1px solid ${({ $color }) => ($color ? `${$color}35` : "#e2e8f0")};
`;

export const StatusBadge = styled.span<{ $status?: string; $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;

  ${({ $status, $active }) => {
    const isAtivo = $status === "Ativo" || $active === true;
    const isTrancado = $status === "Trancado";

    if (isAtivo) {
      return `
        background-color: #ecfdf5;
        color: #15803d;
        border: 1px solid #bbf7d0;
        &::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #16a34a;
        }
      `;
    }

    if (isTrancado) {
      return `
        background-color: #fffbeb;
        color: #b45309;
        border: 1px solid #fde68a;
        &::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #d97706;
        }
      `;
    }

    // Inativo
    return `
      background-color: #f1f5f9;
      color: #64748b;
      border: 1px solid #e2e8f0;
      &::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #94a3b8;
      }
    `;
  }}
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 90px;

  .progress-percent {
    font-size: 0.85rem;
    font-weight: 700;
    color: #1f2b45;
    line-height: 1;
  }
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background: #f1f5f9;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const ProgressBarFill = styled.div<{ $width: number }>`
  width: ${({ $width }) => Math.min(Math.max($width, 0), 100)}%;
  height: 100%;
  background: #c57a67;
  border-radius: 999px;
  transition: width 0.3s ease;
`;

export const ActionsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ActionButtonsGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const MobileExpandBtn = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    padding: 6px 14px;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: inherit;
    color: #1F2B45;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #e2e8f0;
    }

    svg {
      color: #64748b;
    }
  }
`;

export const MobileDossierRow = styled.div<{ $isExpanded?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isExpanded }) => ($isExpanded ? "flex" : "none")};
    width: 100%;
    padding-top: 10px;
    border-top: 1px dashed #e2e8f0;
    margin-top: 2px;
  }
`;

export const MobileDossierBtn = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #1F2B45;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  height: 42px;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(31, 43, 69, 0.18);
  transition: all 0.2s ease;

  &:hover {
    background: #151d2f;
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.28);
  }
`;

export const ActionIconButton = styled.button<{
  $variant?: "edit" | "power";
  $isActive?: boolean;
}>`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1.5px solid
    ${({ $variant, $isActive }) =>
      $variant === "power"
        ? $isActive
          ? "#fecaca"
          : "#86efac"
        : "#1F2B45"};
  background: ${({ $variant, $isActive }) =>
    $variant === "power"
      ? $isActive
        ? "#fff5f5"
        : "#ecfdf5"
      : "#ffffff"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ $variant, $isActive }) =>
    $variant === "power" ? ($isActive ? "#dc2626" : "#16a34a") : "#1F2B45"};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $variant, $isActive }) =>
    $variant === "power"
      ? $isActive
        ? "0 1px 3px rgba(220, 38, 38, 0.1)"
        : "0 1px 3px rgba(22, 163, 74, 0.2)"
      : "0 1px 2px rgba(31, 43, 69, 0.05)"};

  &:hover:not(:disabled) {
    background: ${({ $variant, $isActive }) =>
      $variant === "power"
        ? $isActive
          ? "#fee2e2"
          : "#dcfce7"
        : "#f8fafc"};
    border-color: ${({ $variant, $isActive }) =>
      $variant === "power"
        ? $isActive
          ? "#f87171"
          : "#4ade80"
        : "#2a4a7f"};
    color: ${({ $variant, $isActive }) =>
      $variant === "power"
        ? $isActive
          ? "#b91c1c"
          : "#15803d"
        : "#2a4a7f"};
    transform: translateY(-1px);
    box-shadow: ${({ $variant, $isActive }) =>
      $variant === "power"
        ? $isActive
          ? "0 3px 8px rgba(220, 38, 38, 0.2)"
          : "0 3px 8px rgba(22, 163, 74, 0.25)"
        : "0 3px 8px rgba(31, 43, 69, 0.12)"};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ $variant, $isActive }) =>
        $variant === "power"
          ? $isActive
            ? "#ef4444"
            : "#16a34a"
          : "#3b82f6"};
    outline-offset: 1px;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const IconButton = ActionIconButton;

export const PaginationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 12px 0 8px;
  flex-wrap: nowrap;
  width: 100%;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const PaginationContainer = PaginationFooter;

export const PaginationLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const PageSizeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #475569;
  font-family: "Rubik", sans-serif;
  white-space: nowrap;
  flex-shrink: 0;

  span.label {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 0.78rem;
    gap: 4px;
  }
`;

export const ShowingInfo = styled.span`
  color: #64748b;
  font-size: 0.875rem;
  font-family: "Rubik", sans-serif;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PaginationNav = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const PageNavButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1.5px solid #e2e8f0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: #1f2b45;
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PageNumberButton = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 999px;
  border: ${({ $active }) => ($active ? "none" : "1px solid transparent")};
  background: ${({ $active }) => ($active ? "#1f2b45" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#475569")};
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  font-size: 0.88rem;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? "#1f2b45" : "#f1f5f9")};
    color: ${({ $active }) => ($active ? "#ffffff" : "#1f2b45")};
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

export const PageNumber = PageNumberButton;

export const PageEllipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 36px;
  color: #94a3b8;
  font-weight: 700;
  user-select: none;
`;

export const PlanBadge = styled.span<{ $plan: number }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  background-color: ${({ $plan }) => ($plan === 1 ? "#FEF6F5" : "#F1F5F9")};
  color: ${({ $plan }) => ($plan === 1 ? "#C57A67" : "#64748B")};
`;
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 12px;
  }
`;

export const DetailHeader = styled.div`
  background: #1f2b45;
  padding: clamp(1rem, 2vw, 1.35rem) clamp(1rem, 2.5vw, 1.5rem);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 12px 14px;
    gap: 10px;
  }
`;

export const DetailBackBtn = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8125rem;
  width: fit-content;
  transition: all 0.2s;
  font-family: "Rubik", sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const DetailHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: row;
    align-items: center;
  }
`;

export const DetailAvatar = styled.div<{ $color: string }>`
  width: 58px;
  height: 58px;
  min-width: 58px;
  border-radius: 14px;
  background-color: ${({ $color }) => $color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.35rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
  }

  @media (max-width: 600px) {
    width: 48px;
    height: 48px;
    min-width: 48px;
    border-radius: 12px;
    font-size: 1.15rem;
  }
`;

export const DetailNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  h2 {
    margin: 0;
    font-size: clamp(1.15rem, 2vw + 0.6rem, 1.45rem);
    font-weight: 700;
    line-height: 1.25;
    color: #ffffff;
    word-break: break-word;

    @media (max-width: 600px) {
      font-size: 1.1rem;
    }
  }

  span {
    color: #cbd5e1;
    font-size: 0.8rem;
    line-height: 1.3;
  }
`;

export const DetailStatusBadge = styled.span<{ $active: boolean }>`
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${({ $active }) => ($active ? "#22C55E20" : "#EF444420")};
  color: ${({ $active }) => ($active ? "#4ADE80" : "#F87171")};
  width: fit-content;
  margin-top: 2px;
`;

export const DetailBody = styled.div`
  padding: clamp(14px, 2vw, 20px);
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 768px) {
    padding: 10px 8px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px 6px;
    gap: 10px;
  }
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
`;

export const DetailSectionTitle = styled.h3<{ $bg: string; $color: string }>`
  margin: 0;
  padding: 10px 14px;
  background-color: ${({ $bg }) => $bg};
  color: #1e293b;
  font-size: 0.925rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #e2e8f0;

  .icon-box {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background-color: ${({ $color }) => `${$color}20`};
    color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: 600px) {
    padding: 9px 12px;
    font-size: 0.85rem;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 18px;
  padding: 14px 16px 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 12px 10px 14px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 10px 8px 12px;
    gap: 10px;
  }
`;

export const DetailObservationsWrapper = styled.div`
  padding: 14px 16px 16px;

  @media (max-width: 768px) {
    padding: 12px 10px 14px;
  }

  @media (max-width: 480px) {
    padding: 10px 8px 12px;
  }
`;

export const DetailField = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;

  &.align-top {
    align-items: flex-start;
  }

  .field-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: #f8fafc;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    margin-top: 17px;
    transition: all 0.2s ease;

    svg {
      width: 16px;
      height: 16px;
    }

    @media (max-width: 600px) {
      width: 30px;
      height: 30px;
      border-radius: 7px;
      margin-top: 15px;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }

  &:focus-within .field-icon {
    border-color: #c57a67;
    color: #c57a67;
    background: #fff7f5;
  }

  .field-content {
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
    min-width: 0;
    position: relative;

    > input,
    > select,
    > textarea {
      width: 100%;
      height: 38px;
      box-sizing: border-box;
      padding: 6px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-family: "Rubik", sans-serif;
      font-size: 0.885rem;
      color: #1e293b;
      background: #f8fafc;
      outline: none;
      transition: all 0.2s ease;

      &::placeholder {
        color: #94a3b8;
      }

      &:focus {
        background: #fff;
        border-color: #c57a67;
        box-shadow: 0 0 0 3px rgba(197, 122, 103, 0.1);
      }

      &:hover:not(:focus) {
        border-color: #94a3b8;
      }

      &.error,
      &[aria-invalid="true"] {
        border-color: #ef4444;
        background: #fff5f5;

        &:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
      }
    }

    textarea {
      min-height: 75px;
      height: auto;
      resize: vertical;
      line-height: 1.4;
      padding: 8px 12px;
    }
  }
`;

export const DetailFieldLabel = styled.label`
  font-size: 0.69rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1.2;

  span.required,
  span {
    color: #ef4444;
    font-weight: 700;
  }
`;

export const DetailFieldValue = styled.div`
  font-size: 0.915rem;
  color: #1e293b;
  font-weight: 600;
  word-break: break-word;
  min-height: 38px;
  padding: 0 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  line-height: 1.35;
`;

export const DetailActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 12px 18px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px 12px;
    gap: 8px;
  }
`;

export const DetailActionBtn = styled.button<{ $variant: string }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;

  @media (max-width: 600px) {
    width: 100%;
    padding: 9px 12px;
  }

  ${({ $variant }) => {
    if ($variant === "primary") {
      return `
        background: #1F2B45;
        color: white;
        border: none;
        &:hover { background: #2D3E63; transform: translateY(-1px); box-shadow: 0 2px 8px rgba(31,43,69,0.18); }
      `;
    }
    if ($variant === "danger") {
      return `
        background: transparent;
        color: #EF4444;
        border: 1px solid #EF4444;
        &:hover { background: #FEF2F2; }
      `;
    }
    if ($variant === "success") {
      return `
        background: transparent;
        color: #16A34A;
        border: 1px solid #16A34A;
        &:hover { background: #F0FDF4; }
      `;
    }
    return `
      background: white;
      color: #475569;
      border: 1px solid #CBD5E1;
      &:hover { background: #F8FAFC; color: #1E293B; }
    `;
  }}
`;

export const FieldError = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: #d93025;
  margin-top: 0.1rem;
`;

export const RegisterInput = styled.input<{ $error?: boolean }>`
  padding: 0.65rem 1rem;
  border: 1.5px solid ${({ $error }) => ($error ? "#d93025" : "#8d8d8d")};
  border-radius: 14px;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #fdfcfb 100%);
  width: 100%;
  box-sizing: border-box;
  color: #1f2b45;
  &:focus {
    border-color: ${({ $error }) => ($error ? "#d93025" : "#C57A67")};
    box-shadow: ${({ $error }) =>
      $error
        ? "0 0 0 3px rgba(217, 48, 37, 0.12)"
        : "0 0 0 3px rgba(197, 122, 103, 0.12), 0 2px 8px rgba(197, 122, 103, 0.08)"};
    background: #fff;
  }
  &:hover:not(:focus) {
    border-color: ${({ $error }) => ($error ? "#d93025" : "#6b6b6b")};
  }
  &::placeholder {
    color: #888888;
  }
`;

export const RegisterSelect = styled.select`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1.5px solid #1f2b45;
  border-radius: 999px;
  padding: 0.75rem 2.4rem 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-family: "Rubik", inherit;
  font-weight: 500;
  color: #1f2b45;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231F2B45%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 52%;
  background-size: 0.7rem auto;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 2px 8px rgba(31, 43, 69, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: #2a4a7f;
    background-color: #f0f4fa;
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.15);
    color: #2a4a7f;
  }

  &:focus {
    border-color: #2a4a7f;
    box-shadow:
      0 0 0 3px rgba(31, 43, 69, 0.12),
      0 2px 8px rgba(31, 43, 69, 0.06);
    color: #2a4a7f;
    background-color: #f0f4fa;
  }
`;

export const RegisterTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1.5px solid #8d8d8d;
  border-radius: 14px;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #fdfcfb 100%);
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 140px;
  color: #1f2b45;
  line-height: 1.5;
  &:focus {
    border-color: #c57a67;
    box-shadow:
      0 0 0 3px rgba(197, 122, 103, 0.12),
      0 2px 8px rgba(197, 122, 103, 0.08);
    background: #fff;
  }
  &:hover:not(:focus) {
    border-color: #6b6b6b;
  }
  &::placeholder {
    color: #888888;
  }
`;

export const PlanSelector = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const PlanCard = styled.div<{
  $selected: boolean;
  $type: "Regular" | 1;
}>`
  flex: 1;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;

  ${({ $selected, $type }) =>
    $selected
      ? $type === 1
        ? css`
            background: #08142c; /* azul forte */
            border: 2px solid #08142c;
            color: #a4c2f4; /* azul fraco */
            box-shadow: 0 4px 12px rgba(8, 20, 44, 0.25);
            transform: translateY(-2px);
          `
        : css`
            background: #f8f9fc;
            border: 2px solid #08142c;
            color: #08142c;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transform: translateY(-2px);
          `
      : css`
          background: #fff;
          border: 1.5px solid #8d8d8d;
          color: #555;
          &:hover {
            border-color: #6b6b6b;
            background: #fafafa;
          }
        `}

  h5 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }
  p {
    margin: 0;
    font-size: 0.75rem;
    opacity: 0.8;
    line-height: 1.3;
  }
`;

export const PlanCheck = styled.div<{ $selected: boolean }>`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $selected }) =>
    $selected
      ? css`
          background: #fff;
          color: #08142c;
        `
      : css`
          background: #e0e0e0;
          color: transparent;
        `}
`;

export const RegisterFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.75rem;
  border-top: 1.5px solid #c4c4c4;
  background: linear-gradient(135deg, #faf8f7 0%, #f5f0ed 100%);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  @media (max-width: 600px) {
    padding: 1rem;
    flex-direction: column;
  }
`;

export const RegisterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

export const RegisterSectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2b45;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RegisterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const RegisterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RegisterLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #94a3b8;
  display: flex;
  align-items: center;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #475569;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    accent-color: #c57a67;
  }
`;

export const RegisterContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #eaeaea;
  position: relative;
  overflow: visible;
  animation: fadeIn 0.3s ease;
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

export const RegisterHeader = styled.div`
  background: linear-gradient(135deg, #f4f6fa 0%, #eaeef6 100%);
  border-bottom: 1px solid #e2e8f0;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 1.5rem 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
`;

export const RegisterHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  h2 {
    margin: 0;
    color: #1f2b45;
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: -0.2px;
  }
  p {
    margin: 0;
    color: #64748b;
    font-size: 0.82rem;
  }
`;

export const RegisterSteps = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const StepDot = styled.div<{ $active: boolean; $done: boolean }>`
  width: ${({ $active }) => ($active ? "28px" : "10px")};
  height: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  ${({ $active, $done }) =>
    $active
      ? css`
          background: #fff;
        `
      : $done
        ? css`
            background: rgba(255, 255, 255, 0.5);
          `
        : css`
            background: rgba(255, 255, 255, 0.2);
          `}
`;

export const RegisterBody = styled.div`
  padding: 2.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }
`;

export const PhotoUploadSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0 1.5rem;
  background: transparent;
  border-bottom: 1px solid #f1f5f9;
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const PhotoPreview = styled.div<{ $hasImage: boolean }>`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px dashed ${({ $hasImage }) => ($hasImage ? "#08142c" : "#c0c5d0")};
  background: ${({ $hasImage }) => ($hasImage ? "#fff" : "#eef1f6")};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  &:hover {
    border-color: #08142c;
    background: #e8ecf4;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  svg {
    color: #999;
  }
`;

export const PhotoUploadInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  h4 {
    margin: 0;
    font-size: 0.95rem;
    color: #08142c;
    font-weight: 600;
  }
  p {
    margin: 0;
    font-size: 0.78rem;
    color: #888;
    line-height: 1.4;
  }
`;

export const PhotoUploadBtn = styled.button`
  background: #08142c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  margin-top: 0.4rem;
  align-self: flex-start;
  transition: all 0.2s;
  &:hover {
    background: #1a3d6e;
  }
  @media (max-width: 600px) {
    align-self: center;
  }
`;
