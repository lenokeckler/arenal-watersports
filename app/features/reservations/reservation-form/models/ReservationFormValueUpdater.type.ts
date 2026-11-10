import type { ReservationFormInput } from "./ReservationFormInput.interface";

export type ReservationFormValueUpdater = <
  K extends keyof ReservationFormInput,
>(
  field: K,
  value: ReservationFormInput[K]
) => void;
