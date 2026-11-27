import type { AriaCurrentValue } from "@/app/constants";
import type { MouseEvent } from "react";

export interface LinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  ariaCurrent?: AriaCurrentValue;
  replace?: boolean;
  scroll?: boolean;
}
