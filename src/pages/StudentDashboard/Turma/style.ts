import styled from 'styled-components';

export const TurmaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const Banner = styled.div`
  background-color: #1F2B45;
  border-radius: 14px;
  padding: clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  width: 100%;
  box-sizing: border-box;

  h2 {
    color: white;
    font-size: clamp(1.4rem, 2vw + 1rem, 2.25rem);
    line-height: 1.25;
    font-weight: 800;
    margin: 0;
    overflow-wrap: break-word;
  }

  @media (max-width: 768px) {
    padding: 1.15rem 1.25rem;
    border-radius: 12px;
    gap: 0.75rem;

    h2 {
      font-size: 1.35rem;
    }
  }
`;

export const BannerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const BannerBadge = styled.span`
  background-color: #C57A67;
  color: #FFFFFF;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 700;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.2px;
  white-space: nowrap;
`;

export const AvatarsGroup = styled.div`
  display: flex;
  align-items: center;

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #4A72FF;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 800;
    border: 2px solid #1F2B45;
    margin-left: -8px;

    &:first-child {
      margin-left: 0;
    }
  }

  .avatar.orange {
    background-color: #C57A67;
  }
`;

export const StudentsCount = styled.span`
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const TabsList = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  
  @media (max-width: 767px) {
    padding-bottom: 4px;
  }
`;

export const TabItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 0 0 1rem 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ $active }) => ($active ? '#1F2B45' : '#64748B')};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.2s;

  @media (max-width: 767px) {
    font-size: 0.875rem;
    padding: 0 0 0.75rem 0;
    gap: 0.375rem;
  }

  svg {
    width: 18px;
    height: 18px;
    
    @media (max-width: 767px) {
      width: 16px;
      height: 16px;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ $active }) => ($active ? '#1F2B45' : 'transparent')};
    border-radius: 3px 3px 0 0;
    transition: background-color 0.2s;
  }

  &:hover {
    color: #1F2B45;
  }

  .tab-badge {
    background: #C57A67;
    color: white;
    font-size: 0.6875rem;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 9999px;
    min-width: 18px;
    text-align: center;
    line-height: 1.2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ContentArea = styled.div`
  background: white;
  border-radius: 14px;
  padding: clamp(1.25rem, 2.5vw, 2rem);
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  border: 1px solid #f2f2f2;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }

  h3 {
    font-size: clamp(1.125rem, 1vw + 0.875rem, 1.5rem);
    line-height: 1.3;
    font-weight: 800;
    color: #1F2B45;
    margin: 0;
  }

  .right-action {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748B;
    flex-wrap: wrap;
  }
`;

export const ToggleSwitch = styled.button<{ $active: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ $active }) => ($active ? '#1F2B45' : '#E2E8F0')};
  border: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`;

export const MessageCard = styled.div`
  background-color: #FAFAFA;
  border: 1px solid #F0F0F0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  position: relative;

  .author-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
    flex-wrap: wrap;
    padding-right: 20px;
  }

  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #E2E8F0;
    background-size: cover;
    background-position: center;
  }

  .author-info {
    h5 {
      font-size: 1rem;
      font-weight: 800;
      color: #1F2B45;
      margin: 0 0 4px 0;
    }
    span {
      font-size: 0.8rem;
      font-weight: 500;
      color: #888;
    }
  }

  .message-content {
    font-size: 0.95rem;
    color: #444;
    font-weight: 500;
    line-height: 1.5;
  }

  .unread-dot {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #D1D5DB;
  }
`;

/* Materiais & Atividades */
export const GroupLabel = styled.h4`
  font-size: 1.1rem;
  font-weight: 800;
  color: #1F2B45;
  margin: 32px 0 16px 0;

  &:first-child {
    margin-top: 0;
  }
`;

export const MaterialCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border: 1px solid #F0F0F0;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: white;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .left-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .icon-box {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: #E8F0FE;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4A72FF;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .file-info {
    max-width: 100%;
    overflow: hidden;
    
    h5 {
      font-size: 1rem;
      font-weight: 800;
      color: #1F2B45;
      margin: 0 0 4px 0;
      word-break: break-word;
    }
    p {
      font-size: 0.85rem;
      color: #888;
      font-weight: 500;
      margin: 0;
    }
  }

  .actions {
    display: flex;
    gap: 12px;
    
    @media (max-width: 600px) {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'outline' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant }) => {
    if ($variant === 'outline') {
      return `
        background-color: white;
        color: #1F2B45;
        border: 1px solid #E2E8F0;
        &:hover {
          background-color: #F8FAFC;
        }
      `;
    }
    return `
      background-color: #1F2B45;
      color: white;
      border: 1px solid #1F2B45;
      &:hover {
        opacity: 0.9;
      }
    `;
  }}
`;

