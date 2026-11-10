import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RESERVATION_DETAIL_COPY as copy } from "../constants/ReservationDetailCopy.constants";
import ReservationDetailError from "../ReservationDetailError";
import ReservationDetailLoading from "../ReservationDetailLoading";
import ReservationDetailNotFound from "../ReservationDetailNotFound";
import { createReservationDetailPage } from "./ReservationDetail.page";

afterEach(cleanup);

describe("reservation detail route states", (): void => {
  it("announces while reservation detail is loading", (): void => {
    render(<ReservationDetailLoading />);

    expect(
      createReservationDetailPage().getText(copy.LOADING)
    ).toBeVisible();
  });

  it("explains when the reservation does not exist", (): void => {
    render(<ReservationDetailNotFound />);

    expect(
      createReservationDetailPage().getHeading(
        copy.MISSING_RESERVATION
      )
    ).toBeVisible();
  });

  it("lets the worker retry after a load failure", async (): Promise<void> => {
    const user = userEvent.setup();
    const reset = vi.fn();
    render(
      <ReservationDetailError
        error={new Error(copy.UNKNOWN_ERROR)}
        reset={reset}
      />
    );
    const page = createReservationDetailPage();

    expect(page.getTexts(copy.UNKNOWN_ERROR)).toHaveLength(
      1
    );
    await page.clickRetry(user);
    expect(reset).toHaveBeenCalledOnce();
  });
});
