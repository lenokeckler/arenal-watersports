import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import ReservationDepositUnavailable from "../components/ReservationDepositUnavailable";
import { RESERVATION_DEPOSIT_UI_COPY } from "../constants/ReservationDepositUiCopy.constants";
import { RESERVATION_DEPOSIT_UNAVAILABLE_COPY as COPY } from "../constants/ReservationDepositUnavailableCopy.constants";
import { RESERVATION_DEPOSIT_UNAVAILABLE_REASON } from "../constants/ReservationDepositUnavailableReason.constants";
import { DEPOSIT_RESERVATION_ID } from "./ReservationDeposit.constants";

describe("ReservationDepositUnavailable", () => {
  it.each(
    Object.values(RESERVATION_DEPOSIT_UNAVAILABLE_REASON)
  )("explains the %s reason without a form", (reason) => {
    render(
      <ReservationDepositUnavailable
        reason={reason}
        reservationId={DEPOSIT_RESERVATION_ID}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.STATUS).textContent
    ).toBe(`${COPY.TITLE[reason]}${COPY.BODY[reason]}`);
    expect(
      screen.queryByRole(ARIA_ROLE.TEXTBOX)
    ).toBeNull();
    expect(
      screen
        .getByRole(ARIA_ROLE.LINK, {
          name: RESERVATION_DEPOSIT_UI_COPY.BACK_TO_RESERVATION,
        })
        .getAttribute("href")
    ).toBe(
      PATHS.RESERVATIONS.DETAIL(DEPOSIT_RESERVATION_ID)
    );
  });
});
