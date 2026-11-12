export interface ReservationCancellationState {
  charges: number;
  deposits: number;
  isAuthor: boolean;
  items: number;
  reason: string;
  status: string;
}
