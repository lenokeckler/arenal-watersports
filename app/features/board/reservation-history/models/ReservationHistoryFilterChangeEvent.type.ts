import type { ChangeEvent } from "react";

export type ReservationHistoryFilterChangeEvent =
  ChangeEvent<
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
  >;
