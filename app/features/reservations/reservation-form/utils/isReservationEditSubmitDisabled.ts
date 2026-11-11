import { STRING } from "@/app/constants";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import type { ReservationEditEquipmentState } from "../models/ReservationEditEquipmentState.type";
import type { ReservationEditFormState } from "../models/ReservationEditFormState.type";

export const isReservationEditSubmitDisabled = (
  equipment: ReservationEditEquipmentState,
  {
    isPending,
    isSubmitted,
    formError,
  }: ReservationEditFormState["submission"]
): boolean => {
  const isAvailabilityMissing =
    !equipment.isCurrentUnitKept &&
    (equipment.isAvailabilityLoading ||
      equipment.hasAvailabilityError);

  return (
    isPending ||
    isSubmitted ||
    formError === RESERVATION_EDIT_COPY.STALE ||
    (equipment.requiresConcreteUnit &&
      (isAvailabilityMissing ||
        equipment.retainedUnitId === STRING.Empty))
  );
};
