import styled, { createGlobalStyle } from 'styled-components';

export const PublicPrintStyles = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }
    #public-certificate-view, #public-certificate-view * {
      visibility: visible;
    }
    #public-certificate-view {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    header, nav, .no-print, .action-buttons-public {
      display: none !important;
    }
  }
`;

export const PublicCertContainer = styled.div`
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;
  color: #0F172A;
  font-family: 'Rubik', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const PublicCertHeader = styled.header`
  background: #0F172A;
  color: white;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #1E293B;

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;

    .brand-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .brand-title {
      h2 {
        font-size: 1.05rem;
        font-weight: 800;
        margin: 0;
        letter-spacing: -0.01em;
      }
      span {
        font-size: 0.75rem;
        color: #94A3B8;
        display: block;
      }
    }
  }

  .badge-verification {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #064E3B;
    border: 1px solid #059669;
    color: #6EE7B7;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.02em;

    @media (max-width: 600px) {
      padding: 5px 10px;
      font-size: 0.75rem;
    }
  }
`;

export const PublicCertBody = styled.main`
  flex: 1;
  max-width: 1060px;
  width: 100%;
  margin: 0 auto;
  padding: 36px 20px 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;

  @media (max-width: 600px) {
    padding: 20px 14px 40px;
    gap: 20px;
  }
`;

export const VerificationBanner = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  .status-info {
    display: flex;
    align-items: center;
    gap: 14px;

    .shield-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: #ECFDF5;
      color: #059669;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid #A7F3D0;
    }

    .status-text {
      h3 {
        margin: 0 0 2px 0;
        font-size: 1.1rem;
        font-weight: 800;
        color: #0F172A;
      }
      p {
        margin: 0;
        font-size: 0.85rem;
        color: #64748B;
      }
    }
  }

  .quick-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const ActionButtonPublic = styled.button<{ $variant?: 'primary' | 'secondary' | 'outline' }>`
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);
          color: white;
          border: 1px solid #0F172A;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
          &:hover {
            background: linear-gradient(135deg, #1E293B 0%, #1D4ED8 100%);
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return `
          background: #059669;
          color: white;
          border: 1px solid #059669;
          &:hover {
            background: #047857;
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: white;
          color: #0F172A;
          border: 1.5px solid #CBD5E1;
          &:hover {
            background: #F8FAFC;
            border-color: #0F172A;
          }
        `;
    }
  }}

  @media (max-width: 600px) {
    flex: 1;
    justify-content: center;
  }
`;

export const CertificateRenderCard = styled.div`
  width: 100%;
  max-width: 880px;
  aspect-ratio: 1.414 / 1;
  background: white;
  border: clamp(6px, 1.8cqw, 12px) solid #C57A67;
  border-radius: 8px;
  box-shadow: 0 15px 45px rgba(15, 23, 42, 0.12);
  position: relative;
  overflow: hidden;
  padding: 3.8% 4.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: 'Times New Roman', serif;
  text-align: center;
  container-type: inline-size;
  box-sizing: border-box;

  .watermark {
    position: absolute;
    font-size: clamp(2rem, 14cqw, 7.5rem);
    color: rgba(197, 122, 103, 0.04);
    transform: rotate(-30deg);
    font-weight: bold;
    z-index: 0;
    white-space: nowrap;
    pointer-events: none;
    letter-spacing: 0.1em;
  }

  .seal-corner {
    position: absolute;
    top: 14px;
    right: 18px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Rubik', sans-serif;
    font-size: clamp(0.55rem, 1.6cqw, 0.75rem);
    font-weight: 700;
    color: #1E3A8A;
    background: #EFF6FF;
    border: 1px solid #BFDBFE;
    padding: 4px 10px;
    border-radius: 9999px;
  }

  .title {
    font-size: clamp(0.85rem, 4cqw, 1.75rem);
    font-weight: bold;
    color: #1F2B45;
    margin-bottom: 0.5cqw;
    z-index: 1;
    text-transform: uppercase;
    letter-spacing: clamp(1px, 0.4cqw, 2px);
    line-height: 1.3;
  }

  .subtitle {
    font-family: 'Rubik', sans-serif;
    font-size: clamp(0.55rem, 1.8cqw, 0.85rem);
    color: #64748B;
    margin-bottom: 1.5cqw;
    z-index: 1;
  }

  .name {
    font-size: clamp(1.4rem, 8cqw, 3rem);
    font-family: 'Brush Script MT', 'Dancing Script', 'Playfair Display', cursive;
    color: #C57A67;
    margin: 1.5cqw 0 0.5cqw;
    z-index: 1;
    line-height: 1.2;
    padding: 0 10px;
  }

  .course {
    font-size: clamp(0.7rem, 2.8cqw, 1.25rem);
    color: #1E293B;
    font-weight: 700;
    font-family: 'Rubik', sans-serif;
    z-index: 1;
    line-height: 1.3;
  }

  .date {
    font-size: clamp(0.55rem, 2cqw, 0.9rem);
    color: #64748B;
    margin-top: 4px;
    font-family: 'Rubik', sans-serif;
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
      font-family: 'Brush Script MT', 'Dancing Script', 'Playfair Display', cursive;
      font-size: clamp(0.9rem, 4.4cqw, 1.85rem);
      border-bottom: 1.5px solid #1F2B45;
      padding: 0 8px 3px;
      margin-bottom: 4px;
      color: #1F2B45;
      line-height: 1.2;
    }

    span {
      font-family: 'Rubik', sans-serif;
      font-size: clamp(0.5rem, 1.8cqw, 0.75rem);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748B;
      font-weight: 600;
      line-height: 1.2;
    }
  }
`;

export const VerificationDetailsGrid = styled.div`
  width: 100%;
  max-width: 880px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  .detail-card {
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .label {
      font-size: 0.75rem;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .value {
      font-size: 0.95rem;
      font-weight: 800;
      color: #0F172A;
      word-break: break-word;
    }

    .sub {
      font-size: 0.75rem;
      color: #94A3B8;
    }
  }
`;

export const PublicCertFooter = styled.footer`
  margin-top: auto;
  background: white;
  border-top: 1px solid #E2E8F0;
  padding: 24px;
  text-align: center;
  font-size: 0.85rem;
  color: #64748B;

  p {
    margin: 4px 0;
  }
`;
