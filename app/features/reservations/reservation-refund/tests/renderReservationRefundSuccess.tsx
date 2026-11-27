import { render, screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import ReservationRefundSuccess from "../components/ReservationRefundSuccess";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import { EXPECTED_SCHEDULED } from "./ReservationRefund.constants";

const HREF_ATTRIBUTE = "href";

export const renderReservationRefundSuccess = () => {
  render(
    <ReservationRefundSuccess
      code={EXPECTED_SCHEDULED.code}
      recorded={REFUND_RECORDED}
      reservationId={EXPECTED_SCHEDULED.id}
    />
  );

  return {
    getDefinitionValue: (label: string) =>
      screen.getByText(label).nextElementSibling
        ?.textContent,
    getLinkHref: (name: string) =>
      screen
        .getByRole(ARIA_ROLE.LINK, { name })
        .getAttribute(HREF_ATTRIBUTE),
    getStatus: () => screen.getByRole(ARIA_ROLE.STATUS),
    queryText: (text: string) => screen.queryByText(text),
  };
};
