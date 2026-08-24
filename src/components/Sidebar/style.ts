import styled from "styled-components";

export const SidebarStyle = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.gold};
  border-radius: 0 9.375rem 9.375rem 0;
  justify-content: space-between;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  position: relative;
  width: 40%;
  height: 100%;
  font-family: "Rubik", sans-serif;

  @media (max-width: 768px) {
    display: none;
  }

  .fade-in,
  .fade-out {
    transition: opacity 0.8s ease;
  }

  .fade-in {
    opacity: 1;
  }

  .fade-out {
    opacity: 0.2;
  }
`;

export const SidebarImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 99%;
  height: 100%;
  height: 100%;
  border-radius: 0 9.375rem 9.375rem 0;
  background-color: #1e3a8a;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 0 9.375rem 9.375rem 0;

    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));

    z-index: 2;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 0 9.375rem 9.375rem 0;
    display: block;
  }
`;

export const SidebarTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  z-index: 999;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

export const SidebarTitleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    font-size: ${(props) => props.theme.sizes.subtitle};
    font-weight: 600;
    color: ${(props) => props.theme.colors.white};
  }

  h5 {
    font-size: ${(props) => props.theme.sizes.title};
    font-weight: 700;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const SidebarContent = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  z-index: 999;
  h4 {
    font-size: 25px;
    transition: opacity 0.5s ease-in-out;
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  h5 {
    font-size: ${(props) => props.theme.sizes.text};
    margin-bottom: 0.5rem;
  }

  h6 {
    font-size: ${(props) => props.theme.sizes.smallText};
    margin-bottom: 0.5rem;
  }
`;
