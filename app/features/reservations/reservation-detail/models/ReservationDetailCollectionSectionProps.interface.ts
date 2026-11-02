import type { ReactNode } from "react";

export interface ReservationDetailCollectionSectionProps {
  children: ReactNode;
  emptyMessage: string;
  isEmpty: boolean;
  sectionId: string;
  title: string;
}
