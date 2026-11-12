"use client";

import { useRouter } from "next/navigation";
import type { ReservationEditViewModelOptions } from "../models/ReservationEditViewModelOptions.interface";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import { createReservationEditHandlers } from "../utils/createReservationEditHandlers";
import { isReservationEditSubmitDisabled } from "../utils/isReservationEditSubmitDisabled";
import { useReservationEditEquipment } from "./useReservationEditEquipment";
import { useReservationEditForm } from "./useReservationEditForm";
import { useReservationEditSelection } from "./useReservationEditSelection";

export const useReservationEditViewModel = ({
  categories,
  reservation,
}: ReservationEditViewModelOptions): ReservationFormViewModel => {
  const router = useRouter();
  const form = useReservationEditForm(reservation);
  const equipment = useReservationEditEquipment({
    categories,
    durationHours: form.durationHours,
    reservation,
    values: form.fields.values,
  });
  const selection = useReservationEditSelection(
    form,
    equipment
  );

  return {
    ...form.fields,
    ...form.duration,
    ...form.submission,
    ...equipment,
    ...selection,
    ...createReservationEditHandlers({
      equipment,
      form,
      reservation,
    }),
    handleBack: router.back,
    hasEquipmentSelectionChanged: selection.hasChanged,
    isSubmitDisabled: isReservationEditSubmitDisabled(
      equipment,
      form.submission
    ),
    values: {
      ...form.fields.values,
      unitId: equipment.retainedUnitId,
    },
  };
};
