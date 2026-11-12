import type { NullableRef } from "@/app/types";
import type { ReservationPostponementCause } from "./ReservationPostponementCause.type";
import type { ReservationPostponementReadingDraft } from "./ReservationPostponementReadingDraft.interface";

export interface ReservationPostponementDraft {
  cause: NullableRef<ReservationPostponementCause>;
  date: string;
  readings: Record<
    string,
    ReservationPostponementReadingDraft
  >;
  reason: string;
  time: string;
}
