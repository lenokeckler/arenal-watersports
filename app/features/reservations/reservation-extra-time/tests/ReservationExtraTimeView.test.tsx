import { render, within } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_CODE,
  PAYMENT_CHOICE,
  PAYMENT_CHOICE_COPY,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { recordReservationExtraTimeAction } from "../actions/recordReservationExtraTimeAction";
import { RESERVATION_EXTRA_TIME_FORM_COPY as FORM } from "../constants/ReservationExtraTimeFormCopy.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_SOURCE as SOURCE } from "../constants/ReservationExtraTimeSource.constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as COPY } from "../constants/ReservationExtraTimeUiCopy.constants";
import ReservationExtraTimeView from "../ReservationExtraTimeView";
import {
  EXTRA_TIME_AMOUNT,
  EXTRA_TIME_AMOUNT_TEXT,
  EXTRA_TIME_RECORDED_BY,
} from "./ReservationExtraTime.constants";
import { EXTRA_TIME_CHARGED_RECORDED } from "./ReservationExtraTimeData.constants";
import {
  EXTRA_TIME_SCREEN,
  EXTRA_TIME_SCREEN_TEXT,
} from "./ReservationExtraTimeScreen.constants";
import { createReservationExtraTimeViewPage } from "./ReservationExtraTimeView.page";

vi.mock(
  "../actions/recordReservationExtraTimeAction",
  () => ({
    recordReservationExtraTimeAction: vi.fn(),
  })
);

const EXTRA_TIME_MONEY = {
  amount: EXTRA_TIME_AMOUNT,
  currency: CURRENCY_CODE.USD,
};

const renderView = () => {
  render(
    <ReservationExtraTimeView
      extraTime={EXTRA_TIME_SCREEN}
    />
  );
  return createReservationExtraTimeViewPage();
};

describe("ReservationExtraTimeView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("names the screen and the reservation", () => {
    const page = renderView();

    expect(page.getHeading()).toHaveTextContent(COPY.TITLE);
    expect(
      page.getText(
        COPY.RESERVATION(
          EXTRA_TIME_SCREEN.code,
          EXTRA_TIME_SCREEN.customerName
        )
      )
    ).toBeInTheDocument();
  });

  it("lists every group with its times, source and minutes, and the total", () => {
    const page = renderView();
    const [overdue, extended] = page.getGroupItems();

    expect(overdue).toHaveTextContent(
      EXTRA_TIME_SCREEN.groups[0].categoryName
    );
    expect(overdue).toHaveTextContent(
      COPY.SOURCE[SOURCE.OVERDUE]
    );
    expect(overdue).toHaveTextContent(
      EXTRA_TIME_SCREEN_TEXT.PLANNED_RETURN
    );
    expect(overdue).toHaveTextContent(
      EXTRA_TIME_SCREEN_TEXT.ARRIVED_OVERDUE
    );
    expect(overdue).toHaveTextContent(
      COPY.EXTRA_MINUTES("35 min")
    );
    expect(extended).toHaveTextContent(
      COPY.EXTENDED_BY("30 min")
    );
    expect(
      within(page.getGroupsRegion()).getByText(
        EXTRA_TIME_SCREEN_TEXT.TOTAL
      )
    ).toBeInTheDocument();
  });

  it("shows the recorded charge and who recorded it", async () => {
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockResolvedValue({
      ok: true,
      recorded: EXTRA_TIME_CHARGED_RECORDED,
    });
    const page = renderView();
    await page.choose(FORM.OUTCOME_LABEL[OUTCOME.CHARGED]);
    await page.typeAmount(EXTRA_TIME_AMOUNT_TEXT);
    await page.choose(
      PAYMENT_CHOICE_COPY[PAYMENT_CHOICE.CASH]
    );

    await page.submit();

    await expect(page.findStatusText()).resolves.toBe(
      FORM.SUCCESS[OUTCOME.CHARGED](EXTRA_TIME_SCREEN.code)
    );
    expect(page.getDetailValue(FORM.LABEL_AMOUNT)).toBe(
      formatMoney(
        EXTRA_TIME_CHARGED_RECORDED.charge ??
          EXTRA_TIME_MONEY
      )
    );
    expect(
      page.getText(FORM.RECORDED_BY(EXTRA_TIME_RECORDED_BY))
    ).toBeInTheDocument();
    expect(page.queryAmount()).toBeNull();
  });

  it("shows a courtesy without an amount", async () => {
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockResolvedValue({
      ok: true,
      recorded: {
        ...EXTRA_TIME_CHARGED_RECORDED,
        charge: null,
        outcome: OUTCOME.COURTESY,
      },
    });
    const page = renderView();
    await page.choose(FORM.OUTCOME_LABEL[OUTCOME.COURTESY]);

    await page.submit();

    await expect(page.findStatusText()).resolves.toBe(
      FORM.SUCCESS[OUTCOME.COURTESY](EXTRA_TIME_SCREEN.code)
    );
    expect(page.queryText(FORM.LABEL_AMOUNT)).toBeNull();
    expect(
      page.getText(FORM.OUTCOME_LABEL[OUTCOME.COURTESY])
    ).toBeInTheDocument();
  });
});
