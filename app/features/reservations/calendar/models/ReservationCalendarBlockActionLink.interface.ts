export interface ReservationCalendarBlockActionLink {
  ariaLabel: string;
  key: string;
  resolvePath: (reservationId: string) => string;
  text: string;
}
