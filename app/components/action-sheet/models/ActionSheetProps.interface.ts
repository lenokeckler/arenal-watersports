import type { ReactNode } from "react";

export interface ActionSheetProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
}
