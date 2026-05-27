import styled from "styled-components";

export const EmailConfirmationStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #c9a327c2;
  font-family: "Rubik", sans-serif;
`;

export const ConfirmationContainer = styled.div`
  width: 40%;
  height: 40%;
  border-radius: 12px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10px);

  img {
    width: 7rem;
    height: 7rem;
    display: block;
  }

  h3 {
    font-size: 1.3rem;
    text-align: center;
    font-weight: 600;
    color: #222325;
  }

  span {
    font-size: 1.1rem;
    text-align: center;
    font-weight: 400;
    color: #222325;
  }
`;
