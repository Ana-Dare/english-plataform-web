import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  animation: fadeIn 0.4s ease-out;
  font-family: "Rubik", sans-serif;

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
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;

    > div {
      width: 100%;
    }

    > button:last-child {
      grid-column: span 2;
      width: 100%;
      justify-content: center;
    }
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 16px;
  width: 320px;
  height: 48px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #c57a67;
    box-shadow: 0 0 0 3px rgba(197, 122, 103, 0.1);
  }

  svg {
    color: #94a3b8;
  }

  input {
    border: none;
    background: transparent;
    padding: 0 12px;
    width: 100%;
    height: 100%;
    font-size: 0.95rem;
    font-family: "Rubik", sans-serif;
    color: #1e293b;
    outline: none;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #1f2b45;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0 20px;
  height: 48px;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2d3e63;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(31, 43, 69, 0.2);
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
  border: 1px solid #f1f5f9;

  @media (max-width: 768px) {
    border: none;
    background: transparent;
    box-shadow: none;
    overflow-x: hidden;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
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
      gap: 16px;
      width: 100%;
    }
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 20px 24px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1f2b45;
  background-color: #f8fafc;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0;

  &:first-child {
    border-top-left-radius: 16px;
  }
  &:last-child {
    border-top-right-radius: 16px;
  }
`;

export const Tr = styled.tr`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: #fef6f5;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(197, 122, 103, 0.12);
    position: relative;
    z-index: 10;

    td {
      border-bottom-color: transparent;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 16px;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(197, 122, 103, 0.15);
      border-color: #c57a67;
    }
  }
`;

export const Td = styled.td`
  padding: 24px 20px;
  font-size: 0.95rem;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 400;
  vertical-align: middle;
  transition: border-color 0.3s ease;

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
      font-size: 0.75rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    > div,
    > span {
      text-align: right;
    }
  }
`;

export const StudentCell = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  border: 1px solid ${({ $color }) => `${$color}30`};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: #1e293b;
    font-weight: 500;
    font-size: 1.05rem;
  }
`;

export const LevelBadge = styled.span<{ $color: string }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
`;

export const StatusBadge = styled.span<{ $status?: string; $active?: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;

  ${({ $status, $active }) => {
    // String mode (list view)
    if ($status !== undefined) {
      if ($status === "Ativo") {
        return `background-color: #EFF6FF; color: #3B82F6;`;
      }
      if ($status === "Inativo") {
        return `background-color: #F1F5F9; color: #94A3B8;`;
      }
      if ($status === "Trancado") {
        return `background-color: #F1F5F9; color: #475569;`;
      }
      return `background-color: #F1F5F9; color: #64748B;`;
    }

    // Boolean mode (detail view)
    if ($active) {
      return `background-color: #dcfce7; color: #166534;`;
    }
    return `background-color: #f1f5f9; color: #64748b;`;
  }}
`;

export const MediaDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #1e293b;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .dot.good {
    background-color: #22c55e;
  }
  .dot.average {
    background-color: #f59e0b;
  }
  .dot.bad {
    background-color: #ef4444;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  span {
    color: #64748b;
    font-size: 0.9rem;
  }
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f8fafc;
    color: #1e293b;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.button<{ $active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: ${({ $active }) => ($active ? "#C57A67" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "#475569")};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? "#A46352" : "#F1F5F9")};
  }
`;

export const PlanBadge = styled.span<{ $plan: number }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  background-color: ${({ $plan }) => ($plan === 1 ? "#FEF6F5" : "#F1F5F9")};
  color: ${({ $plan }) => ($plan === 1 ? "#C57A67" : "#64748B")};
`;

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  animation: fadeIn 0.4s ease-out;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
  overflow: hidden;
`;

export const DetailHeader = styled.div`
  background: #1f2b45;
  padding: 32px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DetailBackBtn = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
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
  gap: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const DetailAvatar = styled.div<{ $color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: ${({ $color }) => $color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export const DetailNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
  }

  span {
    color: #94a3b8;
    font-size: 0.95rem;
  }
`;

export const DetailStatusBadge = styled.span<{ $active: boolean }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  background: ${({ $active }) => ($active ? "#22C55E20" : "#EF444420")};
  color: ${({ $active }) => ($active ? "#4ADE80" : "#F87171")};
  width: fit-content;
`;

export const DetailBody = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  background: white;
`;

export const DetailSectionTitle = styled.h3<{ $bg: string; $color: string }>`
  margin: 0;
  padding: 16px 24px;
  background-color: ${({ $bg }) => $bg};
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #e2e8f0;

  .icon-box {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: ${({ $color }) => `${$color}20`};
    color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 24px;
  padding: 32px 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 24px 20px;
    gap: 24px;
  }
`;

export const DetailField = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  width: 100%;

  &.align-top {
    align-items: flex-start;
  }

  .field-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #f8fafc;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  }

  &.align-top .field-icon {
    margin-top: 4px;
  }

  .field-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 0;

    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 14px;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      font-family: "Rubik", sans-serif;
      font-size: 0.95rem;
      color: #1e293b;
      background: #f8fafc;
      outline: none;
      transition: all 0.2s ease;

      &:focus {
        background: #fff;
        border-color: #c57a67;
        box-shadow: 0 0 0 4px rgba(197, 122, 103, 0.1);
      }

      &:hover:not(:focus) {
        border-color: #cbd5e1;
      }
    }

    textarea {
      min-height: 100px;
      resize: vertical;
      line-height: 1.5;
    }
  }
`;

export const DetailFieldLabel = styled.label`
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DetailFieldValue = styled.div`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
  word-break: break-word;
`;

export const DetailActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 24px 32px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const DetailActionBtn = styled.button<{ $variant: string }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant }) => {
    if ($variant === "primary") {
      return `
        background: #1F2B45;
        color: white;
        border: none;
        &:hover { background: #2D3E63; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(31,43,69,0.2); }
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
  overflow: hidden;
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
