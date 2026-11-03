import NextLink from "next/link";
import type { LinkProps } from "./models/LinkProps.interface";

const Link = ({
  href,
  children,
  className,
  ariaLabel,
  onClick,
}: LinkProps) => (
  <NextLink
    href={href}
    className={className}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {children}
  </NextLink>
);

export default Link;
