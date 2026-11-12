export interface ReservationCancellationInput {
  expectedUpdatedAt: string;
  reason: string;
  reservationId: string;
}
