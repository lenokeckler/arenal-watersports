import { STRING } from "@/app/constants";
import { RESERVATION_EQUIPMENT_LOCK } from "../constants/ReservationEquipmentLock.constants";
import type { ReservationEditHandlersOptions } from "../models/ReservationEditHandlersOptions.interface";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";

export const createReservationEditHandlers = ({
  equipment,
  form,
  reservation,
}: ReservationEditHandlersOptions) => {
  const { duration, durationHours, fields, submission } =
    form;
  const releaseUnavailableUnit = (): void => {
    if (
      reservation.equipmentLock ===
      RESERVATION_EQUIPMENT_LOCK.NONE
    ) {
      fields.handleUnitChange(STRING.Empty);
      equipment.retryUnitAvailability();
    }
  };
  const handleSubmit: ReservationFormViewModel["handleSubmit"] =
    (event) => {
      event.preventDefault();
      submission.submitReservation(
        {
          ...fields.values,
          durationHours,
          unitId: equipment.retainedUnitId,
        },
        releaseUnavailableUnit
      );
    };

  return {
    handleCustomDurationChange:
      duration.updateCustomDurationDraft,
    handleCustomDurationSelection:
      duration.selectCustomDuration,
    handleDurationChange: duration.selectPreset,
    handleSubmit,
  };
};
