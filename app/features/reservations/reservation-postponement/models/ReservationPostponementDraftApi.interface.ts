import type { ReservationPostponementCause } from "./ReservationPostponementCause.type";
import type { ReservationPostponementDraft } from "./ReservationPostponementDraft.interface";
import type { ReservationPostponementReadingDraft } from "./ReservationPostponementReadingDraft.interface";

export interface ReservationPostponementDraftApi {
  draft: ReservationPostponementDraft;
  setCause: (cause: ReservationPostponementCause) => void;
  setDate: (date: string) => void;
  setReading: (
    itemId: string,
    field: keyof ReservationPostponementReadingDraft,
    value: string
  ) => void;
  setReason: (reason: string) => void;
  setTime: (time: string) => void;
}
