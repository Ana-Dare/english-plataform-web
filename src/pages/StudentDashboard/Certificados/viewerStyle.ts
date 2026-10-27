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
  min-height: calc(100vh - 120px);
  background: #ffffff;
  border-radius: 16px;
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1024px) {
    min-height: auto;
    border-radius: 12px;
  }
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
  padding: 24px 32px;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  background: #f8fafc;

  @media (max-width: 768px) {
    padding: 16px 14px 20px;
    justify-content: flex-start;
  }
`;

export const BackButton = styled.button`
  align-self: flex-start;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  color: #1F2B45;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Rubik', sans-serif;
  font-size: 0.88rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  z-index: 10;
  margin-bottom: 20px;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
    color: #C57A67;
    border-color: #cbd5e1;
  }

  @media (max-width: 768px) {
    margin-bottom: 14px;
    padding: 7px 12px;
    font-size: 0.82rem;
  }
`;

export const CertificateImage = styled.div`
  width: 100%;
  max-width: 860px;
  aspect-ratio: 1.414 / 1;
  background: white;
  border: clamp(5px, 1.6cqw, 10px) solid #C57A67;
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
  padding: 3.5% 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: 'Times New Roman', serif;
  text-align: center;
  margin: auto;
  container-type: inline-size;
  box-sizing: border-box;

  .watermark {
    position: absolute;
    font-size: clamp(1.8rem, 14cqw, 7rem);
    color: rgba(0,0,0,0.03);
    transform: rotate(-30deg);
    font-weight: bold;
    z-index: 0;
    white-space: nowrap;
    pointer-events: none;
  }
  
  .title {
    font-size: clamp(0.75rem, 3.8cqw, 1.6rem);
    font-weight: bold;
    color: #1F2B45;
    margin-bottom: 0.5cqw;
    z-index: 1;
    text-transform: uppercase;
    letter-spacing: clamp(1px, 0.4cqw, 2px);
    line-height: 1.3;
  }
  
  .name {
    font-size: clamp(1.2rem, 7.5cqw, 2.75rem);
    font-family: 'Brush Script MT', 'Dancing Script', cursive;
    color: #C57A67;
    margin: 1.5cqw 0 0.5cqw;
    z-index: 1;
    line-height: 1.2;
  }
  
  .course {
    font-size: clamp(0.65rem, 2.6cqw, 1.15rem);
    color: #475569;
    font-weight: 600;
    z-index: 1;
    line-height: 1.3;
  }
  
  .date {
    font-size: clamp(0.55rem, 2cqw, 0.9rem);
    color: #64748B;
    margin-top: 4px;
    z-index: 1;
    line-height: 1.3;
  }

  .signatures {
    display: flex;
    justify-content: space-around;
    width: 85%;
    margin-top: auto;
    padding-top: 2cqw;
    z-index: 1;
    
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .sig-text {
      font-family: 'Brush Script MT', 'Dancing Script', cursive;
      font-size: clamp(0.85rem, 4.2cqw, 1.75rem);
      border-bottom: 1.5px solid #1F2B45;
      padding: 0 8px 3px;
      margin-bottom: 4px;
      color: #1F2B45;
      line-height: 1.2;
    }
    
    span {
      font-size: clamp(0.5rem, 1.8cqw, 0.75rem);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748B;
      font-weight: 600;
      line-height: 1.2;
    }
  }
`;

export const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 360px;
  background: #1F2B45; 
  padding: 36px 28px;
  color: white;
  flex-shrink: 0;
  box-sizing: border-box;
  
  .action-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    font-family: 'Rubik', sans-serif;
    line-height: 1.2;
  }

  .action-desc {
    font-size: 0.95rem;
    color: #cbd5e1;
    margin-bottom: 24px;
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 24px 20px;
    border-top: 1.5px solid rgba(255, 255, 255, 0.08);

    .action-header {
      width: 100%;
      text-align: center;
    }

    .action-desc {
      margin-bottom: 16px;
    }
  }

  @media (max-width: 480px) {
    padding: 20px 16px;

    .action-title {
      font-size: 1.3rem;
    }

    .action-desc {
      font-size: 0.88rem;
    }
  }
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: auto;

  @media (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${({ $variant }) => $variant === 'primary' ? '#C57A67' : 'rgba(255,255,255,0.08)'};
  color: white;
  border: ${({ $variant }) => $variant === 'primary' ? 'none' : '1.5px solid rgba(255,255,255,0.18)'};
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Rubik', sans-serif;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background: ${({ $variant }) => $variant === 'primary' ? '#b56c5a' : 'rgba(255,255,255,0.16)'};
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    flex: 1;
    min-width: 180px;
  }

  @media (max-width: 640px) {
    width: 100%;
    flex: none;
    min-width: 100%;
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

export const CertCodeStamp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  margin-top: 1.5cqw;
  padding-top: 1cqw;
  border-top: 1px dashed #CBD5E1;
  font-family: 'Rubik', sans-serif;
  font-size: clamp(0.5rem, 1.6cqw, 0.72rem);
  color: #64748B;
  z-index: 1;

  .code-left {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;

    strong {
      color: #1F2B45;
      letter-spacing: 0.5px;
    }
  }

  .code-right {
    color: #94A3B8;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 4px;
    text-align: center;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalCard = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 520px;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: scaleUp 0.2s ease-out;

  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

export const ModalHeader = styled.div`
  padding: 24px 28px 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #F1F5F9;

  .title-area {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-box {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: #FEF3F2;
      color: #C57A67;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1F2B45;
      margin: 0;
      font-family: 'Rubik', sans-serif;
    }

    p {
      font-size: 0.85rem;
      color: #64748B;
      margin: 4px 0 0 0;
    }
  }

  .close-btn {
    background: none;
    border: none;
    color: #94A3B8;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
      background: #F1F5F9;
      color: #475569;
    }
  }
`;

export const ModalBody = styled.div`
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .label-group {
    font-size: 0.82rem;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .url-box {
    display: flex;
    gap: 8px;
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 12px;
    padding: 6px 6px 6px 14px;
    align-items: center;

    input {
      border: none;
      background: transparent;
      flex: 1;
      font-size: 0.88rem;
      color: #1F2B45;
      outline: none;
      font-family: monospace;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    button {
      background: #C57A67;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      flex-shrink: 0;

      &:hover {
        background: #b56c5a;
      }

      &.copied {
        background: #10B981;
      }
    }
  }

  .share-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .share-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid #E2E8F0;
    background: white;
    color: #1F2B45;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;

    &:hover {
      border-color: #CBD5E1;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    &.open-preview {
      grid-column: span 2;
      background: #1F2B45;
      color: white;
      border-color: #1F2B45;

      &:hover {
        background: #151D2F;
      }

      @media (max-width: 480px) {
        grid-column: span 1;
      }
    }

    &.whatsapp {
      color: #059669;
      background: #ECFDF5;
      border-color: #A7F3D0;

      &:hover {
        background: #D1FAE5;
      }
    }

    &.linkedin {
      color: #0284C7;
      background: #F0F9FF;
      border-color: #BAE6FD;

      &:hover {
        background: #E0F2FE;
      }
    }
  }

  .info-badge {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.8rem;
    color: #64748B;
    line-height: 1.45;

    svg {
      color: #10B981;
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;





