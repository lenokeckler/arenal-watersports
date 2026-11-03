import type { AriaCurrentValue } from "@/app/constants";

export interface LinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  ariaCurrent?: AriaCurrentValue;
}
