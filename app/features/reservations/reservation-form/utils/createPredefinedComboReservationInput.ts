import type { PredefinedComboReservationInput } from "../models/PredefinedComboReservationInput.interface";
import type { CreatePredefinedComboReservationInputOptions } from "../models/CreatePredefinedComboReservationInputOptions.interface";

export const createPredefinedComboReservationInput = ({
  comboId,
  durationHours,
  values,
}: CreatePredefinedComboReservationInputOptions): PredefinedComboReservationInput => ({
  comboId,
  customerName: values.customerName,
  date: values.date,
  durationHours,
  guideIds: values.guideIds,
  peopleCount: values.peopleCount,
  time: values.time,
});
