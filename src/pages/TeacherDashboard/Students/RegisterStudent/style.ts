import styled, { keyframes, css } from "styled-components";

/* ====== SPACING TOKENS ====== */
/* Padrão de espaçamento: 0.5rem | 1rem | 1.5rem */

/* ====== STEPPER ====== */

export const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 480px;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

export const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const StepCircle = styled.div<{ $active: boolean; $done: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $active, $done }) =>
    $done
      ? css`
          background: #1f2b45;
          color: #fff;
          border: 2px solid #1f2b45;
        `
      : $active
        ? css`
            background: #c57a67;
            color: #fff;
            border: 2px solid #c57a67;
            box-shadow: 0 0 0 4px rgba(197, 122, 103, 0.18);
          `
        : css`
            background: #fff;
            color: #94a3b8;
            border: 2px solid #d4dbe6;
          `}

  svg {
    color: inherit;
  }
`;

export const StepLabel = styled.span<{ $active: boolean; $done: boolean }>`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transition: color 0.3s ease;
  color: ${({ $active, $done }) =>
    $active ? "#c57a67" : $done ? "#1f2b45" : "#94a3b8"};

  @media (max-width: 480px) {
    display: none;
  }
`;

export const StepConnector = styled.div<{ $done: boolean }>`
  flex: 1;
  height: 2px;
  min-width: 24px;
  margin: 0 0.5rem;
  align-self: flex-start;
  margin-top: 16px;
  border-radius: 2px;
  background: ${({ $done }) => ($done ? "#1f2b45" : "#d4dbe6")};
  transition: background 0.3s ease;
`;

/* ====== PROFILE PHOTO ====== */

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(197, 122, 103, 0.3); }
  50% { box-shadow: 0 0 0 10px rgba(197, 122, 103, 0); }
`;

export const ProfilePhotoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: #fff;
  border-radius: 12px;
  border: 1.5px solid #d4dbe6;
  position: relative;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

export const PhotoCircle = styled.div<{ $hasImage: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: ${({ $hasImage }) =>
    $hasImage ? "#fff" : "linear-gradient(135deg, #e8e0dc 0%, #d4c8c2 100%)"};
  border: 3px solid
    ${({ $hasImage }) => ($hasImage ? "#C57A67" : "rgba(197, 122, 103, 0.3)")};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${({ $hasImage }) => ($hasImage ? "none" : pulseGlow)} 2.5s
    ease-in-out infinite;

  &:hover {
    transform: scale(1.05);
    border-color: #c57a67;
    box-shadow: 0 8px 24px rgba(197, 122, 103, 0.25);

    .overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #c57a67;
    opacity: 0.5;
  }
`;

export const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(8, 20, 44, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.25s;
  backdrop-filter: blur(2px);

  svg {
    color: #fff !important;
    opacity: 1 !important;
  }
`;

export const PhotoTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 1;
  min-width: 0;

  h4 {
    margin: 0;
    font-size: 0.88rem;
    color: #1f2b45;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: #666;
    line-height: 1.3;
  }
`;

export const UploadBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #1f2b45 0%, #2a3d5f 100%);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.25s;
  box-shadow: 0 3px 10px rgba(31, 43, 69, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 16px rgba(31, 43, 69, 0.3);
    background: linear-gradient(135deg, #2a3d5f 0%, #3a4f72 100%);
  }
`;

export const RemovePhotoBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #d93025;
  border: 1px solid rgba(217, 48, 37, 0.3);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;

  &:hover {
    background: #fce8e6;
    border-color: #d93025;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-left: auto;
  flex-shrink: 0;

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
    justify-content: flex-start;
  }
`;

/* ====== INPUT WITH ICON ====== */

export const InputIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 1rem;
    color: #c57a67;
    opacity: 0.6;
    z-index: 1;
    pointer-events: none;
  }

  input {
    padding-left: 2.6rem !important;
  }
`;

/* ====== GENDER ====== */

export const GenderSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

export const GenderOption = styled.button<{ $selected: boolean }>`
  flex: 1;
  height: 44px;
  padding: 0 1rem;
  border-radius: 14px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid ${({ $selected }) => ($selected ? "#C57A67" : "#8d8d8d")};
  background: ${({ $selected }) =>
    $selected ? "linear-gradient(135deg, #C57A67 0%, #d4937e 100%)" : "#fff"};
  color: ${({ $selected }) => ($selected ? "#fff" : "#666")};
  box-shadow: ${({ $selected }) =>
    $selected
      ? "0 3px 10px rgba(197, 122, 103, 0.3)"
      : "0 1px 3px rgba(0,0,0,0.05)"};

  &:hover {
    border-color: #c57a67;
    ${({ $selected }) =>
      !$selected &&
      css`
        background: #fff8f6;
        color: #c57a67;
      `}
  }
`;

/* ====== ADD LEVEL INLINE ====== */

export const AddLevelInline = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  align-items: center;
`;

export const AddLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f4f2 0%, #f0ebe8 100%);
  border: 1.5px solid #8d8d8d;
  border-radius: 12px;
  width: 44px;
  height: 44px;
  color: #c57a67;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background: #c57a67;
    color: #fff;
    border-color: #c57a67;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(197, 122, 103, 0.25);
  }
`;

export const SaveLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #1f2b45 0%, #2a3d5f 100%);
  border: none;
  border-radius: 10px;
  padding: 0 1rem;
  height: 44px;
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(31, 43, 69, 0.2);

  &:hover {
    background: linear-gradient(135deg, #2a3d5f 0%, #3a4f72 100%);
  }
`;

export const CancelLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 10px;
  width: 44px;
  height: 44px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

export const LevelRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

/* Padroniza o CustomDropdown para ter a mesma altura/estilo do RegisterInput (44px) */
export const DropdownFit = styled.div`
  flex: 1;
  min-width: 0;

  /* DropdownWrapper (min-width: 180px) precisa liberar para ocupar 100% */
  & > div {
    min-width: 0;
    width: 100%;
  }

  /* DropdownTrigger: casa com o RegisterInput */
  & > div > div:first-child {
    height: 44px;
    padding: 0 1rem;
    border-radius: 14px;
    border: 1.5px solid #8d8d8d;
    background: linear-gradient(135deg, #ffffff 0%, #fdfcfb 100%);
    box-shadow: none;
    color: #1f2b45;
    font-size: 0.9rem;

    &:hover {
      border-color: #6b6b6b;
      background: #fff;
      color: #1f2b45;
      box-shadow: none;
    }
  }
`;

/* ====== FOOTER NAV BUTTONS ====== */

export const FooterNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    gap: 0.5rem;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const FooterActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
