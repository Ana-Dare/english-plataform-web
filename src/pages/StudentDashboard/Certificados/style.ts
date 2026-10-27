import styled from 'styled-components';

export const CertificadosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding-bottom: 2rem;
  box-sizing: border-box;
`;

export const CertificadoCard = styled.div`
  background-color: white;
  border-radius: 14px;
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-width: 0;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;

  .badge-icon {
    width: 48px;
    height: 48px;
    min-width: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

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
    gap: 0.375rem;
    min-width: 0;

    h3 {
      font-size: clamp(1.125rem, 1vw + 0.875rem, 1.375rem);
      line-height: 1.3;
      font-weight: 800;
      color: #1F2B45;
      margin: 0;
    }
  }
`;

export const StatusTag = styled.span<{ $status: 'in-progress' | 'completed' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 700;
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
  gap: 0.5rem;

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 0.8125rem;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    
    strong {
      font-size: 0.875rem;
      font-weight: 800;
      color: #1E293B;
    }
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #F1F5F9;
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percent: number; $color: string }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: ${({ $color }) => $color};
  border-radius: 999px;
  transition: width 1s ease-out;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #F1F5F9;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .warning-text {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    color: #64748B;
    font-size: 0.875rem;
    line-height: 1.4;
    font-weight: 600;

    svg {
      color: #94A3B8;
      flex-shrink: 0;
    }
  }

  .buttons {
    display: flex;
    gap: 0.75rem;
    width: auto;
    justify-content: flex-end;
    flex-wrap: wrap;

    @media (max-width: 600px) {
      width: 100%;
      flex-direction: column;
    }
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'outline' }>`
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.25;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

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
  gap: 1rem;
  margin-bottom: 0.5rem;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.div`
  flex: 1;
  position: relative;
  min-width: 0;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
    pointer-events: none;
  }

  input {
    width: 100%;
    min-width: 0;
    padding: 0.875rem 1.25rem 0.875rem 3rem;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    background-color: white;
    font-size: 0.9375rem;
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

  @media (max-width: 767px) {
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
