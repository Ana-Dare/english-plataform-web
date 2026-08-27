import styled from "styled-components";

export const AlertContainer = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ $color }) => ($color ? $color : "#38424b")};
  border-radius: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  posi
`;
