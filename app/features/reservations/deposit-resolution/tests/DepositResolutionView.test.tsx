import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import DepositResolutionView from "../DepositResolutionView";
import { resolveDepositAction } from "../actions/resolveDepositAction";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY as FEEDBACK } from "../constants/DepositResolutionFeedbackCopy.constants";
import { DEPOSIT_RESOLUTION_FORM_COPY as COPY } from "../constants/DepositResolutionFormCopy.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as VALIDATION } from "../constants/DepositResolutionValidationCopy.constants";
import {
  CLOSED_DEPOSIT,
  DAMAGE_REASON,
  RESOLVED_BY_NAME,
} from "./DepositResolution.constants";
import {
  PARTIAL_INPUT,
  PARTIAL_RECORDED,
} from "./DepositResolutionAction.constants";

vi.mock("../actions/resolveDepositAction", () => ({
  resolveDepositAction: vi.fn(),
}));

const keepText = (text: string): string => text;

const renderView = () => {
  const user = userEvent.setup();
  render(
    <DepositResolutionView deposit={CLOSED_DEPOSIT} />
  );
  return {
    choosePart: () =>
      user.click(
        screen.getByRole(ARIA_ROLE.RADIO, {
          name: new RegExp(COPY.CHOICE_PART),
        })
      ),
    submit: () =>
      user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: COPY.SUBMIT,
        })
      ),
    typeReason: (text: string) =>
      user.type(
        screen.getByRole(ARIA_ROLE.TEXTBOX, {
          name: new RegExp(COPY.REASON_LABEL),
        }),
        text
      ),
    typeReturned: (text: string) =>
      user.type(
        screen.getByRole(ARIA_ROLE.TEXTBOX, {
          name: new RegExp(COPY.RETURNED_LABEL),
        }),
        text
      ),
  };
};

describe("DepositResolutionView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("opens on returning everything without amount nor reason", () => {
    renderView();

    expect(
      screen.getByText(CLOSED_DEPOSIT.code)
    ).toBeDefined();
    expect(
      screen.queryByRole(ARIA_ROLE.TEXTBOX)
    ).toBeNull();
  });

  it("shows what the company keeps while typing the amount", async () => {
    const page = renderView();
    await page.choosePart();

    await page.typeReturned("150");

    expect(
      screen.getByText(
        formatMoney({
          amount: 50,
          currency: CLOSED_DEPOSIT.currency,
        }),
        { normalizer: keepText }
      )
    ).toBeDefined();
  });

  it("asks for the damage reason before sending", async () => {
    const page = renderView();
    await page.choosePart();
    await page.typeReturned("100");

    await page.submit();

    expect(
      screen.getByText(VALIDATION.REASON_REQUIRED)
    ).toBeDefined();
    expect(resolveDepositAction).not.toHaveBeenCalled();
  });

  it("resolves with the reason and shows the receipt", async () => {
    vi.mocked(resolveDepositAction).mockResolvedValue({
      ok: true,
      recorded: PARTIAL_RECORDED,
    });
    const page = renderView();
    await page.choosePart();
    await page.typeReturned("100");
    await page.typeReason(DAMAGE_REASON);

    await page.submit();

    expect(
      (await screen.findByRole(ARIA_ROLE.STATUS))
        .textContent
    ).toBe(COPY.SUCCESS(CLOSED_DEPOSIT.code));
    expect(resolveDepositAction).toHaveBeenCalledWith(
      PARTIAL_INPUT
    );
    expect(screen.getByText(DAMAGE_REASON)).toBeDefined();
    expect(
      screen.getByText(COPY.RESOLVED_BY(RESOLVED_BY_NAME))
    ).toBeDefined();
  });

  it("shows a refusal of the server in the alert", async () => {
    vi.mocked(resolveDepositAction).mockResolvedValue({
      ok: false,
      errors: {},
      formError: FEEDBACK.ALREADY_RESOLVED,
    });
    const page = renderView();

    await page.submit();

    expect(
      (await screen.findByRole(ARIA_ROLE.ALERT)).textContent
    ).toBe(FEEDBACK.ALREADY_RESOLVED);
  });
});
