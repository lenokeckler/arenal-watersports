import { render } from "@testing-library/react";
import ReservationChargeSuccess from "../components/ReservationChargeSuccess";
import { CHARGE_RECORDED } from "./ReservationChargeAction.constants";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { createReservationChargePage } from "./ReservationCharge.page";

export const renderReservationChargeSuccess = () => {
  render(
    <ReservationChargeSuccess
      code={EXPECTED_SCHEDULED.code}
      recorded={CHARGE_RECORDED}
      reservationId={EXPECTED_SCHEDULED.id}
    />
  );
  return createReservationChargePage();
};
