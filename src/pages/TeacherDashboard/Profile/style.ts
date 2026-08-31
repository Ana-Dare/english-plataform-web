import styled, { css } from "styled-components";

export const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
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
  font-size: 1.75rem;
  color: #0f172a;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
`;

export const ProfilePageSubtitle = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 2.5rem 0;
`;

export const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(15, 23, 42, 0.05);
  }
`;

export const AvatarUpload = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  flex-shrink: 0;
`;

export const AvatarImage = styled.div<{ $hasPhoto: boolean }>`
  width: 110px;
  height: 110px;
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
  width: 38px;
  height: 38px;
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
    transform: scale(1.15) rotate(5deg);
  }

  input {
    display: none;
  }
`;

export const PhotoInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  h3 {
    font-size: 1.25rem;
    color: #0f172a;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.01em;
  }

  p {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
  }
`;

export const PhotoActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const PhotoBtn = styled.button<{ $variant: "primary" | "danger" }>`
  padding: 0.6rem 1.4rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Rubik", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;

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
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.05);
  padding: 2.5rem;
`;

export const FormSectionTitle = styled.h3`
  font-size: 1.1rem;
  color: #0f172a;
  font-weight: 700;
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e2e8f0;

  svg {
    color: #475569;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "1 / -1" : "auto")};
`;

export const FormLabel = styled.label`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 14px;
    height: 14px;
    color: #94a3b8;
  }
`;

export const FormInput = styled.input`
  padding: 0.85rem 1.2rem;
  padding-left: 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #1e293b;
  background: #f8fafc;
  transition: all 0.2s ease;
  font-family: "Rubik", sans-serif;
  outline: none;

  &:focus {
    border-color: #64748b;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(100, 116, 139, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #f1f5f9;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg.input-icon {
    position: absolute;
    left: 1rem;
    width: 18px;
    height: 18px;
    color: #94a3b8;
    pointer-events: none;
    transition: color 0.2s ease;
  }
  
  &:focus-within svg.input-icon {
    color: #64748b;
  }
`;

export const FormTextarea = styled.textarea`
  padding: 0.85rem 1.2rem;
  padding-left: 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #1e293b;
  background: #f8fafc;
  transition: all 0.2s ease;
  font-family: "Rubik", sans-serif;
  outline: none;
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;

  &:focus {
    border-color: #64748b;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(100, 116, 139, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const TextareaWrapper = styled.div`
  position: relative;

  svg.input-icon {
    position: absolute;
    left: 1rem;
    top: 1.1rem;
    width: 18px;
    height: 18px;
    color: #94a3b8;
    pointer-events: none;
    transition: color 0.2s ease;
  }
  
  &:focus-within svg.input-icon {
    color: #64748b;
  }
`;

export const SaveButton = styled.button`
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: "Rubik", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(15, 23, 42, 0.3);
    background: linear-gradient(135deg, #334155 0%, #0f172a 100%);
  }

  &:active {
    transform: translateY(0) scale(1);
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
  bottom: 2rem;
  right: 2rem;
  background: #2b3a4e;
  color: #f0ebe7;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(100px)")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 9999;

  svg {
    color: #5a8a6e;
  }
`;
