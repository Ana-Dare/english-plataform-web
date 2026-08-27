import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
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
  flex-wrap: wrap;
  gap: 1rem;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  width: 300px;
  max-width: 100%;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: #08142c;
  }

  svg {
    color: #888;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  input {
    border: none;
    outline: none;
    font-size: 0.9rem;
    font-family: "Rubik", sans-serif;
    width: 100%;
    color: #333;

    &::placeholder {
      color: #999;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 0.85rem;
    color: #666;
    margin-right: 0.5rem;
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

export const IconButton = styled.button`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f5f5f5;
    border-color: #d0d0d0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AddButton = styled.button`
  background-color: #08142c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-family: "Rubik", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #1a3d6e;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(8, 20, 44, 0.2);
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const TableContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #eaeaea;
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 900px;
`;

export const Th = styled.th`
  background-color: #08142c;
  color: #fff;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0.85rem 1.2rem;
  font-weight: 600;
`;

export const Tr = styled.tr`
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0ead0;

  &:last-child {
    border-bottom: none;
  }

  /* Alternating row colors */
  &:nth-child(odd) {
    background-color: #fff;
  }

  &:nth-child(even) {
    background-color: #e9ecef;
  }

  &:hover {
    background-color: #e9ecef !important;
  }
`;

export const Td = styled.td`
  padding: 0.85rem 1.2rem;
  font-size: 0.85rem;
  color: #333;
  vertical-align: middle;
`;

/* Student name cell with avatar */
export const StudentCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const Avatar = styled.div<{ $color: string }>`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
  flex-shrink: 0;
  ${({ $color }) => css`
    background-color: ${$color};
  `}
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 0.88rem;
    color: #1a1a1a;
  }

  span {
    font-size: 0.72rem;
    color: #888;
  }
`;

export const PlanBadge = styled.span<{ $plan: 1 | 0 }>`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;

  ${({ $plan }) =>
    $plan === 1
      ? css`
          background: #08142c;
          color: #a4c2f4; /* azul fraco */
          border: 1px solid #1a3d6e;
        `
      : css`
          background-color: #e8eef4;
          color: #555;
        `}
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  background-color: ${({ $active }) => ($active ? "#e6f4ea" : "#fce8e6")};
  color: ${({ $active }) => ($active ? "#1e8e3e" : "#d93025")};
  font-size: 0.73rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  display: inline-block;
`;

export const ActionIconBtn = styled.button<{
  $danger?: boolean;
  $success?: boolean;
}>`
  background: transparent;
  border: 1px solid transparent;
  color: ${({ $danger, $success }) =>
    $danger ? "#d93025" : $success ? "#1e8e3e" : "#555"};
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $danger, $success }) =>
      $danger ? "#fce8e6" : $success ? "#e6f4ea" : "#f0f0f0"};
    border-color: ${({ $danger, $success }) =>
      $danger ? "#f5c6cb" : $success ? "#b2dfbc" : "#ddd"};
    color: ${({ $danger, $success }) =>
      $danger ? "#b31d13" : $success ? "#166d28" : "#333"};
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
`;

/* ====== DETAIL VIEW STYLES ====== */

export const DetailContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
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

export const DetailHeader = styled.div`
  background: linear-gradient(135deg, #08142c 0%, #1a3d6e 100%);
  padding: 2rem 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 600px) {
    padding: 1.5rem 1.2rem 2rem;
  }
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

export const DetailHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

