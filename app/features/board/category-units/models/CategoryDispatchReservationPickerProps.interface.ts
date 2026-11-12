import type { CategoryDispatchReservation } from "@/app/components/dispatch-board/models/CategoryDispatchReservation.interface";

export interface CategoryDispatchReservationPickerProps {
  categoryId: string;
  onClose: () => void;
  onChoose: (
    reservation: CategoryDispatchReservation
  ) => void;
  selectedCount: number;
}
