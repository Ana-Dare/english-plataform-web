import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
`;

export const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
`;

export const BigAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fcedb3, #d4af37);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;

  .edit-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #2563eb;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid #fff;
    transition: background-color 0.2s;

    &:hover {
      background: #1d4ed8;
    }
  }
`;

export const HeaderTexts = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    font-size: 1.8rem;
    color: #333;
  }

  p {
    margin: 4px 0 0 0;
    color: #666;
    font-size: 1rem;
  }
`;

export const SectionCard = styled.div`
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
`;

export const SectionTitle = styled.h3`
  margin: 0 0 24px 0;
  font-size: 1.2rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;

  svg {
    color: #d4af37;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;

  label {
    font-size: 0.9rem;
    color: #555;
    font-weight: 500;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 14px;
    color: #999;
    transition: color 0.2s;
  }

  input {
    width: 100%;
    padding: 12px 16px 12px 42px; /* Extra left padding for the icon */
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;
    background-color: #fafafa;
    color: #333;

    &:focus {
      border-color: #d4af37;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }

    &:focus + svg {
      color: #d4af37;
    }

    &:disabled {
      background-color: #e9ecef;
      color: #999;
      cursor: not-allowed;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
  gap: 16px;
`;

export const SaveButton = styled.button<{ $loading?: boolean }>`
  background-color: ${({ $loading }) => ($loading ? '#ccc' : '#2563eb')};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${({ $loading }) => ($loading ? '#ccc' : '#1d4ed8')};
  }
`;

export const SuccessMessage = styled.span`
  color: #10b981;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
`;