/* Agenda da Turma */
export const FixedScheduleCard = styled.div`
  background-color: #FAFAFA;
  border: 1px solid #F0F0F0;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .icon-square {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    background-color: #FEE8E8;
    color: #C57A67;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 32px;
      height: 32px;
    }
  }

  .schedule-block {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span.label {
      font-size: 0.8rem;
      font-weight: 800;
      color: #888;
      text-transform: uppercase;
    }
    span.value {
      font-size: 1.2rem;
      font-weight: 800;
      color: #1F2B45;
    }
  }
`;

export const ClassItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #F0F0F0;
  margin-bottom: 20px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .left-part {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .date-box {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    background-color: #1F2B45;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    strong {
      font-size: 1.25rem;
      font-weight: 800;
      line-height: 1;
    }

    span {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 4px;
    }
  }

  .class-info {
    h5 {
      font-size: 1.05rem;
      font-weight: 800;
      color: #1F2B45;
      margin: 0 0 4px 0;
    }
    p {
      font-size: 0.85rem;
      font-weight: 500;
      color: #888;
      margin: 0;
    }
  }

  .actions {
    display: flex;
    gap: 12px;
    
    @media (max-width: 768px) {
      width: 100%;
      justify-content: flex-end;
    }
    @media (max-width: 480px) {
      flex-direction: column;
      button {
        width: 100%;
        justify-content: center;
      }
    }
  }
`;

/* Alunos */
export const StudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  .student-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: 2px solid #F8FAFC;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .student-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    
    .student-name {
      font-size: 1.05rem;
      font-weight: 800;
      color: #1E293B;
    }
    
    .student-email {
      font-size: 0.85rem;
      color: #64748B;
      font-weight: 500;
    }
  }
`;

/* Atestados */
export const FilterGroup = styled.div`
  display: flex;
  background-color: #F1F5F9;
  border-radius: 12px;
  padding: 4px;
  border: 1px solid #E2E8F0;
  gap: 4px;

  @media (max-width: 600px) {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active }) => ($active ? '#0F172A' : 'transparent')};
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#475569')};
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 0.825rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(15, 23, 42, 0.22)' : 'none')};
  white-space: nowrap;

  &:hover {
    color: ${({ $active }) => ($active ? '#FFFFFF' : '#0F172A')};
    background-color: ${({ $active }) => ($active ? '#0F172A' : '#E2E8F0')};
  }

  .count-pill {
    font-size: 0.7rem;
    padding: 1px 6px;
    border-radius: 9999px;
    background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.2)' : '#CBD5E1')};
    color: ${({ $active }) => ($active ? '#FFFFFF' : '#334155')};
  }

  @media (max-width: 600px) {
    flex: 1;
    justify-content: center;
    padding: 8px 10px;
    font-size: 0.8rem;
  }
`;

