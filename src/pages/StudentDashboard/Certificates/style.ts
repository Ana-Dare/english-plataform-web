import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
`;

export const Header = styled.div`
  h2 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 1.8rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 1rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
`;

export const CertificateCard = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #d4af37;
  }
`;

export const Thumbnail = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  background-image: url('/certificate.png');
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid #e0e0e0;
`;

export const CardInfo = styled.div`
  padding: 16px;

  h4 {
    margin: 0 0 4px 0;
    color: #333;
    font-size: 1.1rem;
  }

  span {
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

// --- MODAL STYLES ---

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f5f5f5;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;

  &:hover {
    background: #e0e0e0;
    color: #333;
  }
`;

export const CertificateImageFull = styled.img`
  width: 100%;
  max-width: 700px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

export const ActionButtonsBar = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  padding-top: 24px;
`;

export const ActionButton = styled.button<{ $variant?: 'outline' | 'primary' | 'success' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  border: 1px solid ${({ $variant }) => {
    switch ($variant) {
      case 'primary': return '#2563eb';
      case 'success': return '#10b981';
      default: return '#e0e0e0';
    }
  }};

  background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'primary': return '#2563eb';
      case 'success': return '#10b981';
      default: return 'transparent';
    }
  }};

  color: ${({ $variant }) => ($variant === 'primary' || $variant === 'success' ? '#fff' : '#333')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
  }
`;
