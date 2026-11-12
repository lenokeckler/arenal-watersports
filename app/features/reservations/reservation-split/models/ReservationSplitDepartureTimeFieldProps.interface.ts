import type { ReservationSplitDepartureCardProps } from "./ReservationSplitDepartureCardProps.interface";

export interface ReservationSplitDepartureTimeFieldProps extends Pick<
  ReservationSplitDepartureCardProps,
  "draft" | "viewModel"
> {
  error?: string;
}
