import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 72px);
  background-color: #f1f5f9;
  margin: -32px;
  overflow: hidden;
`;

export const Sidebar = styled.div<{ $showInMobile: boolean }>`
  width: 400px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease;

  @media (max-width: 900px) {
    width: 100%;
    position: absolute;
    z-index: 10;
    transform: ${({ $showInMobile }) => ($showInMobile ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

export const SidebarHeader = styled.div`
  padding: 24px 24px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #0f172a;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const ToolButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: transparent;
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  padding: 0 24px 12px 24px;
  border-bottom: 1px solid #e2e8f0;
  gap: 24px;
`;

export const FilterTab = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  padding: 8px 0;
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active }) => ($active ? "#0f172a" : "#64748b")};
  border-bottom: 2px solid ${({ $active }) => ($active ? "#0f172a" : "transparent")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #0f172a;
  }
`;

export const NotificationList = styled.div`
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
  }
`;

export const NotificationItem = styled.div<{ $unread: boolean; $active: boolean }>`
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  background-color: ${({ $active }) => $active ? "#f8fafc" : "#ffffff"};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  border-left: ${({ $active }) => $active ? "4px solid #3b82f6" : "4px solid transparent"};

  &:hover {
    background-color: #f8fafc;
  }

  .content-wrapper {
    flex: 1;
    min-width: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    h4 {
      margin: 0;
      font-size: 0.95rem;
      color: ${({ $unread }) => $unread ? "#0f172a" : "#475569"};
      font-weight: ${({ $unread }) => $unread ? "700" : "600"};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .time {
      font-size: 0.75rem;
      color: #94a3b8;
      flex-shrink: 0;
    }
  }

  .desc {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #3b82f6;
    margin-top: 6px;
    flex-shrink: 0;
  }
`;

export const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  margin-top: 2px;
  flex-shrink: 0;

  &:checked {
    background-color: #0f172a;
    border-color: #0f172a;
    
    &::after {
      content: '';
      position: absolute;
      left: 4px;
      top: 1px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &:hover {
    border-color: #94a3b8;
  }
`;

export const ContentArea = styled.div<{ $showInMobile: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9;
  height: 100%;
  overflow-y: auto;
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
    display: ${({ $showInMobile }) => ($showInMobile ? 'flex' : 'none')};
  }
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #64748b;

  svg {
    color: #cbd5e1;
    margin-bottom: 24px;
  }

  h3 {
    margin: 0;
    color: #0f172a;
    font-size: 1.5rem;
    font-weight: 700;
  }

  p {
    margin-top: 8px;
    font-size: 1rem;
  }
`;

export const DetailView = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 900px) {
    padding: 24px;
  }
`;

export const MobileBackButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 0;

  &:hover {
    color: #0f172a;
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;

export const DetailHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 2.2rem;
    color: #0f172a;
    margin: 0 0 16px 0;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #64748b;
    font-size: 0.95rem;

    .tag {
      background-color: #e2e8f0;
      color: #334155;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.85rem;
    }
  }
`;

export const DetailBody = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.05);

  p {
    color: #334155;
    line-height: 1.7;
    font-size: 1.05rem;
    margin-top: 0;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
  }
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'favorite' | 'archive' | 'danger' }>`
  background-color: ${({ $variant }) => $variant === 'primary' ? "#0f172a" : "#ffffff"};
  color: ${({ $variant }) => {
    if ($variant === 'primary') return "#ffffff";
    if ($variant === 'danger') return "#ef4444";
    if ($variant === 'favorite') return "#f59e0b";
    return "#475569";
  }};
  border: 1px solid ${({ $variant }) => {
    if ($variant === 'primary') return "#0f172a";
    if ($variant === 'danger') return "#fca5a5";
    if ($variant === 'favorite') return "#fcd34d";
    return "#cbd5e1";
  }};
  padding: 10px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${({ $variant }) => $variant === 'primary' ? "0 4px 12px rgba(15, 23, 42, 0.15)" : "0 2px 4px rgba(15, 23, 42, 0.05)"};

  &:hover {
    transform: translateY(-2px) scale(1.02);
    
    ${({ $variant }) => {
      if ($variant === 'primary') {
        return `
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.25);
        `;
      }
      if ($variant === 'danger') {
        return `
          background: #fef2f2;
          border-color: #ef4444;
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.15);
        `;
      }
      if ($variant === 'favorite') {
        return `
          background: #fffbeb;
          border-color: #f59e0b;
          box-shadow: 0 6px 16px rgba(245, 158, 11, 0.15);
        `;
      }
      return `
        background-color: #f8fafc;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
      `;
    }}
  }
  
  &:active {
    transform: translateY(0) scale(1);
  }
`;
