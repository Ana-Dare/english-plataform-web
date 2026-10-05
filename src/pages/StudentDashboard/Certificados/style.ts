import styled from 'styled-components';

export const CertificadosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: none;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 32px;
  box-sizing: border-box;
`;

export const CertificadoCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .badge-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.in-progress {
      background-color: #FEE8E8;
      color: #C57A67;
    }
    
    &.completed {
      background-color: #E8F0FE;
      color: #4A72FF;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .course-info {
    display: flex;
    flex-direction: column;
    gap: 6px;

    h3 {
      font-size: 1.1rem;
      font-weight: 800;
      color: #1F2B45;
      margin: 0;
    }
  }
`;

export const StatusTag = styled.span<{ $status: 'in-progress' | 'completed' }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 800;
  display: inline-block;
  width: fit-content;

  ${({ $status }) => 
    $status === 'in-progress' 
      ? 'background-color: #FEF6F5; color: #C57A67; border: 1px solid #FEE8E8;' 
      : 'background-color: #F8FAFC; color: #4A72FF; border: 1px solid #E2E8F0;'
  }
`;

export const ProgressArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 0.65rem;
      font-weight: 800;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    strong {
      font-size: 0.75rem;
      font-weight: 800;
      color: #1E293B;
    }
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #F1F5F9;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percent: number; $color: string }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: ${({ $color }) => $color};
  border-radius: 4px;
  transition: width 1s ease-out;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F1F5F9;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .warning-text {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #64748B;
    font-size: 0.75rem;
    font-weight: 600;

    svg {
      color: #94A3B8;
    }
  }

  .buttons {
    display: flex;
    gap: 12px;
    width: 100%;
    justify-content: flex-end;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'outline' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant }) => {
    if ($variant === 'outline') {
      return `
        background-color: white;
        color: #475569;
        border: 1px solid #CBD5E1;
        &:hover:not(:disabled) {
          background-color: #F8FAFC;
          color: #1E293B;
        }
      `;
    }
    return `
      background-color: #1F2B45;
      color: white;
      border: 1px solid #1F2B45;
      &:hover:not(:disabled) {
        background-color: #2D3E63;
      }
    `;
  }}
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.div`
  flex: 1;
  position: relative;
  
  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
  }

  input {
    width: 100%;
    padding: 14px 20px 14px 48px;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    background-color: white;
    font-size: 0.9rem;
    font-weight: 500;
    color: #1E293B;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:hover {
      background-color: #F8FAFC;
    }

    &:focus {
      border-color: #4A72FF;
      background-color: white;
    }
  }
`;

export const CustomDropdown = styled.div`
  position: relative;
  width: 240px;

  @media (max-width: 768px) {
    width: 100%;
  }

  .dropdown-header {
    padding: 14px 20px;
    background-color: white;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;

    &:hover {
      background-color: #F8FAFC;
    }

    &.open {
      border-color: #4A72FF;
    }
  }

  .dropdown-list {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background: white;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    overflow: hidden;
    z-index: 10;
    display: flex;
    flex-direction: column;

    .dropdown-item {
      padding: 12px 20px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1E293B;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 12px;

      &:hover {
        background-color: #F8FAFC;
      }
      
      &.active {
        background-color: #EFF6FF;
        color: #2563EB;
        font-weight: 700;
      }
    }
  }
`;
