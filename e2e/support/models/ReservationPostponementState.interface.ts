export interface ReservationPostponementState {
  cause: string;
  charges: number;
  deposits: number;
  isAuthor: boolean;
  openDispatches: number;
  readings: number;
  reason: string;
  startsAt: string;
  status: string;
  wasDispatched: boolean;
}