export const AtestadoCard = styled.div<{ $status: 'aprovado' | 'pendente' | 'rejeitado'; $isExpanded?: boolean }>`
  border: 1px solid ${({ $isExpanded }) => ($isExpanded ? '#BFDBFE' : '#E2E8F0')};
  border-left: 5px solid ${({ $status }) => 
    $status === 'aprovado' ? '#10B981' : 
    $status === 'pendente' ? '#F59E0B' : '#EF4444'};
  border-radius: 14px;
  margin-bottom: 16px;
  background-color: #FFFFFF;
  box-shadow: ${({ $isExpanded }) => 
    $isExpanded ? '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)' 
                : '0 2px 8px -2px rgba(15, 23, 42, 0.04)'};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &:hover {
    border-color: ${({ $isExpanded }) => ($isExpanded ? '#93C5FD' : '#CBD5E1')};
    box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.08);
  }

  .card-summary {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    cursor: pointer;
    user-select: none;
    background: ${({ $isExpanded }) => ($isExpanded ? '#F8FAFC' : '#FFFFFF')};
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #F8FAFC;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
      gap: 14px;
      padding: 14px;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
      min-width: 0;

      .icon-box {
        width: 44px;
        height: 44px;
        min-width: 44px;
        border-radius: 12px;
        background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
      }

      .text-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;

        .file-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;

          h4 {
            font-size: 0.975rem;
            font-weight: 700;
            color: #0F172A;
            margin: 0;
            word-break: break-word;
          }

          .format-pill {
            font-size: 0.675rem;
            font-weight: 800;
            color: #1E3A8A;
            background: #EFF6FF;
            border: 1px solid #BFDBFE;
            padding: 2px 6px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }
        }

        .meta-chips {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;

          .chip {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.775rem;
            font-weight: 500;
            color: #64748B;

            strong {
              color: #1E293B;
              font-weight: 600;
            }
          }

          .chip-divider {
            color: #CBD5E1;
            font-size: 0.75rem;

            @media (max-width: 480px) {
              display: none;
            }
          }
        }
      }
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 12px;
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: space-between;
        width: 100%;
        padding-top: 10px;
        border-top: 1px dashed #E2E8F0;
      }

      .toggle-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 8px;
        background: #F1F5F9;
        border: 1px solid #E2E8F0;
        color: #0F172A;
        font-size: 0.8rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #E2E8F0;
          color: #0F172A;
        }

        svg {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }
  }

  .card-expanded-content {
    border-top: 1px solid #F1F5F9;
    padding: 20px;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    gap: 18px;
    animation: fadeInAtestado 0.25s ease-in-out;

    @keyframes fadeInAtestado {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 768px) {
      padding: 16px;
      gap: 16px;
    }

    .info-metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }

      .metric-box {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 12px 14px;
        display: flex;
        align-items: flex-start;
        gap: 10px;

        .icon-circle {
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 8px;
          background: #EFF6FF;
          color: #1E3A8A;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-texts {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;

          .label {
            font-size: 0.675rem;
            font-weight: 800;
            color: #64748B;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .value {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0F172A;
            line-height: 1.3;
          }

          .subtext {
            font-size: 0.75rem;
            color: #64748B;
          }
        }
      }
    }

    .desc-section {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-left: 3px solid #0F172A;
      border-radius: 0 10px 10px 0;
      padding: 12px 16px;

      .desc-title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        font-weight: 800;
        color: #0F172A;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 4px;
      }

      p {
        font-size: 0.9rem;
        color: #334155;
        line-height: 1.5;
        margin: 0;
      }
    }

    .status-feedback-box {
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      align-items: flex-start;
      gap: 12px;

      &.aprovado {
        background-color: #F0FDF4;
        border: 1px solid #BBF7D0;
        color: #166534;
      }

      &.pendente {
        background-color: #FFFBEB;
        border: 1px solid #FDE68A;
        color: #92400E;
      }

      &.rejeitado {
        background-color: #FEF2F2;
        border: 1px solid #FECACA;
        color: #991B1B;
      }

      .feedback-icon {
        margin-top: 2px;
      }

      .feedback-text {
        display: flex;
        flex-direction: column;
        gap: 2px;

        strong {
          font-size: 0.85rem;
          font-weight: 700;
        }

        span {
          font-size: 0.8rem;
          line-height: 1.4;
          opacity: 0.9;
        }
      }
    }

    .card-actions-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      padding-top: 10px;
      border-top: 1px solid #F1F5F9;

      @media (max-width: 600px) {
        flex-direction: column;
        width: 100%;

        button {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
`;

export const StatusTag = styled.span<{ $status: 'aprovado' | 'pendente' | 'rejeitado' }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.775rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.02em;
  white-space: nowrap;

  ${({ $status }) => {
    switch ($status) {
      case 'aprovado':
        return 'background-color: #ECFDF5; color: #047857; border: 1px solid #A7F3D0;';
      case 'pendente':
        return 'background-color: #FFFBEB; color: #B45309; border: 1px solid #FDE68A;';
      case 'rejeitado':
        return 'background-color: #FEF2F2; color: #B91C1C; border: 1px solid #FECACA;';
    }
  }}
`;

export const NavyButton = styled.button`
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  color: #FFFFFF;
  border: 1px solid #0F172A;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);

  &:hover {
    background: linear-gradient(135deg, #1E293B 0%, #1E3A8A 100%);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const OutlineNavyButton = styled.button`
  background: #FFFFFF;
  color: #0F172A;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 0.85rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #F8FAFC;
    border-color: #0F172A;
  }
`;

export const EmptyAtestadosState = styled.div`
  background: #FFFFFF;
  border: 1px dashed #CBD5E1;
  border-radius: 14px;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;

  .empty-icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: #F1F5F9;
    color: #0F172A;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
  }

  h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0F172A;
    margin: 0;
  }

  p {
    font-size: 0.85rem;
    color: #64748B;
    max-width: 360px;
    margin: 0;
  }
