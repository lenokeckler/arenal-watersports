import type { ReservationPostponementDraft } from "./ReservationPostponementDraft.interface";

export type ReservationPostponementScheduleFields = Pick<
  ReservationPostponementDraft,
  "cause" | "date" | "reason" | "time"
>;
