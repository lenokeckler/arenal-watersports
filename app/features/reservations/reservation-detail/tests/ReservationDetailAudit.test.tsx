import { describe, expect, it } from "vitest";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";
import { RESERVATION_DETAIL_VIEW_TEST } from "./ReservationDetail.constants";
import { renderReservationDetail } from "./ReservationDetailTestRenderer";

describe("reservation detail audit", (): void => {
  it("identifies the creator and last modifier", (): void => {
    const page = renderReservationDetail();

    expect(
      page.getText(RESERVATION_DETAIL_VIEW_TEST.CREATED_BY)
    ).toBeVisible();
    expect(
      page.getText(RESERVATION_DETAIL_VIEW_TEST.UPDATED_BY)
    ).toBeVisible();
    expect(
      page.getText(
        RESERVATION_DETAIL_TEST.CREATED_WORKER_NAME
      )
    ).toBeVisible();
    expect(
      page.getText(
        RESERVATION_DETAIL_TEST.UPDATED_WORKER_NAME
      )
    ).toBeVisible();
  });
});
