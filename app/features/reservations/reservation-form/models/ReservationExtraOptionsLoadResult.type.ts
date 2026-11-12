import type { ReservationExtraOption } from "./ReservationExtraOption.interface";

export type ReservationExtraOptionsLoadResult =
  | { error: unknown; ok: false }
  | { ok: true; options: ReservationExtraOption[] };
