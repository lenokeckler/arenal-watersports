import { RESERVATION_EXTRA } from "../constants/ReservationExtra.constants";

export const shouldToggleReservationExtraCard = (
  target: EventTarget
): boolean =>
  target instanceof Element &&
  !target.closest(RESERVATION_EXTRA.CARD_CONTROL_SELECTOR);
