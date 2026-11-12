import type { ReservationFormActionResult } from "./ReservationFormActionResult.type";

export interface ReservationEditErrorRule {
  message: string;
  result: ReservationFormActionResult;
}
