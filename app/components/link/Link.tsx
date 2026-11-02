import NextLink from "next/link";
import { LinkProps } from "./LinkProps";

const Link = ({
  ariaLabel,
  href,
  children,
  className,
  onClick,
}: LinkProps) => (
  <NextLink
    aria-label={ariaLabel}
    href={href}
    className={className}
    onClick={onClick}
  >
    {children}
  </NextLink>
);

export default Link;
