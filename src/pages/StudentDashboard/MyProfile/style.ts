import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: none;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h1 {
    font-size: 1.3rem;
  font-weight: 800;
    color: #1F2B45;
    margin: 0;
  }

  p {
    color: #888;
    font-size: 0.95rem;
    font-weight: 500;
    margin: 0;
  }
`;

export const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  box-sizing: border-box;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  border: 1px solid #E2E8F0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 24px;
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E2E8F0;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
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
  width: 32px;
  height: 32px;
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
  gap: 8px;
`;

export const ProfileName = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: #1F2B45;
  margin: 0;
`;

export const ProfileEmail = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748B;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #C57A67;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;

  h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1F2B45;
    margin: 0 0 6px 0;
  }

  p {
    font-size: 0.9rem;
    color: #64748B;
    font-weight: 500;
    margin: 0;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const ReadOnlyBadge = styled.span`
  background-color: #FEF6F5;
  color: #C57A67;
  border: 1px solid #FEE8E8;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
  row-gap: 28px;
  margin-bottom: 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ $fullWidth }) => $fullWidth && `grid-column: 1 / -1;`}

  label {
    font-size: 0.8rem;
    font-weight: 800;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const InputWrapper = styled.div<{ $highlight?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  svg.icon {
    position: absolute;
    left: 16px;
    color: ${({ $highlight }) => $highlight ? '#C57A67' : '#94A3B8'};
  }

  input, textarea {
    padding-left: 48px;
    ${({ $highlight }) => $highlight && `
      border-left: 4px solid #C57A67;
      background-color: #FEF6F5;
    `}
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
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
    box-shadow: 0 0 0 4px rgba(31, 43, 69, 0.1);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #1F2B45;
  outline: none;
  background-color: #F8FAFC;
  resize: vertical;
  min-height: 140px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: #F1F5F9;
  }

  &:focus {
    border-color: #1F2B45;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 4px rgba(31, 43, 69, 0.1);
  }
`;

export const SaveButton = styled.button`
  background-color: #1F2B45;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
  margin-top: 16px;

  &:hover {
    background-color: #C57A67;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(197, 122, 103, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoBlock = styled.div`
  background-color: #FAFAFA;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #F0F0F0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #C57A67;
    background-color: #FFF;
    box-shadow: 0 4px 20px rgba(197, 122, 103, 0.15);
    transform: translateY(-2px);
  }

  span.label {
    font-size: 0.8rem;
    font-weight: 800;
    color: #64748B;
    text-transform: uppercase;
  }

  span.value {
    font-size: 0.95rem;
    font-weight: 800;
    color: #1E293B;
  }
`;

export const Tag = styled.div`
  background-color: #FEF6F5;
  color: #C57A67;
  border: 1px solid #FEE8E8;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  width: fit-content;
`;







