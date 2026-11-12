import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import type { CreateCustomComboReservationInputOptions } from "../models/CreateCustomComboReservationInputOptions.interface";

export const createCustomComboReservationInput = (
  options: CreateCustomComboReservationInputOptions
): CustomComboReservationInput => ({
  agreedAmountCrc: options.draft.agreedAmountCrc,
  agreedAmountUsd: options.draft.agreedAmountUsd,
  customerName: options.values.customerName,
  date: options.values.date,
  durationHours: options.durationHours,
  guideIds: options.hasGuideOnlyItem
    ? (options.values.guideIds ?? [])
    : [],
  items: options.draft.items,
  peopleCount: options.values.peopleCount,
  time: options.values.time,
});
