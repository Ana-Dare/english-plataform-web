import styled from "styled-components";

export const SidebarStyle = styled.div`
  display: flex;
  flex: 1;
  padding: 4rem 10%;
  box-sizing: border-box;
  background-color: #08142c;
  justify-content: center;
  flex-direction: column;
  color: #ffffff;
  position: relative;
  width: 100vh%;
  height: 100%;
  font-family: "Rubik", sans-serif;
  gap: 3rem;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  box-shadow: 10px 0 40px rgba(8, 20, 44, 0.15);
  z-index: 10;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CreativeCircle = styled.div<{
  $size: string;
  $top: string;
  $right: string;
  $borderWidth?: string;
  $opacity?: number;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  right: ${({ $right }) => $right};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  border: ${({ $borderWidth }) => $borderWidth || "1px"} solid
    rgba(245, 230, 211, ${({ $opacity }) => $opacity || 0.1});
  pointer-events: none;
  z-index: 1;
`;

export const FloatingElement = styled.div<{
  $top: string;
  $left?: string;
  $right?: string;
  $size: string;
  $opacity: number;
  $delay: number;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  ${({ $left }) => $left && `left: ${$left};`}
  ${({ $right }) => $right && `right: ${$right};`}
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background: radial-gradient(circle, #ffffff 0%, transparent 70%);
  opacity: ${({ $opacity }) => $opacity};
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;

  animation: float 10s infinite ease-in-out alternate;
  animation-delay: ${({ $delay }) => $delay}s;

  @keyframes float {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(20px, -30px) scale(1.1);
    }
  }
`;

export const SidebarTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  z-index: 999;
`;

export const IconWrapper = styled.div`
  font-size: 2.8rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  color: #f5e6d3;
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
