import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: relative;
  display: flex; justify-content: flex-end; align-items: center; height: 100%;
  width: 100%;
  background: linear-gradient(180deg, #1e2a3a 0%, #2b3a4e 50%, #1e2a3a 100%);
  background-size: 100% 100vh;
  background-position: top;
  color: #f0ebe7;
  padding: 0 2rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end; gap: 24px;
  @media (max-width: 1024px) {
    justify-content: space-between;
  }
  align-items: center;
  color: #f0ebe7;

  .mobile-menu-btn {
    display: none;
    @media (max-width: 1024px) {
      display: flex;
    }
  }
`;

export const Greeting = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #f0ebe7;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none; /* Hide greeting on very small screens to save space */
  }
`;

export const NotificationIcon = styled.div`
  cursor: pointer;
  color: #f0ebe7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    color: #d4957f;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 24px;
  transition: background-color 0.2s;
`;

export const Avatar = styled.div<{ $color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$color || "#d4957f"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$color || "#f0ebe7"};
  color: #ffffff;
  font-weight: bold;
  font-size: 0.875rem;
`;

export const DropdownIcon = styled.div`
  color: #f0ebe7;
  display: flex;
  align-items: center;
`;

// Dropdown Styles
export const DropdownContainer = styled.div`
  position: absolute;
  top: 70px;
  right: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e0db;
  z-index: 1000;
  overflow: hidden;
  padding: 1rem;
  width: fit-content;
  max-width:;
`;

export const ProfileDropdown = styled(DropdownContainer)`
  max-width: 20rem;
  width: fit-content;

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    right: 16px;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #e8e0db;

  .info {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 0.95rem;
      color: #2b3a4e;
    }

    span {
      font-size: 0.8rem;
      color: #7a8a9e;
    }
  }
`;

export const DropdownMenuList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0;
`;

export const DropdownMenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  background: transparent;
  border: none;
  color: #2b3a4e;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Rubik", sans-serif;
  border-radius: 8px;

  &:hover {
    background-color: #f9f6f4;
    color: #d4957f;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #7a8a9e;
    flex-shrink: 0;
  }

  &:hover svg {
    color: #d4957f;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: #e8e0db;
  margin: 0.25rem 0.5rem;
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  background: transparent;
  border: none;
  color: #b0705c;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Rubik", sans-serif;
  border-radius: 8px;

  &:hover {
    background-color: #fdf0ec;
    color: #964a33;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #b0705c;
    flex-shrink: 0;
  }

  &:hover svg {
    color: #964a33;
  }
`;

export const NotificationDropdown = styled(DropdownContainer)`
  width: 360px;
  right: 80px; /* Offset it slightly */

  @media (max-width: 768px) {
    right: 60px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    right: 16px;
  }
`;

export const NotifHeader = styled.div`
  display: flex;
  justify-content: flex-end; gap: 24px;
  @media (max-width: 1024px) {
    justify-content: space-between;
  }
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e0db;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: #2b3a4e;
  }
`;

export const ToggleSwitch = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #7a8a9e;
  cursor: pointer;

  .switch {
    width: 32px;
    height: 18px;
    background-color: ${({ $active }) => ($active ? "#d4957f" : "#ccc")};
    border-radius: 12px;
    position: relative;
    transition: background-color 0.2s;

    &::after {
      content: "";
      position: absolute;
      top: 2px;
      left: ${({ $active }) => ($active ? "16px" : "2px")};
      width: 14px;
      height: 14px;
      background-color: white;
      border-radius: 50%;
      transition: left 0.2s;
    }
  }
`;

export const NotifList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const NotifItem = styled.div<{ $unread: boolean }>`
  padding: 16px 20px;
  border-bottom: 1px solid #f0ebe7;
  background-color: ${({ $unread }) => ($unread ? "#fcfaf9" : "#ffffff")};
  transition: background-color 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f5f2f0;
  }

  .title-row {
    display: flex;
    justify-content: flex-end; gap: 24px;
  @media (max-width: 1024px) {
    justify-content: space-between;
  }
    align-items: center;
    margin-bottom: 6px;
    gap: 8px;

    h4 {
      margin: 0;
      font-size: 0.95rem;
      color: ${({ $unread }) => ($unread ? "#d4957f" : "#2b3a4e")};
      font-weight: 600;
      flex: 1;
    }

    .time {
      font-size: 0.75rem;
      color: #7a8a9e;
      white-space: nowrap;
      margin-right: ${({ $unread }) => ($unread ? "16px" : "0")};
    }
  }

  .deadline {
    font-size: 0.8rem;
    color: #2b3a4e;
    font-weight: 500;
    margin: 2px 0;
  }

  .desc {
    font-size: 0.85rem;
    color: #7a8a9e;
    margin: 0;
    line-height: 1.4;
  }

  .indicator {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #d4957f;
  }
`;





