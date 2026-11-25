import type { ReactNode } from "react";

export interface CategoryUnitsHeaderProps {
  categoryName: string;
  children?: ReactNode;
  unitCount: number;
}
