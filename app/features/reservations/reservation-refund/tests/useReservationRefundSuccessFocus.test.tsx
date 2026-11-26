import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RESERVATION_REFUND_FIELD_ID } from "../constants/ReservationRefundUi.constants";
import { useReservationRefundSuccessFocus } from "../hooks/useReservationRefundSuccessFocus";

describe("useReservationRefundSuccessFocus", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("focuses the success status on mount", () => {
    const status = document.createElement("p");
    status.id = RESERVATION_REFUND_FIELD_ID.SUCCESS;
    status.tabIndex = -1;
    document.body.append(status);

    renderHook(() => useReservationRefundSuccessFocus());

    expect(document.activeElement).toBe(status);
  });
});
