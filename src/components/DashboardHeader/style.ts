import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  background: linear-gradient(180deg, #1e2a3a 0%, #2b3a4e 50%, #1e2a3a 100%);
  background-size: 100% 100vh;
  background-position: top;
  color: #f0ebe7;
  padding: 0 1.5rem;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding: 0 1rem;
  }
`;

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  align-items: center;
  color: #f0ebe7;
  min-width: 0;

  @media (max-width: 1023px) {
    justify-content: space-between;
  }

  .mobile-menu-btn {
    display: none;
    @media (max-width: 1023px) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
    }
  }
`;

export const Greeting = styled.h2`
  margin: 0;
  font-size: clamp(1rem, 1vw + 0.75rem, 1.2rem);
  line-height: 1.3;
  color: #f0ebe7;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const NotificationIcon = styled.div`
  cursor: pointer;
  color: #f0ebe7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    color: #d4957f;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 24px;
  transition: background-color 0.2s;
`;

export const Avatar = styled.div<{ $color?: string }>`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$color || "#d4957f"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$color || "#f0ebe7"};
  color: #ffffff;
  font-weight: 700;
  font-size: 0.875rem;
`;

export const DropdownIcon = styled.div`
  color: #f0ebe7;
  display: flex;
  align-items: center;
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: clamp(0.75rem, 2.5vw, 1.5rem);
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid #e8e0db;
  z-index: 1000;
  overflow: hidden;
  padding: 0.75rem;
  width: fit-content;
  max-width: calc(100vw - 1.5rem);
  box-sizing: border-box;
`;

export const ProfileDropdown = styled(DropdownContainer)`
  width: min(320px, calc(100vw - 1.5rem));
  max-width: calc(100vw - 1.5rem);

  @media (max-width: 479px) {
    right: 0.75rem;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  border-bottom: 1px solid #e8e0db;
  min-width: 0;

  .info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
    gap: 0.15rem;

    strong {
      font-size: 0.9375rem;
      line-height: 1.35;
      color: #2b3a4e;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      font-size: 0.875rem;
      line-height: 1.4;
      color: #64748b;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
  font-size: 0.9375rem;
  line-height: 1.4;
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
  font-size: 0.9375rem;
  line-height: 1.4;
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
  width: min(380px, calc(100vw - 1.5rem));
  right: 4.5rem;
  padding: 0;

  @media (max-width: 767px) {
    right: 3.5rem;
  }

  @media (max-width: 479px) {
    width: calc(100vw - 1.5rem);
    right: 0.75rem;
  }
`;

export const NotifHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e8e0db;
  flex-wrap: wrap;

  h3 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.3;
    color: #2b3a4e;
    font-weight: 700;
  }
`;

export const ToggleSwitch = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  cursor: pointer;

  .switch {
    width: 34px;
    height: 18px;
    background-color: ${({ $active }) => ($active ? "#d4957f" : "#ccc")};
    border-radius: 12px;
    position: relative;
    transition: background-color 0.2s;
    flex-shrink: 0;

    &::after {
      content: "";
      position: absolute;
      top: 2px;
      left: ${({ $active }) => ($active ? "18px" : "2px")};
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
  padding: 1rem 1.25rem;
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.375rem;
    gap: 0.5rem;

    h4 {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.35;
      color: ${({ $unread }) => ($unread ? "#d4957f" : "#2b3a4e")};
      font-weight: 600;
      flex: 1;
      min-width: 0;
    }

    .time {
      font-size: 0.8125rem;
      color: #64748b;
      white-space: nowrap;
      margin-right: ${({ $unread }) => ($unread ? "1rem" : "0")};
    }
  }

  .deadline {
    font-size: 0.875rem;
    color: #2b3a4e;
    font-weight: 500;
    margin: 0.15rem 0;
    line-height: 1.4;
  }

  .desc {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0;
    line-height: 1.45;
  }

  .indicator {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #d4957f;
  }
`;





