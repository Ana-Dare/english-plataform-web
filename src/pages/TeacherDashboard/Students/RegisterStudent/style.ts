import styled, { css } from "styled-components";

/* ====== CONTAINER CARD ====== */

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  animation: fadeIn 0.3s ease-out;

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

export const RegisterCardContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

/* ====== HEADER ====== */

export const RegisterHeader = styled.div`
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-bottom: 1px solid #e2e8f0;
  padding: clamp(1.125rem, 2.5vw, 1.5rem) clamp(1rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 0;

  @media (max-width: 767px) {
    width: 100%;
    justify-content: center;
  }
`;

export const FormTitle = styled.h2`
  margin: 0;
  color: #1f2b45;
  font-size: clamp(1.25rem, 1.5vw + 0.9rem, 1.625rem);
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const FormSubtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
  line-height: 1.5;
  font-weight: 400;
`;

/* ====== STEPPER ====== */

export const StepperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  max-width: 400px;

  @media (max-width: 600px) {
    max-width: 100%;
    gap: 0.4rem;
  }
`;

export const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
`;

export const StepCircle = styled.div<{ $active: boolean; $done: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $active, $done }) =>
    $done
      ? css`
          background: #1f2b45;
          color: #ffffff;
          border: 2px solid #1f2b45;
          box-shadow: 0 2px 6px rgba(31, 43, 69, 0.15);
        `
      : $active
        ? css`
            background: #c57a67;
            color: #ffffff;
            border: 2px solid #c57a67;
            box-shadow: 0 0 0 3px rgba(197, 122, 103, 0.18), 0 2px 6px rgba(197, 122, 103, 0.2);
          `
        : css`
            background: #ffffff;
            color: #94a3b8;
            border: 2px solid #cbd5e1;
          `}

  svg {
    color: inherit;
  }
`;

export const StepLabel = styled.span<{ $active: boolean; $done: boolean }>`
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: color 0.3s ease;
  color: ${({ $active, $done }) =>
    $active ? "#c57a67" : $done ? "#1f2b45" : "#94a3b8"};
`;

export const StepConnector = styled.div<{ $done: boolean }>`
  flex: 1;
  height: 2px;
  min-width: 24px;
  border-radius: 2px;
  background: ${({ $done }) => ($done ? "#1f2b45" : "#e2e8f0")};
  transition: background 0.3s ease;
  margin: 0 0.4rem;
  margin-bottom: 20px;

  @media (max-width: 479px) {
    margin-bottom: 0;
  }
`;

/* ====== BODY & SECTIONS ====== */

export const RegisterBody = styled.div`
  padding: clamp(1.25rem, 2.5vw, 1.75rem) clamp(1rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2.5vw, 1.75rem);
  width: 100%;
  box-sizing: border-box;
`;

/* ====== INTEGRATED PROFILE PHOTO CARD (DENTRO DO FORMULÁRIO) ====== */

export const ProfilePhotoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 16px;
  border: 1.5px solid #e2e8f0;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.25rem 1rem;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 84px;
    height: 84px;
  }
`;