`;

/* Modal Styles */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(31, 43, 69, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: white;
    font-size: 1.1rem;
    font-weight: 800;
    margin: 0;
  }

  button {
    background: none;
    border: none;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    font-size: 0.875rem;
    font-weight: 700;
    color: #0F172A;
    display: block;
    margin-bottom: 8px;
  }

  select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #0F172A;
    outline: none;
    background-color: #FAFAFA;
    appearance: none;
    
    &:focus {
      border-color: #0F172A;
    }
  }

  textarea {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    font-size: 0.925rem;
    font-weight: 500;
    color: #0F172A;
    outline: none;
    background-color: #FAFAFA;
    min-height: 100px;
    resize: vertical;
    
    &:focus {
      border-color: #0F172A;
    }
  }
`;

export const UploadBox = styled.div`
  border: 2px dashed #93C5FD;
  border-radius: 12px;
  background-color: #F8FAFC;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #EFF6FF;
    border-color: #1E3A8A;
  }

  .upload-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
  }

  strong {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 6px;
  }

  span {
    font-size: 0.8rem;
    font-weight: 500;
    color: #64748B;
  }
`;

export const UploadedFileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background-color: #F8FAFC;
  border: 1px solid #BFDBFE;
  border-radius: 10px;

  .file-details {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-circle {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: #EFF6FF;
      color: #1E3A8A;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div {
      strong {
        display: block;
        font-size: 0.9rem;
        font-weight: 700;
        color: #0F172A;
        margin-bottom: 2px;
      }
      span {
        font-size: 0.775rem;
        font-weight: 500;
        color: #64748B;
      }
    }
  }

  button {
    background: none;
    border: none;
    color: #EF4444;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 0.8rem;
    font-weight: 500;
    color: #888;
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
  }

  .buttons {
    display: flex;
    gap: 12px;
  }
`;

/* Toasts and Validation */
export const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
`;

export const ToastCard = styled.div`
  background-color: white;
  border-left: 4px solid #10B981;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 16px 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 380px;
  max-width: calc(100vw - 48px);
  position: relative;
  animation: slideInRight 0.3s ease-out forwards;

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100%); }
    to { opacity: 1; transform: translateX(0); }
  }

  .icon-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #10B981;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  .toast-content {
    h5 {
      margin: 0 0 4px 0;
      font-size: 0.95rem;
      font-weight: 800;
      color: #1F2B45;
    }
    p {
      margin: 0;
      font-size: 0.8rem;
      color: #888;
      font-weight: 500;
    }
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 0;
    display: flex;

    &:hover {
      color: #333;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: #EF4444;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: -12px;
  margin-bottom: 8px;
`;

/* ============================================================
   Materiais & Atividades (Creative & Teacher-Aligned View)
============================================================ */

export const MaterialsHeroBanner = styled.div`
  background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);
  border-radius: 16px;
  padding: 24px 28px;
  color: #FFFFFF;
  margin-bottom: 24px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;

  .hero-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;

    .title-area {
      max-width: 600px;

      .badge-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.15);
        color: #93C5FD;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 9999px;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      h3 {
        font-size: 1.35rem;
        font-weight: 800;
        margin: 0 0 6px 0;
        letter-spacing: -0.01em;
      }

      p {
        font-size: 0.875rem;
        color: #E2E8F0;
        margin: 0;
        line-height: 1.5;
        opacity: 0.95;
      }
    }
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);

    .stat-card {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      backdrop-filter: blur(4px);

      .icon-pill {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.18);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
      }

      .stat-texts {
        display: flex;
        flex-direction: column;

        .stat-value {
          font-size: 1rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #BFDBFE;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      }
    }
  }

  @media (max-width: 600px) {
    padding: 18px 20px;

    .stats-row {
      grid-template-columns: 1fr;
    }
  }
`;

export const StudentMaterialsControlsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 14px;
  box-sizing: border-box;

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
  }
`;

export const StudentMaterialsSearchBarWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 769px) {
    width: 320px;
    max-width: 360px;
    flex-shrink: 0;
  }
`;

