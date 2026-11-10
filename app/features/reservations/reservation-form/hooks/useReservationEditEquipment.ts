import { RESERVATION_EQUIPMENT_LOCK } from "../constants/ReservationEquipmentLock.constants";
import type { ReservationEditEquipmentOptions } from "../models/ReservationEditEquipmentOptions.interface";
import { mergeReservationEditCategories } from "../utils/mergeReservationEditCategories";
import { resolveReservationEditUnits } from "../utils/resolveReservationEditUnits";
import { useReservationEquipmentEligibility } from "./useReservationEquipmentEligibility";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";

export const useReservationEditEquipment = ({
  categories,
  durationHours,
  reservation,
  values,
}: ReservationEditEquipmentOptions) => {
  const eligibility =
    useReservationEquipmentEligibility(categories);
  const editCategories = mergeReservationEditCategories(
    eligibility.categories,
    reservation.equipment
  );
  const isEquipmentEditable =
    reservation.equipmentLock ===
    RESERVATION_EQUIPMENT_LOCK.NONE;
  const availability = useReservationEquipmentViewModel(
    isEquipmentEditable ? editCategories : [],
    { ...values, excludeReservationId: reservation.id },
    durationHours,
    eligibility.refreshKey
  );
  const units = resolveReservationEditUnits({
    availableUnits: availability.availableUnits,
    durationHours,
    isLookupSettled: availability.isAvailabilityResolved,
    reservation,
    values,
  });

  return {
    ...availability,
    availableUnits: units.offeredUnits,
    categories: editCategories,
    handleRetryEquipmentEligibility: eligibility.retry,
    hasEquipmentEligibilityError: eligibility.hasError,
    isCurrentUnitKept: units.isCurrentUnitKept,
    isEquipmentEligibilityLoading: eligibility.isLoading,
    retainedUnitId: units.retainedUnitId,
  };
};
