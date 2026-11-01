import type { ReservationHistoryResetProps } from "./ReservationHistoryResetProps.interface";

export interface ReservationHistoryErrorProps extends ReservationHistoryResetProps {
  backHref?: string;
  title: string;
}
