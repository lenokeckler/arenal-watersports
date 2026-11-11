export interface ReservationUnitAvailabilityInput {
  categoryId: string;
  date: string;
  durationMinutes: number;
  excludeReservationId?: string;
  time: string;
}
