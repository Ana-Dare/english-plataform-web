import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  background: linear-gradient(180deg, #0a1628 0%, #0e1f3d 50%, #0a1628 100%);
  background-size: 100% 100vh;
  background-position: top;
  color: #fff;
  padding: 0 2rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

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
  color: #fff;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none; /* Hide greeting on very small screens to save space */
  }
`;

export const NotificationIcon = styled.div`
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    color: #f5f5f5;
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

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #d4af37;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcedb3;
  color: #d4af37;
`;

export const DropdownIcon = styled.div`
  color: #fff;
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
  border: 1px solid #f0f0f0;
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
  border-bottom: 1px solid #f0f0f0;

  .info {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 0.95rem;
      color: #333;
    }

    span {
      font-size: 0.8rem;
      color: #888;
    }
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: transparent;
  border: none;
  color: #333;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
    color: #d4af37;
  }

  svg {
    color: #666;
  }

  &:hover svg {
    color: #d4af37;
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
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: #333;
  }
`;

export const ToggleSwitch = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;

  .switch {
    width: 32px;
    height: 18px;
    background-color: ${({ $active }) => ($active ? "#2563eb" : "#ccc")};
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
  border-bottom: 1px solid #f9f9f9;
  background-color: ${({ $unread }) => ($unread ? "#fdf8e1" : "#ffffff")};
  transition: background-color 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${({ $unread }) => ($unread ? "#fcedb3" : "#f5f5f5")};
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;

    h4 {
      margin: 0;
      font-size: 0.95rem;
      color: #333;
      font-weight: 600;
    }

    .time {
      font-size: 0.75rem;
      color: #888;
    }
  }

  .deadline {
    font-size: 0.8rem;
    color: #2563eb;
    margin: 2px 0;
  }

  .desc {
    font-size: 0.85rem;
    color: #666;
    margin: 0;
  }

  .indicator {
    position: absolute;
    top: 18px;
    right: 20px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ $unread }) => ($unread ? "#2563eb" : "transparent")};
  }
`;
