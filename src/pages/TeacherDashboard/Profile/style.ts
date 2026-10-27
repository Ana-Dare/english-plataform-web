import styled, { css } from "styled-components";

export const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  padding-bottom: 2rem;
  min-width: 0;
  box-sizing: border-box;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  min-width: 0;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ProfilePageTitle = styled.h1`
  font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
  line-height: 1.25;
  color: #0f172a;
  font-weight: 800;
  margin: 0 0 0.375rem 0;
  letter-spacing: -0.02em;
`;

export const ProfilePageSubtitle = styled.p`
  font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
  line-height: 1.5;
  color: #64748b;
  margin: 0 0 clamp(1.25rem, 2.5vw, 2rem) 0;
`;

export const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 3vw, 2.25rem);
  padding: clamp(1.25rem, 2.5vw, 2.25rem);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow:
    0 10px 40px -10px rgba(15, 23, 42, 0.08),
    0 1px 3px rgba(15, 23, 42, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 20px 40px -10px rgba(15, 23, 42, 0.12),
      0 1px 3px rgba(15, 23, 42, 0.05);
  }

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1.25rem;
    padding: 1.5rem 1.25rem;
  }
`;

export const AvatarUpload = styled.div`
  position: relative;
  width: 104px;
  height: 104px;
  flex-shrink: 0;

  @media (max-width: 479px) {
    width: 96px;
    height: 96px;
  }
`;

export const AvatarImage = styled.div<{ $hasPhoto: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #64748b;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UploadOverlay = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1e293b;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
  border: 3px solid #ffffff;

  &:hover {
    background: #0f172a;
    transform: scale(1.12);
  }

  input {
    display: none;
  }
`;

export const PhotoInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  min-width: 0;
  flex: 1;

  @media (max-width: 640px) {
    align-items: center;
    width: 100%;
  }

  h3 {
    font-size: clamp(1.125rem, 1vw + 0.875rem, 1.375rem);
    line-height: 1.3;
    color: #0f172a;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.01em;
  }

  p {
    font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
    color: #64748b;
    margin: 0;
    line-height: 1.5;
  }
`;

export const PhotoActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;

  @media (max-width: 640px) {
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 374px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PhotoBtn = styled.button<{ $variant: "primary" | "danger" }>`
  padding: 0.65rem 1.35rem;
  border-radius: 10px;
  font-size: 0.875rem;
  line-height: 1.25;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Rubik", sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  flex-shrink: 0;

  ${({ $variant }) =>
    $variant === "primary"
      ? css`
          background: #1e293b;
          color: #ffffff;
          border: 1px solid #1e293b;
          &:hover {
            background: #0f172a;
            transform: translateY(-2px);
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
          }
        `
      : css`
          background: #ffffff;
          color: #ef4444;
          border: 1px solid #fecaca;
          &:hover {
            background: #fef2f2;
            border-color: #ef4444;
            transform: translateY(-2px);
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.15);
          }
        `}
`;

export const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow:
    0 10px 40px -10px rgba(15, 23, 42, 0.08),
    0 1px 3px rgba(15, 23, 42, 0.05);
  padding: clamp(1.25rem, 2.5vw, 2.25rem);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const FormSectionTitle = styled.h3`
  font-size: clamp(1.125rem, 1vw + 0.875rem, 1.5rem);
  line-height: 1.3;
  color: #0f172a;
  font-weight: 700;
  margin: 0 0 clamp(1.25rem, 2vw, 1.75rem) 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;

  svg {
    color: #475569;
    flex-shrink: 0;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);
  width: 100%;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  width: 100%;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const FormLabel = styled.label`
  font-size: 0.875rem;
  line-height: 1.4;
  color: #475569;
  font-weight: 600;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 0.45rem;

  svg {
    width: 15px;
    height: 15px;
    color: #64748b;
    flex-shrink: 0;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 0.85rem 1rem 0.85rem 2.85rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.5;
  color: #1e293b;
  background: #f8fafc;
  transition: all 0.2s ease;
  font-family: "Rubik", sans-serif;
  outline: none;

  &:focus {
    border-color: #1f2b45;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: #f1f5f9;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;

  svg.input-icon {
    position: absolute;
    left: 1rem;
    width: 18px;
    height: 18px;
    color: #94a3b8;
    pointer-events: none;
    transition: color 0.2s ease;
    flex-shrink: 0;
  }

  &:focus-within svg.input-icon {
    color: #1f2b45;
  }
`;

export const FormTextarea = styled.textarea`
  padding: 0.85rem 1rem 0.85rem 2.85rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  color: #1e293b;
  background: #f8fafc;
  transition: all 0.2s ease;
  font-family: "Rubik", sans-serif;
  outline: none;
  resize: vertical;
  min-height: 120px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  line-height: 1.5;

  &:focus {
    border-color: #1f2b45;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const TextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;

  svg.input-icon {
    position: absolute;
    left: 1rem;
    top: 1rem;
    width: 18px;
    height: 18px;
    color: #94a3b8;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  &:focus-within svg.input-icon {
    color: #1f2b45;
  }
`;

export const SaveButton = styled.button`
  padding: 0.9rem 2.25rem;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: "Rubik", sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: clamp(1.25rem, 2.5vw, 2rem);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
  white-space: nowrap;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(15, 23, 42, 0.3);
    background: linear-gradient(135deg, #334155 0%, #0f172a 100%);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #1e293b;
  }
`;

export const SuccessToast = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: #2b3a4e;
  color: #f0ebe7;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(100px)"};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 9999;

  svg {
    color: #5a8a6e;
  }
`;