export const StudentStatusCarouselWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  @media (min-width: 769px) {
    width: auto;
    flex: 1;
    min-width: 0;
  }

  .carousel-scroll {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding: 2px 2px 6px 2px;
    width: 100%;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  button.seg-btn {
    border: 1.5px solid #E2E8F0;
    background: #FFFFFF;
    color: #475569;
    padding: 7px 16px;
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s ease;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
    flex-shrink: 0;
    user-select: none;

    .count-chip {
      background: #F1F5F9;
      color: #475569;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 1px 7px;
      border-radius: 999px;
      line-height: 1.3;
    }

    &:hover {
      background: #F8FAFC;
      border-color: #CBD5E1;
      color: #0F172A;
    }

    &.active {
      background: #1F2B45;
      border-color: #1F2B45;
      color: #FFFFFF;

      .count-chip {
        background: rgba(255, 255, 255, 0.22);
        color: #FFFFFF;
      }
    }

    &.pending-btn {
      &.active {
        background: #1F2B45;
        border-color: #1F2B45;
        color: #FFFFFF;

        .count-chip.pending-chip {
          background: rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
        }
      }
      .count-chip.pending-chip {
        background: #EFF6FF;
        color: #1E40AF;
        border: 1px solid #DBEAFE;
      }
    }

    &.bookmark-btn {
      &.active {
        background: #1F2B45;
        border-color: #1F2B45;
        color: #FFFFFF;

        .count-chip {
          background: rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
        }
      }
    }
  }
`;

export const StudentMaterialsDropdownsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 18px;
  box-sizing: border-box;

  .filter-dropdown-item {
    min-width: 190px;
    flex: 1;

    @media (max-width: 768px) {
      min-width: 0;
      width: 100%;
      flex: none;
    }
  }

  .clear-filter-btn {
    background: transparent;
    border: none;
    color: #EF4444;
    font-size: 0.8125rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    padding: 0.45rem 0.75rem;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    flex-shrink: 0;
    transition: background 0.2s ease;

    &:hover {
      background: #FEE2E2;
    }

    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
      padding: 0.6rem;
      background: #FEF2F2;
      border: 1px solid #FECACA;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 16px;
  }
`;

export const StudentMaterialsFilterBar = StudentMaterialsSearchBarWrapper;
export const StudentMaterialsFilterGroup = StudentMaterialsDropdownsRow;

export const StudentMaterialSearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 1.5px solid #1F2B45;
  border-radius: 999px;
  padding: 0 16px;
  height: 38px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #2A4A7F;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
  }

  svg {
    color: #94A3B8;
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    width: 100%;
    height: 100%;
    font-size: 0.9rem;
    color: #1E293B;
    outline: none;
    font-family: inherit;

    &::placeholder {
      color: #94A3B8;
    }
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #94A3B8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      color: #0F172A;
      background: #F1F5F9;
    }
  }
`;

export const StudentLessonBlock = styled.div`
  margin-bottom: 24px;

  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 12px;

    h3 {
      font-size: 1.05rem;
      font-weight: 800;
      color: #0F172A;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;

      .badge-doc-count {
        font-size: 0.775rem;
        font-weight: 600;
        color: #64748B;
      }
    }
  }
