import { render } from "@testing-library/react";
import type { ReservationRefund } from "../models/ReservationRefund.interface";
import ReservationRefundView from "../ReservationRefundView";
import { BOTH_REFUND } from "./ReservationRefundForm.constants";
import { createReservationRefundViewPage } from "./ReservationRefundView.page";

export const renderReservationRefundView = (
  refund: ReservationRefund = BOTH_REFUND
) => {
  const { rerender } = render(
    <ReservationRefundView refund={refund} />
  );

  return {
    ...createReservationRefundViewPage(),
    rerender: (next: ReservationRefund) =>
      rerender(<ReservationRefundView refund={next} />),
  };
};
