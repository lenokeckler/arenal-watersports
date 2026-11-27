import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
  RESERVATION_DEPOSIT_DECISION_KIND,
} from "@/app/constants";
import { recordReservationDepositAction } from "../actions/recordReservationDepositAction";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationDepositFeedbackCopy.constants";
import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as VALIDATION } from "../constants/ReservationDepositValidationCopy.constants";
import { UNDECIDED_DEPOSIT } from "./ReservationDeposit.constants";
import {
  RECEIVED_RECORDED,
  RECORDED_BY_NAME,
} from "./ReservationDepositAction.constants";
import {
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  RECEIVED_DEPOSIT_INPUT,
  USD_PROPOSAL_TEXT,
} from "./ReservationDepositValues.constants";
import { renderReservationDepositView } from "./renderReservationDepositView";

vi.mock(
  "../actions/recordReservationDepositAction",
  () => ({
    recordReservationDepositAction: vi.fn(),
  })
);

describe("ReservationDepositView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("opens on yes with the dollar proposal ready to send", () => {
    const page = renderReservationDepositView();

    expect(
      page.queryText(UNDECIDED_DEPOSIT.code)
    ).not.toBeNull();
    expect(page.getAmount()).toHaveProperty(
      "value",
      USD_PROPOSAL_TEXT
    );
    expect(page.getSubmit().textContent).toBe(COPY.SUBMIT);
  });

  it("puts the colones proposal in the amount when colones are chosen", async () => {
    const page = renderReservationDepositView();
    await page.clearAmount();
    await page.typeAmount(EDITED_AMOUNT_TEXT);

    await page.selectRadio(CURRENCY_NAME_COPY.CRC);

    expect(page.getAmount()).toHaveProperty(
      "value",
      CRC_PROPOSAL_TEXT
    );
  });

  it("hides currency and amount when there was no deposit", async () => {
    const page = renderReservationDepositView();

    await page.selectRadio(COPY.DECISION_DECLINED);

    expect(page.queryAmount()).toBeNull();
    expect(
      page.queryText(COPY.DECISION_DECLINED_NOTE)
    ).not.toBeNull();
    expect(page.getSubmit().textContent).toBe(
      COPY.SUBMIT_DECLINED
    );
  });

  it("records the deposit and shows who recorded it", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockResolvedValue({
      ok: true,
      recorded: RECEIVED_RECORDED,
    });
    const page = renderReservationDepositView();

    await page.submit();

    expect(await page.findStatusText()).toBe(
      COPY.SUCCESS_RECEIVED(UNDECIDED_DEPOSIT.code)
    );
    expect(
      recordReservationDepositAction
    ).toHaveBeenCalledWith(RECEIVED_DEPOSIT_INPUT);
    expect(
      page.queryText(COPY.RECORDED_BY(RECORDED_BY_NAME))
    ).not.toBeNull();
    expect(
      page.queryText(COPY.PENDING_DEPOSITS)
    ).not.toBeNull();
  });

  it("records the no deposit answer", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockResolvedValue({
      ok: true,
      recorded: {
        decision: {
          kind: RESERVATION_DEPOSIT_DECISION_KIND.DECLINED,
        },
        id: null,
        recordedByName: RECORDED_BY_NAME,
      },
    });
    const page = renderReservationDepositView();
    await page.selectRadio(COPY.DECISION_DECLINED);

    await page.submit();

    expect(await page.findStatusText()).toBe(
      COPY.SUCCESS_DECLINED(UNDECIDED_DEPOSIT.code)
    );
    expect(
      page.queryText(COPY.PENDING_DEPOSITS)
    ).toBeNull();
    expect(
      recordReservationDepositAction
    ).toHaveBeenCalledWith(
      expect.objectContaining({ hasDeposit: false })
    );
  });

  it("refuses an empty amount on screen without sending", async () => {
    const page = renderReservationDepositView();
    await page.clearAmount();

    await page.submit();

    expect(
      page.queryText(VALIDATION.AMOUNT_REQUIRED)
    ).not.toBeNull();
    expect(
      recordReservationDepositAction
    ).not.toHaveBeenCalled();
  });

  it("shows the refusal of the server in the alert", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockResolvedValue({
      ok: false,
      errors: {},
      formError: FEEDBACK.ALREADY_DECIDED,
    });
    const page = renderReservationDepositView();

    await page.submit();

    expect(await page.findAlertText()).toBe(
      FEEDBACK.ALREADY_DECIDED
    );
  });

  it("starts on no deposit when nothing is proposed", () => {
    const page = renderReservationDepositView({
      ...UNDECIDED_DEPOSIT,
      proposal: {
        [CURRENCY_CODE.CRC]: 0,
        [CURRENCY_CODE.USD]: 0,
      },
    });

    expect(page.queryAmount()).toBeNull();
    expect(page.getSubmit().textContent).toBe(
      COPY.SUBMIT_DECLINED
    );
  });
});
