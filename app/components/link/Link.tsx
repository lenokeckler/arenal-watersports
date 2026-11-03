import NextLink from "next/link";
import { LinkProps } from "./LinkProps";

const Link = ({
  href,
  children,
  className,
  onClick,
  ariaCurrent,
}: LinkProps) => (
  <NextLink
    href={href}
    className={className}
    onClick={onClick}
    aria-current={ariaCurrent}
  >
    {children}
  </NextLink>
);

export default Link;
