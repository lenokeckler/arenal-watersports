import { render } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import ReservationChargeSuccess from "../components/ReservationChargeSuccess";
import { CHARGE_RECORDED } from "./ReservationChargeAction.constants";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { createReservationChargePage } from "./ReservationCharge.page";
import { screen } from "@testing-library/react";

export const renderReservationChargeSuccess = () => {
  render(
    <ReservationChargeSuccess
      code={EXPECTED_SCHEDULED.code}
      recorded={CHARGE_RECORDED}
      reservationId={EXPECTED_SCHEDULED.id}
    />
  );
  return {
    ...createReservationChargePage(),
    getStatus: () => screen.getByRole(ARIA_ROLE.STATUS),
  };
};
