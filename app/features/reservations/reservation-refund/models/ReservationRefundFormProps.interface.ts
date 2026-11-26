import type { ReservationRefund } from "./ReservationRefund.interface";
import type { ReservationRefundViewModel } from "./ReservationRefundViewModel.interface";

export interface ReservationRefundFormProps {
  refund: ReservationRefund;
  viewModel: ReservationRefundViewModel;
}
