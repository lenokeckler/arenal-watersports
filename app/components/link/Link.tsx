import NextLink from "next/link";
import { LinkProps } from "./LinkProps";

const Link = ({
  href,
  children,
  className,
  onClick,
}: LinkProps) => (
  <NextLink
    href={href}
    className={className}
    onClick={onClick}
  >
    {children}
  </NextLink>
);

export default Link;