`;

export const StudentMaterialCard = styled.div<{ $isViewed?: boolean; $isExpanded?: boolean }>`
  background: #FFFFFF;
  border: 1.5px solid ${({ $isExpanded }) => ($isExpanded ? "#1F2B45" : "#E2E8F0")};
  border-radius: 12px;
  padding: 14px 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $isExpanded }) =>
    $isExpanded
      ? "0 4px 16px rgba(31, 43, 69, 0.08)"
      : "0 1px 3px rgba(0, 0, 0, 0.02)"};

  &:hover {
    border-color: #1F2B45;
    box-shadow: 0 4px 14px rgba(31, 43, 69, 0.08);
    transform: translateY(-1px);

    h4 {
      color: #1E3A8A;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 14px 16px;
    gap: 12px;
    margin-bottom: 12px;
    transform: none !important;

    &:hover {
      transform: none !important;
      border-color: ${({ $isExpanded }) => ($isExpanded ? "#1F2B45" : "#CBD5E1")};
    }
  }
`;

export const StudentMaterialCardLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    gap: 12px;
  }
`;

export const StudentMaterialCardGlyph = styled.div<{ $type?: string }>`
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $type }) => {
    switch ($type) {
      case 'pdf':
        return 'background: #FEE2E2; color: #DC2626; border: 1.5px solid #FECACA;';
      case 'presentation':
        return 'background: #FEF3C7; color: #D97706; border: 1.5px solid #FDE68A;';
      case 'spreadsheet':
        return 'background: #DCFCE7; color: #16A34A; border: 1.5px solid #BBF7D0;';
      case 'image':
        return 'background: #E0F2FE; color: #0284C7; border: 1.5px solid #BAE6FD;';
      case 'video':
        return 'background: #EEF2FF; color: #4F46E5; border: 1.5px solid #C7D2FE;';
      case 'audio':
        return 'background: #FDF2F8; color: #DB2777; border: 1.5px solid #FBCFE8;';
      case 'link':
        return 'background: #EFF6FF; color: #2563EB; border: 1.5px solid #BFDBFE;';
      default:
        return 'background: #F1F5F9; color: #0F172A; border: 1.5px solid #E2E8F0;';
    }
  }}

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 10px;
  }
`;

export const StudentMaterialCardContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .card-primary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;

    h4 {
      margin: 0;
      font-size: 0.975rem;
      font-weight: 700;
      color: #0F172A;
      word-break: break-word;
      flex: 1;
      min-width: 140px;
      line-height: 1.35;
    }

    .status-badge-inline {
      flex-shrink: 0;
    }
  }

  p.desc {
    margin: 0;
    font-size: 0.825rem;
    color: #475569;
    line-height: 1.45;
  }

  .badges-line {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 4px;

    .badge-item {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      line-height: 1.3;

      &.category {
        background: #F1F5F9;
        color: #334155;
      }

      &.format {
        background: #EFF6FF;
        color: #1E3A8A;
        font-weight: 700;
      }

      &.size {
        color: #64748B;
      }

      &.date {
        color: #94A3B8;
      }

      &.external {
        color: #2563EB;
        font-weight: 600;
      }

      &.status-unviewed {
        background: #F8FAFC;
        color: #334155;
        border: 1px solid #CBD5E1;
        font-weight: 700;

        &::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3B82F6;
          margin-right: 2px;
        }
      }

      &.status-viewed {
        background: #F0FDF4;
        color: #166534;
        border: 1px solid #BBF7D0;
        font-weight: 600;
      }

      &.status-bookmarked {
        background: #FEF3C7;
        color: #92400E;
        border: 1px solid #FDE68A;
        font-weight: 700;
      }
    }
  }
`;

export const StudentMaterialSecondaryContent = styled.div<{ $isExpanded?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 768px) {
    display: ${({ $isExpanded }) => ($isExpanded ? 'flex' : 'none')} !important;
    padding-top: 10px;
    margin-top: 8px;
    border-top: 1px dashed #E2E8F0;
    animation: mobileDetailFadeIn 0.22s ease-out;

    @keyframes mobileDetailFadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

export const StudentMaterialMobileSecondaryActions = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
    padding-top: 8px;
    border-top: 1px solid #F1F5F9;

    .secondary-action-pill {
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 0.76rem;
      font-weight: 600;
      font-family: inherit;
      color: #334155;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;

      &:hover {
        background: #E2E8F0;
      }

      &.active {
        background: #FEF3C7;
        border-color: #F59E0B;
        color: #92400E;
      }

      &.viewed {
        background: #DCFCE7;
        border-color: #86EFAC;
        color: #166534;
      }
    }
  }
`;

export const StudentMaterialDesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none !important;
  }
`;

export const StudentMaterialMobileFooter = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid #F1F5F9;
    gap: 10px;
  }
`;

export const MobileExpandBtn = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #F8FAFC;
    border: 1px solid #CBD5E1;
    border-radius: 999px;
    padding: 6px 14px;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: inherit;
    color: #1F2B45;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #E2E8F0;
    }

    svg {
      color: #64748B;
    }
  }
`;

export const StudentViewDocPill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1.5px solid #1F2B45;
  background: #1F2B45;
  color: #FFFFFF;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(31, 43, 69, 0.12);

  &:hover {
    background: #151D2F;
    border-color: #151D2F;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(31, 43, 69, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    flex: initial;
  }
`;

export const StudentDownloadDocBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #F1F5F9;
  border: 1.5px solid #E2E8F0;
  color: #0F172A;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0F172A;
    border-color: #0F172A;
    color: #FFFFFF;
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    width: 38px;
  }
