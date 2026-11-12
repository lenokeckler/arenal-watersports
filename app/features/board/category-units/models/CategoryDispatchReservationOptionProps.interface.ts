import type { CategoryDispatchReservation } from "@/app/components/dispatch-board/models/CategoryDispatchReservation.interface";

export interface CategoryDispatchReservationOptionProps {
  onChoose: (
    reservation: CategoryDispatchReservation
  ) => void;
  reservation: CategoryDispatchReservation;
  selectedCount: number;
}