export const DetailAvatar = styled.div<{ $color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.6rem;
  color: #fff;
  flex-shrink: 0;
  border: 3px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  ${({ $color }) => css`
    background-color: ${$color};
  `}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DetailNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  h2 {
    margin: 0;
    color: #fff;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.3px;
  }

  span {
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.88rem;
  }
`;

export const DetailStatusBadge = styled.span<{ $active: boolean }>`
  display: inline-block;
  align-self: flex-start;
  margin-top: 0.3rem;
  background-color: ${({ $active }) =>
    $active ? "rgba(30, 142, 62, 0.25)" : "rgba(217, 48, 37, 0.25)"};
  color: ${({ $active }) => ($active ? "#7defa0" : "#ff9e99")};
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailBody = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 600px) {
    padding: 1.5rem;
    gap: 2rem;
  }
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DetailSectionTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #08142c;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid #eaeaea;

  svg {
    color: #08142c;
    opacity: 0.6;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

export const DetailField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  input,
  select,
  textarea {
    padding: 0.8rem 1rem;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.2s;
    background: #fff;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      border-color: #08142c;
      box-shadow: 0 0 0 3px rgba(8, 20, 44, 0.08);
    }
  }

  textarea {
    resize: vertical;
    min-height: 90px;
  }
`;

export const DetailFieldLabel = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.1rem;

  svg {
    color: #888;
  }
`;

export const DetailFieldValue = styled.span`
  font-size: 1.05rem;
  color: #1a1a1a;
  font-weight: 500;
  line-height: 1.4;
`;

export const DetailActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  padding: 1.2rem 2rem;
  border-top: 1px solid #eee;
  background: #fafafa;

  @media (max-width: 600px) {
    padding: 1rem;
    flex-direction: column;
  }
`;

export const DetailActionBtn = styled.button<{
  $variant: "primary" | "secondary" | "danger" | "success";
}>`
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  ${({ $variant }) => {
    switch ($variant) {
      case "primary":
        return css`
          background: #08142c;
          color: #fff;
          &:hover {
            background: #1a3d6e;
          }
        `;
      case "secondary":
        return css`
          background: #f0f0f0;
          color: #333;
          &:hover {
            background: #e0e0e0;
          }
        `;
      case "danger":
        return css`
          background: transparent;
          color: #d93025;
          border: 1px solid #d93025;
          &:hover {
            background: #fce8e6;
          }
        `;
      case "success":
        return css`
          background: transparent;
          color: #1e8e3e;
          border: 1px solid #1e8e3e;
          &:hover {
            background: #e6f4ea;
          }
        `;
    }
  }}

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

/* ====== REGISTRATION PAGE STYLES ====== */

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
  background: linear-gradient(135deg, #08142c 0%, #1a3d6e 100%);
  padding: 1.8rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    padding: 1.2rem 1rem;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export const RegisterHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  h2 {
    margin: 0;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
  }
  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.6);
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
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  @media (max-width: 600px) {
    padding: 1.2rem;
    gap: 1.5rem;
  }
`;

export const PhotoUploadSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fc;
  border-radius: 12px;
  border: 1px dashed #d0d5dd;
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

export const RegisterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RegisterSectionTitle = styled.h4`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
  color: #08142c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
  svg {
    color: #555;
  }
`;

export const RegisterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const RegisterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const RegisterLabel = styled.label`
  font-size: 0.72rem;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  svg {
    color: #aaa;
  }
  span {
    color: #d93025;
  }
`;

export const RegisterInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border-color: #08142c;
    box-shadow: 0 0 0 3px rgba(8, 20, 44, 0.08);
  }
  &::placeholder {
    color: #aaa;
  }
`;

export const RegisterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  &:focus {
    border-color: #08142c;
    box-shadow: 0 0 0 3px rgba(8, 20, 44, 0.08);
  }
`;

export const RegisterTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
  &:focus {
    border-color: #08142c;
    box-shadow: 0 0 0 3px rgba(8, 20, 44, 0.08);
  }
  &::placeholder {
    color: #aaa;
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
  padding: 1.2rem;
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
          border: 2px solid #e0e0e0;
          color: #555;
          &:hover {
            border-color: #bbb;
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
  gap: 0.8rem;
  padding: 1.5rem 2.5rem;
  border-top: 1px solid #eee;
  background: #fafafa;
  @media (max-width: 600px) {
    padding: 1rem;
    flex-direction: column;
  }
`;