export const AvatarCircle = styled.div<{ $hasImage: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  background: ${({ $hasImage }) =>
    $hasImage
      ? "#ffffff"
      : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)"};
  border: 3px solid
    ${({ $hasImage }) => ($hasImage ? "#c57a67" : "#e2e8f0")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: #c57a67;
    box-shadow: 0 6px 18px rgba(197, 122, 103, 0.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }

  svg {
    color: #94a3b8;
  }
`;

export const CameraButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1f2b45;
  color: #ffffff;
  border: 2.5px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #c57a67;
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(197, 122, 103, 0.35);
  }
`;

export const PhotoCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
  flex: 1;

  @media (max-width: 640px) {
    align-items: center;
  }
`;

export const PhotoCardTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1f2b45;
`;

export const PhotoCardDescription = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.4;
`;

export const PhotoActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    justify-content: center;
  }
`;

export const SelectPhotoBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #1f2b45;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 0.55rem 1.1rem;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(31, 43, 69, 0.15);

  &:hover {
    background: #2d3e63;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(31, 43, 69, 0.25);
  }
`;

export const RemovePhotoBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  color: #ef4444;
  border: 1.5px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  padding: 0.5rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fee2e2;
    border-color: #ef4444;
    color: #dc2626;
  }
`;

/* ====== FORM SECTIONS & FIELDS ====== */

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #1f2b45;
  margin: 0;
  padding-bottom: 0.55rem;
  border-bottom: 1.5px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.55rem;

  svg {
    color: #c57a67;
  }
`;

export const PersonalInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 1.25rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const FormLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`;

export const FormLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    color: #ef4444;
  }
`;

export const FormInput = styled.input<{ $error?: boolean }>`
  height: 46px;
  padding: 0 1rem;
  border: 1.5px solid ${({ $error }) => ($error ? "#ef4444" : "#cbd5e1")};
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.92rem;
  outline: none;
  transition: all 0.2s ease;
  background: #ffffff;
  width: 100%;
  box-sizing: border-box;
  color: #1f2b45;

  &::placeholder {
    color: #94a3b8;
    font-size: 0.88rem;
  }

  &:hover:not(:focus) {
    border-color: ${({ $error }) => ($error ? "#ef4444" : "#94a3b8")};
  }

  &:focus {
    border-color: ${({ $error }) => ($error ? "#ef4444" : "#c57a67")};
    box-shadow: ${({ $error }) =>
      $error
        ? "0 0 0 3px rgba(239, 68, 68, 0.15)"
        : "0 0 0 3px rgba(197, 122, 103, 0.15)"};
  }
`;

export const FieldError = styled.span`
  font-size: 0.74rem;
  font-weight: 500;
  color: #ef4444;
  margin-top: 0.1rem;
`;

/* ====== MODERN & CREATIVE GENDER CARDS ====== */

export const GenderCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`;

export const GenderCard = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  box-sizing: border-box;

  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#c57a67" : "#e2e8f0")};
  background: ${({ $selected }) =>
    $selected
      ? "linear-gradient(135deg, #ffffff 0%, #fff7f5 100%)"
      : "#ffffff"};
  box-shadow: ${({ $selected }) =>
    $selected
      ? "0 4px 14px rgba(197, 122, 103, 0.18)"
      : "0 1px 3px rgba(0, 0, 0, 0.02)"};
  transform: ${({ $selected }) => ($selected ? "translateY(-1px)" : "none")};

  &:hover {
    border-color: #c57a67;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(197, 122, 103, 0.12);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(197, 122, 103, 0.25);
  }
`;

export const GenderIconBadge = styled.div<{ $selected: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
  background: ${({ $selected }) =>
    $selected ? "#c57a67" : "rgba(31, 43, 69, 0.05)"};
  color: ${({ $selected }) => ($selected ? "#ffffff" : "#1f2b45")};
`;

export const GenderCardText = styled.div<{ $selected: boolean }>`
  flex: 1;
  margin: 0 0.75rem;

  .gender-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ $selected }) => ($selected ? "#c57a67" : "#1f2b45")};
    transition: color 0.2s ease;
  }
`;

export const GenderRadioCircle = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#c57a67" : "#cbd5e1")};
  background: ${({ $selected }) => ($selected ? "#c57a67" : "transparent")};
  color: #ffffff;
`;

/* ====== TEXTAREA & CHARACTER COUNTER ====== */

export const FormTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 110px;
  max-height: 220px;
  resize: vertical;
  padding: 0.85rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.92rem;
  line-height: 1.5;
  outline: none;
  transition: all 0.2s ease;
  background: #ffffff;
  color: #1f2b45;

  &::placeholder {
    color: #94a3b8;
    font-size: 0.88rem;
  }

  &:hover:not(:focus) {
    border-color: #94a3b8;
  }

  &:focus {
    border-color: #c57a67;
    box-shadow: 0 0 0 3px rgba(197, 122, 103, 0.15);
  }
`;

export const CharCounter = styled.span<{ $nearLimit?: boolean }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $nearLimit }) => ($nearLimit ? "#e11d48" : "#94a3b8")};
  transition: color 0.2s ease;
`;

/* ====== STEP 2 (PLANO & TURMA) ====== */

export const PlanSelector = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const PlanCard = styled.div<{
  $selected: boolean;
  $type: "Regular" | 1;
}>`
  flex: 1;
  padding: 1.1rem 1.25rem;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  position: relative;

  ${({ $selected, $type }) =>
    $selected
      ? $type === 1
        ? css`
            background: #1f2b45;
            border: 2px solid #1f2b45;
            color: #ffffff;
            box-shadow: 0 4px 14px rgba(31, 43, 69, 0.25);
            transform: translateY(-2px);

            p {
              color: #cbd5e1;
            }
          `
        : css`
            background: #f8fafc;
            border: 2px solid #1f2b45;
            color: #1f2b45;
            box-shadow: 0 4px 12px rgba(31, 43, 69, 0.08);
            transform: translateY(-2px);

            p {
              color: #64748b;
            }
          `
      : css`
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #475569;

          &:hover {
            border-color: #94a3b8;
            background: #f8fafc;
          }

          p {
            color: #64748b;
          }
        `}

  h5 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.35;
  }
`;

export const PlanCheck = styled.div<{ $selected: boolean; $isVip?: boolean }>`
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $selected, $isVip }) =>
    $selected
      ? $isVip
        ? css`
            background: #ffffff;
            color: #1f2b45;
          `
        : css`
            background: #1f2b45;
            color: #ffffff;
          `
      : css`
          background: #e2e8f0;
          color: transparent;
        `}
`;

export const LevelRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
`;

export const DropdownFit = styled.div`
  flex: 1;
  min-width: 0;

  & > div {
    min-width: 0;
    width: 100%;
  }

  & > div > div:first-child {
    height: 44px;
    padding: 0 1rem;
    border-radius: 10px;
    border: 1.5px solid #e2e8f0;
    background: #f8fafc;
    box-shadow: none;
    color: #1e293b;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:hover {
      border-color: #cbd5e1;
      background: #ffffff;
      color: #1e293b;
    }
  }
`;

