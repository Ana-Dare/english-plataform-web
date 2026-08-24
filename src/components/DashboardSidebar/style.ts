import styled, { css } from 'styled-components';

export const SidebarWrapper = styled.nav<{ $collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${({ $collapsed }) => ($collapsed ? '78px' : '260px')};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
`;

export const ToggleButton = styled.button<{ $collapsed: boolean }>`
  position: absolute;
  top: 28px;
  right: -14px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #1a2d4a;
  border: 2.5px solid #263f63;
  color: #8ab4f8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.3s ease;
    transform: ${({ $collapsed }) => ($collapsed ? 'rotate(0deg)' : 'rotate(180deg)')};
  }

  &:hover {
    background: #263f63;
    transform: scale(1.1);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
  }
`;

export const LogoContainer = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ $collapsed }) => ($collapsed ? '1.5rem 0' : '1.5rem 1.2rem')};
  gap: 12px;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
`;

export const LogoCircle = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #f3e5ab);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a1628;
  font-weight: bold;
  font-family: serif;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
`;

export const LogoText = styled.span<{ $collapsed: boolean }>`
  font-weight: 600;
  font-size: 1rem;
  color: #e8edf5;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transform: ${({ $collapsed }) => ($collapsed ? 'translateX(-10px)' : 'translateX(0)')};
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: ${({ $collapsed }) => ($collapsed ? 'none' : 'auto')};
  overflow: hidden;
  max-width: ${({ $collapsed }) => ($collapsed ? '0' : '180px')};
`;

export const Divider = styled.div<{ $collapsed: boolean }>`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0 ${({ $collapsed }) => ($collapsed ? '12px' : '20px')};
  transition: margin 0.3s ease;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MenuItem = styled.li<{ $active?: boolean; $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  padding: 11px 0;
  padding-left: ${({ $collapsed }) => ($collapsed ? '0' : '20px')};
  margin: 2px ${({ $collapsed }) => ($collapsed ? '8px' : '12px')};
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  transition: all 0.25s ease;
  position: relative;

  ${({ $active }) =>
    $active
      ? css`
          color: #ffffff;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.08));
          font-weight: 600;
          box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.25);
        `
      : css`
          color: rgba(200, 210, 230, 0.7);
          background-color: transparent;
          font-weight: 400;
        `}

  &:hover {
    background: ${({ $active }) =>
      $active
        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.12))'
        : 'rgba(255, 255, 255, 0.06)'};
    color: #ffffff;
  }

  svg {
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin-right: ${({ $collapsed }) => ($collapsed ? '0' : '14px')};
    transition: all 0.25s ease;
    color: ${({ $active }) => ($active ? '#d4af37' : 'rgba(200, 210, 230, 0.55)')};
  }

  &:hover svg {
    color: ${({ $active }) => ($active ? '#e8c84a' : '#8ab4f8')};
  }
`;

export const MenuLabel = styled.span<{ $collapsed: boolean }>`
  font-size: 0.9rem;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transform: ${({ $collapsed }) => ($collapsed ? 'translateX(-8px)' : 'translateX(0)')};
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: ${({ $collapsed }) => ($collapsed ? 'none' : 'auto')};
  overflow: hidden;
  max-width: ${({ $collapsed }) => ($collapsed ? '0' : '180px')};
`;

export const Tooltip = styled.div`
  position: absolute;
  left: calc(100% + 12px);
  background: #1e3254;
  color: #e8edf5;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 5px 5px 5px 0;
    border-style: solid;
    border-color: transparent #1e3254 transparent transparent;
  }
`;

export const MenuItemWrapper = styled.div<{ $collapsed: boolean }>`
  position: relative;
  
  ${({ $collapsed }) =>
    $collapsed &&
    css`
      &:hover ${Tooltip} {
        opacity: 1;
        transform: translateX(0);
      }
    `}
`;
