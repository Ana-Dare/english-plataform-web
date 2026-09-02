import styled, { css } from "styled-components";

export const SidebarWrapper = styled.nav<{ $collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${({ $collapsed }) => ($collapsed ? "96px" : "272px")};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
`;

export const ToggleButton = styled.button<{ $collapsed: boolean }>`
  position: absolute;
  top: 31px;
  right: ${({ $collapsed }) => ($collapsed ? "auto" : "16px")};
  left: ${({ $collapsed }) => ($collapsed ? "50%" : "auto")};
  transform: ${({ $collapsed }) => ($collapsed ? "translateX(-50%)" : "none")};
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2.5px solid rgba(255, 255, 255, 0.15);
  color: #ffa38c;
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
    transform: ${({ $collapsed }) =>
      $collapsed ? "rotate(0deg)" : "rotate(180deg)"};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: ${({ $collapsed }) =>
      $collapsed ? "translateX(-50%) scale(1.1)" : "scale(1.1)"};
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
  }
`;

export const LogoContainer = styled.div<{ $collapsed: boolean }>`
  display: flex;
  visibility: ${({ $collapsed }) => ($collapsed ? "hidden" : "visible")};
  align-items: center;
  padding: ${({ $collapsed }) => ($collapsed ? "1.5rem 0" : "1.5rem 1.2rem")};
  gap: 12px;
  justify-content: ${({ $collapsed }) =>
    $collapsed ? "center" : "flex-start"};
  transition: padding 0.3s ease;
  margin-bottom: 0.5rem;
`;

export const LogoCircle = styled.div<{ $color?: string }>`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$color || "linear-gradient(135deg, #C57A67, #FFA38C)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
  font-family: serif;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(197, 122, 103, 0.3);
`;

export const LogoText = styled.span<{ $collapsed: boolean }>`
  font-weight: 600;
  font-size: 1rem;
  color: #ffffff;
  white-space: nowrap;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transform: ${({ $collapsed }) =>
    $collapsed ? "translateX(-10px)" : "translateX(0)"};
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
  pointer-events: ${({ $collapsed }) => ($collapsed ? "none" : "auto")};
  overflow: hidden;
  max-width: ${({ $collapsed }) => ($collapsed ? "0" : "180px")};
`;

export const Divider = styled.div<{ $collapsed: boolean }>`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0 ${({ $collapsed }) => ($collapsed ? "12px" : "20px")};
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
  padding-left: ${({ $collapsed }) => ($collapsed ? "0" : "20px")};
  margin: 2px ${({ $collapsed }) => ($collapsed ? "8px" : "12px")};
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  justify-content: ${({ $collapsed }) =>
    $collapsed ? "center" : "flex-start"};
  transition: all 0.25s ease;
  position: relative;

  ${({ $active }) =>
    $active
      ? css`
          color: #ffffff;
          background: rgba(197, 122, 103, 0.25);
          font-weight: 600;
          box-shadow: 0 0 0 1px rgba(197, 122, 103, 0.3);
        `
      : css`
          color: rgba(255, 255, 255, 0.65);
          background-color: transparent;
          font-weight: 400;
        `}

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(197, 122, 103, 0.3)" : "rgba(255, 255, 255, 0.06)"};
    color: #ffffff;
  }

  svg {
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin-right: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
    transition: all 0.25s ease;
    color: ${({ $active }) =>
      $active ? "#FFA38C" : "rgba(255, 255, 255, 0.5)"};
  }

  &:hover svg {
    color: ${({ $active }) =>
      $active ? "#FFA38C" : "rgba(255, 255, 255, 0.8)"};
  }
`;

export const MenuLabel = styled.span<{ $collapsed: boolean }>`
  font-size: 0.9rem;
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transform: ${({ $collapsed }) =>
    $collapsed ? "translateX(-8px)" : "translateX(0)"};
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  pointer-events: ${({ $collapsed }) => ($collapsed ? "none" : "auto")};
  overflow: hidden;
  max-width: ${({ $collapsed }) => ($collapsed ? "0" : "180px")};
`;

export const Tooltip = styled.div`
  position: absolute;
  left: calc(100% + 12px);
  background: #1f2b45;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(77, 77, 77, 0.5);
  z-index: 100;

  &::before {
    content: "";
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 5px 5px 5px 0;
    border-style: solid;
    border-color: transparent #1f2b45 transparent transparent;
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