export const AddLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  width: 44px;
  height: 44px;
  color: #c57a67;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #c57a67;
    color: #ffffff;
    border-color: #c57a67;
    box-shadow: 0 4px 12px rgba(197, 122, 103, 0.25);
  }
`;

export const AddLevelInline = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  align-items: center;
  width: 100%;

  input {
    height: 44px !important;
  }
`;

export const SaveLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: #1f2b45;
  border: none;
  border-radius: 10px;
  padding: 0 1rem;
  height: 44px;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #2a3d5f;
  }
`;

export const CancelLevelBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  width: 44px;
  height: 44px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
    border-color: #cbd5e1;
  }
`;

export const PlanToggleGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const PlanOptionCard = styled.button<{ $selected: boolean }>`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid ${({ $selected }) => ($selected ? "#c57a67" : "#e2e8f0")};
  background: ${({ $selected }) => ($selected ? "#fff7f5" : "#f8fafc")};
  color: #1e293b;
  cursor: pointer;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-family: inherit;
  box-shadow: ${({ $selected }) =>
    $selected ? "0 2px 8px rgba(197, 122, 103, 0.15)" : "none"};

  &:hover {
    border-color: #c57a67;
    background: ${({ $selected }) => ($selected ? "#fff7f5" : "#ffffff")};
  }

  .plan-radio {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid ${({ $selected }) => ($selected ? "#c57a67" : "#cbd5e1")};
    background: ${({ $selected }) => ($selected ? "#c57a67" : "#ffffff")};
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .plan-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    min-width: 0;
    line-height: 1.15;

    strong {
      font-size: 0.88rem;
      font-weight: 700;
      color: ${({ $selected }) => ($selected ? "#c57a67" : "#1e293b")};
    }

    span {
      font-size: 0.68rem;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const StatusToggleGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

export const StatusOptionBtn = styled.button<{
  $active: boolean;
  $variant: "active" | "inactive";
}>`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid
    ${({ $active, $variant }) =>
      $active
        ? $variant === "active"
          ? "#22c55e"
          : "#64748b"
        : "#e2e8f0"};
  background: ${({ $active, $variant }) =>
    $active
      ? $variant === "active"
        ? "#f0fdf4"
        : "#f1f5f9"
      : "#f8fafc"};
  color: ${({ $active, $variant }) =>
    $active
      ? $variant === "active"
        ? "#15803d"
        : "#334155"
      : "#64748b"};
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $active, $variant }) =>
      $active
        ? $variant === "active"
          ? "#22c55e"
          : "#64748b"
        : "#cbd5e1"};
  }

  &:hover {
    border-color: ${({ $variant }) => ($variant === "active" ? "#22c55e" : "#64748b")};
  }
`;

/* ====== FOOTER ====== */

export const RegisterFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;

  @media (max-width: 600px) {
    padding: 1rem 1rem;
  }
`;

export const FooterNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
`;

export const FooterActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #1f2b45;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  height: 46px;
  padding: 0 1.6rem;
  font-size: 0.92rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(31, 43, 69, 0.2);

  &:hover:not(:disabled) {
    background: #2d3e63;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(31, 43, 69, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const SecondaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #ffffff;
  color: #475569;
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  height: 46px;
  padding: 0 1.4rem;
  font-size: 0.92rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #1e293b;
    border-color: #94a3b8;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;


/* ====== TRADITIONAL / ORIGINAL STEP PERSONAL INFO STYLES ====== */

export const InputIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  svg {
    position: absolute;
    left: 1rem;
    color: #64748b;
    pointer-events: none;
    flex-shrink: 0;
    z-index: 2;
  }

  input {
    padding-left: 2.6rem !important;
  }
`;

export const GenderSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

export const GenderOption = styled.button<{ $selected: boolean }>`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  border: 1.5px solid ${({ $selected }) => ($selected ? "#c57a67" : "#e2e8f0")};
  background: ${({ $selected }) => ($selected ? "#c57a67" : "#f8fafc")};
  color: ${({ $selected }) => ($selected ? "#ffffff" : "#475569")};
  font-weight: 600;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ $selected }) =>
    $selected ? "0 2px 8px rgba(197, 122, 103, 0.25)" : "none"};

  &:hover {
    border-color: #c57a67;
    background: ${({ $selected }) => ($selected ? "#b06957" : "#ffffff")};
  }
`;

export const ProfilePhotoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.5rem;
  background: #f8fafc;
  border-radius: 14px;
  border: 1.5px dashed #cbd5e1;
  margin-top: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const PhotoCircle = styled.div<{ $hasImage: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px dashed ${({ $hasImage }) => ($hasImage ? "#1F2B45" : "#94a3b8")};
  background: #ffffff;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #64748b;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

export const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(31, 43, 69, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: #fff;
`;

export const PhotoTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    color: #1F2B45;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    color: #64748b;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

export const UploadBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #1F2B45;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 0.95rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;

  &:hover {
    background: #151d2f;
  }
`;
