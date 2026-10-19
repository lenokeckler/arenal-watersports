import type { ReservationEquipmentViewModel } from "./ReservationEquipmentViewModel.interface";
import type { useReservationFormState } from "../hooks/useReservationFormState";

export interface CreateReservationFormHandlersProps {
  equipment: ReservationEquipmentViewModel;
  setHasEquipmentSelectionChanged: (value: boolean) => void;
  state: ReturnType<typeof useReservationFormState>;
}
