import styled from "styled-components";
import type { ILinkProps } from ".";

export const LinkStyle = styled.div<ILinkProps>`
  color: ${(props) => props.$color || "blue"};
  font-size: ${(props) => {
    switch (props.$size) {
      case "small":
        return "12px";
      case "medium":
        return "16px";
      case "large":
        return "20px";
      default:
        return "16px";
    }
  }};
`;
