export interface ReservationCalendarRefreshSequenceController {
  invalidate: () => void;
  isCurrent: (sequence: number) => boolean;
  next: () => number;
}
