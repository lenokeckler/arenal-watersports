import NextLink from "next/link";
import { LinkProps } from "./LinkProps";

const Link = ({
  href,
  children,
  className,
  onClick,
  ariaCurrent,
  ariaLabel,
}: LinkProps) => (
  <NextLink
    href={href}
    className={className}
    onClick={onClick}
    aria-current={ariaCurrent}
    aria-label={ariaLabel}
  >
    {children}
  </NextLink>
);

export default Link;
