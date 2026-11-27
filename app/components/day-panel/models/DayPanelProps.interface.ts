import type { ReactNode } from "react";

export interface DayPanelProps {
  children: ReactNode;
  closeHref: string;
  isOpen: boolean;
  title: string;
}