`;

export const StudentBatchViewBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 32px;
  padding: 0 12px;
  border-radius: 9999px;
  background: #0F172A;
  color: #FFFFFF;
  border: 1px solid #0F172A;
  font-size: 0.775rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);

  &:hover {
    background: #1E3A8A;
    transform: translateY(-1px);
  }
`;

export const StudentMaterialsStatusStrip = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 12px 18px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;

  .status-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;

    .icon-box {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      color: #1F2B45;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .info-col {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;

      h4 {
        font-size: 0.925rem;
        font-weight: 700;
        color: #0F172A;
        margin: 0;
      }

      .progress-text {
        font-size: 0.8125rem;
        color: #64748B;
        font-weight: 600;
      }

      .pending-pill {
        background: #EFF6FF;
        color: #1E40AF;
        border: 1px solid #DBEAFE;
        font-size: 0.725rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 9999px;
      }

      .all-done-pill {
        background: #DCFCE7;
        color: #166534;
        border: 1px solid #BBF7D0;
        font-size: 0.725rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 9999px;
      }

      .bookmarked-pill {
        background: #FEF3C7;
        color: #92400E;
        border: 1px solid #FDE68A;
        font-size: 0.725rem;
        font-weight: 700;
        padding: 3px 9px;
        border-radius: 9999px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
    }
  }

  .status-actions {
    display: flex;
    align-items: center;
    gap: 8px;

    button.quick-action-btn {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.775rem;
      font-weight: 600;
      color: #334155;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;

      &:hover {
        background: #1F2B45;
        border-color: #1F2B45;
        color: #FFFFFF;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StudentStatusSegmentedFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    width: 100%;
    margin-bottom: 16px;
  }

  button.seg-btn {
    border: 1.5px solid #E2E8F0;
    background: #FFFFFF;
    color: #475569;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s ease;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

    @media (max-width: 768px) {
      padding: 9px 8px;
      font-size: 0.775rem;
      border-radius: 10px;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .btn-short-label {
      display: none;
    }

    @media (max-width: 768px) {
      .btn-full-label {
        display: none;
      }
      .btn-short-label {
        display: inline;
      }
    }

    .count-chip {
      background: #F1F5F9;
      color: #475569;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 1px 7px;
      border-radius: 999px;
      line-height: 1.3;
    }

    &:hover {
      background: #F8FAFC;
      border-color: #CBD5E1;
      color: #0F172A;
    }

    &.active {
      background: #1F2B45;
      border-color: #1F2B45;
      color: #FFFFFF;

      .count-chip {
        background: rgba(255, 255, 255, 0.22);
        color: #FFFFFF;
      }
    }

    &.pending-btn {
      &.active {
        background: #1F2B45;
        border-color: #1F2B45;
        color: #FFFFFF;

        .count-chip.pending-chip {
          background: rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
        }
      }
      .count-chip.pending-chip {
        background: #EFF6FF;
        color: #1E40AF;
        border: 1px solid #DBEAFE;
      }
    }

    &.bookmark-btn {
      &.active {
        background: #1F2B45;
        border-color: #1F2B45;
        color: #FFFFFF;

        .count-chip {
          background: rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
        }
      }
    }
  }
`;

export const StudentBookmarkBtn = styled.button<{ $active?: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1.5px solid ${({ $active }) => ($active ? '#F59E0B' : '#E2E8F0')};
  background: ${({ $active }) => ($active ? '#FEF3C7' : '#FFFFFF')};
  color: ${({ $active }) => ($active ? '#D97706' : '#64748B')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: #F59E0B;
    background: #FEF3C7;
    color: #D97706;
    transform: translateY(-1px);
  }
`;

export const StudentToggleReadBtn = styled.button<{ $isViewed?: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1.5px solid ${({ $isViewed }) => ($isViewed ? '#BBF7D0' : '#E2E8F0')};
  background: ${({ $isViewed }) => ($isViewed ? '#DCFCE7' : '#FFFFFF')};
  color: ${({ $isViewed }) => ($isViewed ? '#16A34A' : '#64748B')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ $isViewed }) => ($isViewed ? '#F87171' : '#16A34A')};
    background: ${({ $isViewed }) => ($isViewed ? '#FEE2E2' : '#DCFCE7')};
    color: ${({ $isViewed }) => ($isViewed ? '#DC2626' : '#16A34A')};
    transform: translateY(-1px);
  }
`;


