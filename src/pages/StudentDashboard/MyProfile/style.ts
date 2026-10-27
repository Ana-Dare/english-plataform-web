import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  h1 {
    font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
    line-height: 1.25;
    font-weight: 800;
    color: #1F2B45;
    margin: 0;
  }

  p {
    color: #64748B;
    font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
    line-height: 1.5;
    font-weight: 500;
    margin: 0;
  }
`;

export const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: clamp(1.25rem, 3vw, 2.5rem);
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  border: 1px solid #E2E8F0;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  padding-bottom: clamp(1.25rem, 2.5vw, 2rem);
  border-bottom: 1px solid #E2E8F0;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  flex-shrink: 0;
`;

export const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #CBD5E1;
`;

export const CameraButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 34px;
  height: 34px;
  background-color: #C57A67;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  border: 3px solid white;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  input {
    display: none;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;

  @media (max-width: 600px) {
    align-items: center;
  }
`;

export const ProfileName = styled.h3`
  font-size: clamp(1.125rem, 1vw + 0.875rem, 1.5rem);
  line-height: 1.3;
  font-weight: 800;
  color: #1F2B45;
  margin: 0;
`;

export const ProfileEmail = styled.p`
  font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
  line-height: 1.45;
  font-weight: 500;
  color: #64748B;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  word-break: break-all;

  svg {
    color: #C57A67;
    flex-shrink: 0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: clamp(1.25rem, 2.5vw, 2rem);

  h3 {
    font-size: clamp(1.125rem, 1vw + 0.875rem, 1.5rem);
    line-height: 1.3;
    font-weight: 800;
    color: #1F2B45;
    margin: 0 0 0.375rem 0;
  }

  p {
    font-size: clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem);
    line-height: 1.5;
    color: #64748B;
    font-weight: 500;
    margin: 0;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const ReadOnlyBadge = styled.span`
  background-color: #FEF6F5;
  color: #C57A67;
  border: 1px solid #FEE8E8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.75rem);
  margin-bottom: 1.75rem;
  width: 100%;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  ${({ $fullWidth }) => $fullWidth && `grid-column: 1 / -1;`}

  label {
    font-size: 0.875rem;
    line-height: 1.4;
    font-weight: 700;
    color: #475569;
    letter-spacing: 0.02em;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const InputWrapper = styled.div<{ $highlight?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;

  svg.icon {
    position: absolute;
    left: 1rem;
    color: ${({ $highlight }) => $highlight ? '#C57A67' : '#94A3B8'};
    flex-shrink: 0;
    pointer-events: none;
  }

  input, textarea {
    padding-left: 3rem;
    ${({ $highlight }) => $highlight && `
      border-left: 4px solid #C57A67;
      background-color: #FEF6F5;
    `}
  }
`;

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  padding: 0.875rem 1.25rem;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  color: #1F2B45;
  outline: none;
  background-color: #F8FAFC;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: #F1F5F9;
  }

  &:focus {
    border-color: #1F2B45;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-width: 0;
  padding: 0.875rem 1.25rem;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  color: #1F2B45;
  outline: none;
  background-color: #F8FAFC;
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: #F1F5F9;
  }

  &:focus {
    border-color: #1F2B45;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
  }
`;

export const SaveButton = styled.button`
  background-color: #1F2B45;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.9rem 2rem;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
  margin-top: 1rem;
  white-space: nowrap;

  &:hover {
    background-color: #C57A67;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(197, 122, 103, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.25rem);

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoBlock = styled.div`
  background-color: #FAFAFA;
  border-radius: 16px;
  padding: clamp(1.125rem, 2vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid #F0F0F0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 0;

  &:hover {
    border-color: #C57A67;
    background-color: #FFF;
    box-shadow: 0 4px 20px rgba(197, 122, 103, 0.15);
    transform: translateY(-2px);
  }

  span.label {
    font-size: 0.875rem;
    font-weight: 700;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  span.value {
    font-size: 1rem;
    font-weight: 700;
    color: #1E293B;
  }
`;

export const Tag = styled.div`
  background-color: #FEF6F5;
  color: #C57A67;
  border: 1px solid #FEE8E8;
  padding: 0.375rem 1rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  width: fit-content;
`;







