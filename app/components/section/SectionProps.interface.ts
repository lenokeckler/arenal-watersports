import { ReactNode, HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export default SectionProps;
