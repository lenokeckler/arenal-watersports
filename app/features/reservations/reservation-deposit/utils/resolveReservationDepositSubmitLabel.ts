import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";

export const resolveReservationDepositSubmitLabel = (
  hasDeposit: boolean,
  isPending: boolean
): string => {
  if (hasDeposit) {
    return isPending ? COPY.SUBMITTING : COPY.SUBMIT;
  }
  return isPending
    ? COPY.SUBMITTING_DECLINED
    : COPY.SUBMIT_DECLINED;
};
