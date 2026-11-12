import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";

const CENTS = 100;

export const calculateExpectedChargeProposal = (
  tariffAmount: number
): number =>
  Math.round(
    ((tariffAmount * Number(values.DURATION_MINUTES)) /
      values.MINUTES_PER_HOUR) *
      CENTS
  ) / CENTS;
