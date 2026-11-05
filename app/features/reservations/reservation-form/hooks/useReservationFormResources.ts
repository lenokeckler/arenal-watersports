import { STRING } from "@/app/constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationFormEquipmentViewModel } from "./useReservationFormEquipmentViewModel";
import { useReservationFormState } from "./useReservationFormState";

export const useReservationFormResources = (
  initialDate: string,
  categories: ReservationCategoryOption[]
) => {
  const state = useReservationFormState(
    initialDate,
    STRING.Empty,
    categories
  );
  const resolvedDurationHours =
    state.duration.resolveDurationHours(
      state.fields.values.durationHours
    );
  const equipment = useReservationFormEquipmentViewModel(
    categories,
    state.fields,
    resolvedDurationHours
  );
  return { equipment, resolvedDurationHours, state };
};
