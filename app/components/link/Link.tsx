import NextLink from "next/link";
import type { LinkProps } from "./models/LinkProps.interface";

const Link = ({
  href,
  children,
  className,
  ariaLabel,
  onClick,
  ariaCurrent,
  ariaLabel,
}: LinkProps) => (
  <NextLink
    href={href}
    className={className}
    aria-label={ariaLabel}
    onClick={onClick}
    aria-current={ariaCurrent}
    aria-label={ariaLabel}
  >
    {children}
  </NextLink>
);

export default Link;
