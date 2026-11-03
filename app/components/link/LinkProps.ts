import { ARIA_CURRENT } from "@/app/constants/strings/AriaCurrent.constants";

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaCurrent?: typeof ARIA_CURRENT.PAGE;
}
