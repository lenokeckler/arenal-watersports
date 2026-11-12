export interface ReservationDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
