import { UUID_PATTERN } from "@/app/constants";
import type { ReservationEditInput } from "../models/ReservationEditInput.interface";
import { isReservationFormInput } from "./isReservationFormInput";

export const isReservationEditInput = (
  input: unknown
): input is ReservationEditInput =>
  isReservationFormInput(input) &&
  "expectedUpdatedAt" in input &&
  typeof input.expectedUpdatedAt === "string" &&
  "reservationId" in input &&
  typeof input.reservationId === "string" &&
  UUID_PATTERN.test(input.reservationId);
