export interface E2eReservationsByWorkerReservation {
  customerName: string;
  id: string;
  remove: () => Promise<void>;
}
