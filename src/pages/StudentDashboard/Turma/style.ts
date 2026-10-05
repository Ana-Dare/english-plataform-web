import styled from 'styled-components';

export const TurmaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Banner = styled.div`
  background-color: #1F2B45;
  border-radius: 12px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }

  h2 {
    color: white;
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0;
    word-break: break-word;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const BannerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const BannerBadge = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  color: #C57A67;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 800;
  border: 1px solid rgba(197, 122, 103, 0.3);
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
  font-size: 0.85rem;
  font-weight: 600;
`;

export const TabsList = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0;
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
    padding-bottom: 4px;
  }
`;

export const TabItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 0 0 16px 0;
  font-size: 0.95rem;
  font-weight: 800;
  color: ${({ $active }) => ($active ? '#1F2B45' : '#888')};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.2s;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0 0 12px 0;
    gap: 6px;
  }

  svg {
    width: 18px;
    height: 18px;
    
    @media (max-width: 768px) {
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
`;

export const ContentArea = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  border: 1px solid #f2f2f2;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: #1F2B45;
    margin: 0;
  }

  .right-action {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
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
  background-color: #F8FAFC;
  border-radius: 12px;
  padding: 6px;
  border: 1px solid #E2E8F0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active }) => ($active ? '#1F2B45' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : '#64748B')};
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ $active }) => ($active ? '0 4px 6px rgba(31, 43, 69, 0.2)' : 'none')};

  &:hover {
    color: ${({ $active }) => ($active ? 'white' : '#1F2B45')};
  }

  @media (max-width: 600px) {
    flex: 1;
    padding: 8px 12px;
    font-size: 0.8rem;
  }
`;

export const AtestadoCard = styled.div<{ $status: 'aprovado' | 'pendente' | 'rejeitado' }>`
  border: 1px solid ${({ $status }) => 
    $status === 'aprovado' ? '#A7F3D0' : 
    $status === 'pendente' ? '#FDE68A' : '#FECACA'};
  border-left: 6px solid ${({ $status }) => 
    $status === 'aprovado' ? '#10B981' : 
    $status === 'pendente' ? '#F59E0B' : '#EF4444'};
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 24px;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 16px;
    }

    .file-info {
      display: flex;
      gap: 16px;
      align-items: center;

      .icon-box {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background-color: #F8FAFC;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4A72FF;
        border: 1px solid #E2E8F0;
      }

      h5 {
        font-size: 1.05rem;
        font-weight: 800;
        color: #1E293B;
        margin: 0 0 6px 0;
      }
      p {
        font-size: 0.85rem;
        color: #64748B;
        margin: 0;
        font-weight: 500;
      }
    }
  }

  .justified-class {
    background-color: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    div {
      span {
        display: block;
        font-size: 0.75rem;
        font-weight: 800;
        color: #64748B;
        text-transform: uppercase;
        margin-bottom: 6px;
        letter-spacing: 0.5px;
      }
      strong {
        font-size: 1.1rem;
        font-weight: 800;
        color: #0F172A;
      }
    }
  }

  .desc-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      width: 100%;
    }

    .desc-content {
      span {
        display: block;
        font-size: 0.85rem;
        font-weight: 600;
        color: #64748B;
        margin-bottom: 8px;
      }
      p {
        font-size: 0.95rem;
        font-weight: 500;
        color: #334155;
        margin: 0;
        line-height: 1.5;
        max-width: 600px;
      }
      .status-msg {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        font-weight: 800;
        margin-top: 16px;
        
        &.pendente { color: #D97706; }
        &.rejeitado { color: #DC2626; }
        &.aprovado { color: #059669; }
      }
    }

    button {
      @media (max-width: 600px) {
        width: 100%;
        justify-content: center;
      }
    }
  }
`;

export const StatusTag = styled.span<{ $status: 'aprovado' | 'pendente' | 'rejeitado' }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.3px;

  ${({ $status }) => {
    switch ($status) {
      case 'aprovado':
        return 'background-color: #ECFDF5; color: #059669; border: 1px solid #A7F3D0;';
      case 'pendente':
        return 'background-color: #FFFBEB; color: #D97706; border: 1px solid #FDE68A;';
      case 'rejeitado':
        return 'background-color: #FEF2F2; color: #DC2626; border: 1px solid #FECACA;';
    }
  }}
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
  background-color: #1F2B45;
  padding: 20px 24px;
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
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

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
    font-size: 0.9rem;
    font-weight: 800;
    color: #1F2B45;
    display: block;
    margin-bottom: 8px;
  }

  select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #333;
    outline: none;
    background-color: #FAFAFA;
    appearance: none;
    
    &:focus {
      border-color: #C57A67;
    }
  }

  textarea {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #333;
    outline: none;
    background-color: #FAFAFA;
    min-height: 100px;
    resize: vertical;
    
    &:focus {
      border-color: #C57A67;
    }
  }
`;

export const UploadBox = styled.div`
  border: 2px dashed #C57A67;
  border-radius: 12px;
  background-color: #FEF6F5;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #FEE8E8;
  }

  .upload-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #C57A67;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  strong {
    font-size: 1rem;
    font-weight: 800;
    color: #1F2B45;
    margin-bottom: 8px;
  }

  span {
    font-size: 0.8rem;
    font-weight: 500;
    color: #888;
  }
`;

export const UploadedFileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #FAFAFA;
  border: 1px solid #E2E8F0;
  border-radius: 8px;

  .file-details {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background-color: #FEE8E8;
      color: #C57A67;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div {
      strong {
        display: block;
        font-size: 0.9rem;
        font-weight: 800;
        color: #1F2B45;
        margin-bottom: 2px;
      }
      span {
        font-size: 0.75rem;
        font-weight: 500;
        color: #888;
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

