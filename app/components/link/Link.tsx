import NextLink from "next/link";
import type { LinkProps } from "./models/LinkProps.interface";

const Link = ({
  href,
  children,
  className,
  ariaLabel,
  onClick,
  ariaCurrent,
  replace,
  scroll,
}: LinkProps) => (
  <NextLink
    href={href}
    className={className}
    aria-label={ariaLabel}
    onClick={onClick}
    aria-current={ariaCurrent}
    replace={replace}
    scroll={scroll}
  >
    {children}
  </NextLink>
);

export default Link;
