import styled, { createGlobalStyle } from 'styled-components';

export const PrintStyles = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }
    #certificate-container, #certificate-container * {
      visibility: visible;
    }
    #certificate-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    nav, header, aside, .secondary-actions, .toast-overlay, .back-btn, .action-sidebar, .action-bar {
      display: none !important;
    }
  }
`;

export const ViewerContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px); 
  overflow-x: hidden;
  overflow-y: auto;
  background: #f8fafc;
  box-sizing: border-box;
`;

export const CertificateWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  align-items: stretch;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 40px;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 768px) {
    padding: 70px 20px 24px;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 24px;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  color: #1F2B45;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
    color: #C57A67;
  }
`;

export const CertificateImage = styled.div`
  width: 100%;
  max-width: 900px;
  max-height: calc(100vh - 140px);
  aspect-ratio: 1.414 / 1;
  background: white;
  border: 10px solid #C57A67;
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  padding: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Times New Roman', serif;
  text-align: center;
  margin: auto;
  container-type: inline-size;
  box-sizing: border-box;

  @media (max-width: 768px) {
    border-width: 6px;
    padding: 20px;
    aspect-ratio: auto;
    min-height: 400px;
    max-height: none;
  }

  .watermark {
    position: absolute;
    font-size: 15cqw;
    color: rgba(0,0,0,0.03);
    transform: rotate(-30deg);
    font-weight: bold;
    z-index: 0;
    white-space: nowrap;
  }
  
  .title {
    font-size: 4cqw;
    font-weight: bold;
    color: #1F2B45;
    margin-bottom: 3cqw;
    z-index: 1;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .name {
    font-size: 8cqw;
    font-family: 'Brush Script MT', 'Dancing Script', cursive;
    color: #C57A67;
    margin: 3cqw 0;
    z-index: 1;
  }
  
  .course {
    font-size: 2.5cqw;
    color: #475569;
    z-index: 1;
  }
  
  .date {
    font-size: 1.8cqw;
    color: #64748B;
    margin-top: 10px;
    z-index: 1;
  }

  .signatures {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-top: 8cqw;
    z-index: 1;
    
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .sig-text {
      font-family: 'Brush Script MT', 'Dancing Script', cursive;
      font-size: 4cqw;
      border-bottom: 1px solid #1F2B45;
      padding: 0 10px 5px;
      margin-bottom: 8px;
      color: #1F2B45;
    }
    
    span {
      font-size: 1.5cqw;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748B;
    }
  }
`;


export const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 380px;
  background: #1F2B45; 
  padding: 40px 32px;
  color: white;
  flex-shrink: 0;
  box-sizing: border-box;
  
  .action-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 12px;
    font-family: 'Rubik', sans-serif;
    line-height: 1.2;
  }

  .action-desc {
    font-size: 1.05rem;
    color: #cbd5e1;
    margin-bottom: 32px;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;

    .action-header {
      width: 100%;
      text-align: center;
    }
  }
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${({ $variant }) => $variant === 'primary' ? '#C57A67' : 'rgba(255,255,255,0.05)'};
  color: white;
  border: ${({ $variant }) => $variant === 'primary' ? 'none' : '1px solid rgba(255,255,255,0.1)'};
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    background: ${({ $variant }) => $variant === 'primary' ? '#d68773' : 'rgba(255,255,255,0.1)'};
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    width: auto;
    flex: 1;
    min-width: 200px;
  }
`;

export const ToastOverlay = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ToastItem = styled.div`
  background: white;
  border-left: 4px solid #C57A67;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ToastProgress = styled.div`
  height: 2px;
  background: #C57A67;
  width: 100%;
  margin-top: 8px;
`;

export const RightPanel = styled.div``;
export const LeftPanel = styled.div``;
export const SecondaryActions = styled.div``;





