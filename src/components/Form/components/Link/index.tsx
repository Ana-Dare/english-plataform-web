import { LinkStyle } from "./style";

export interface ILinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  $color?: string;
  $size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

const Link = ({ $color, $size, children, ...props }: ILinkProps) => {
  return (
    <LinkStyle $color={$color} $size={$size} {...props}>
      {children}
    </LinkStyle>
  );
};

export default Link;
