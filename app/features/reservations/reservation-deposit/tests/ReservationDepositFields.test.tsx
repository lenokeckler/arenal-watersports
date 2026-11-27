import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  ARIA_ROLE,
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import ReservationDepositAmountField from "../components/ReservationDepositAmountField";
import ReservationDepositCurrencyField from "../components/ReservationDepositCurrencyField";
import ReservationDepositDecisionField from "../components/ReservationDepositDecisionField";
import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as VALIDATION } from "../constants/ReservationDepositValidationCopy.constants";
import {
  BOTH_PROPOSAL,
  CRC_ONLY_PROPOSAL,
} from "./ReservationDeposit.constants";
import { EDITED_AMOUNT_TEXT } from "./ReservationDepositValues.constants";

const { CRC, USD } = CURRENCY_CODE;

const getRadio = (name: string) =>
  screen.getByRole(ARIA_ROLE.RADIO, {
    name: new RegExp(name),
  });

const keepText = (text: string): string => text;

const getExactText = (text: string) =>
  screen.getByText(text, { normalizer: keepText });

describe("ReservationDepositDecisionField", () => {
  it("offers yes and no with the current answer checked", () => {
    render(
      <ReservationDepositDecisionField
        hasDeposit
        isPending={false}
        onSelect={vi.fn()}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: COPY.DECISION_LEGEND,
      })
    ).toBeDefined();
    expect(
      getRadio(COPY.DECISION_RECEIVED).matches(":checked")
    ).toBe(true);
    expect(
      getRadio(COPY.DECISION_DECLINED).matches(":checked")
    ).toBe(false);
  });

  it("reports the chosen answer", async () => {
    const onSelect = vi.fn();
    render(
      <ReservationDepositDecisionField
        hasDeposit
        isPending={false}
        onSelect={onSelect}
      />
    );

    await userEvent.click(getRadio(COPY.DECISION_DECLINED));

    expect(onSelect).toHaveBeenCalledWith(false);
  });

  it("locks both answers while sending", () => {
    render(
      <ReservationDepositDecisionField
        hasDeposit={false}
        isPending
        onSelect={vi.fn()}
      />
    );

    expect(
      screen
        .getAllByRole(ARIA_ROLE.RADIO)
        .every((radio) => radio.matches(":disabled"))
    ).toBe(true);
  });
});

describe("ReservationDepositCurrencyField", () => {
  it("shows each currency with its proposal", () => {
    render(
      <ReservationDepositCurrencyField
        currency={USD}
        isPending={false}
        onSelect={vi.fn()}
        proposal={BOTH_PROPOSAL}
      />
    );

    expect(
      getExactText(
        COPY.CURRENCY_OPTION_DESCRIPTION(
          formatMoney({ amount: 200, currency: USD })
        )
      )
    ).toBeDefined();
    expect(
      getExactText(
        COPY.CURRENCY_OPTION_DESCRIPTION(
          formatMoney({ amount: 100000, currency: CRC })
        )
      )
    ).toBeDefined();
  });

  it("says when a currency has no proposal instead of a zero", () => {
    render(
      <ReservationDepositCurrencyField
        currency={CRC}
        isPending={false}
        onSelect={vi.fn()}
        proposal={CRC_ONLY_PROPOSAL}
      />
    );

    expect(
      screen.getByText(COPY.CURRENCY_OPTION_NO_PROPOSAL)
    ).toBeDefined();
  });

  it("reports the chosen currency", async () => {
    const onSelect = vi.fn();
    render(
      <ReservationDepositCurrencyField
        currency={USD}
        isPending={false}
        onSelect={onSelect}
        proposal={BOTH_PROPOSAL}
      />
    );

    await userEvent.click(
      getRadio(CURRENCY_NAME_COPY[CRC])
    );

    expect(onSelect).toHaveBeenCalledWith(CRC);
  });
});

describe("ReservationDepositAmountField", () => {
  it("labels the amount by currency and names the proposal", () => {
    render(
      <ReservationDepositAmountField
        amountText="200"
        currency={USD}
        isPending={false}
        onChange={vi.fn()}
        proposal={BOTH_PROPOSAL}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.TEXTBOX, {
        name: new RegExp(COPY.AMOUNT_LABEL[USD]),
      })
    ).toBeDefined();
    expect(
      getExactText(
        COPY.PROPOSAL_HELPER(
          formatMoney({ amount: 200, currency: USD })
        )
      )
    ).toBeDefined();
  });

  it("asks for the amount when the currency has no proposal", () => {
    render(
      <ReservationDepositAmountField
        amountText=""
        currency={USD}
        isPending={false}
        onChange={vi.fn()}
        proposal={CRC_ONLY_PROPOSAL}
      />
    );

    expect(
      screen.getByText(COPY.NO_PROPOSAL_HELPER)
    ).toBeDefined();
  });

  it("reports typing and shows its error", async () => {
    const onChange = vi.fn();
    render(
      <ReservationDepositAmountField
        amountText=""
        currency={CRC}
        error={VALIDATION.AMOUNT_REQUIRED}
        isPending={false}
        onChange={onChange}
        proposal={BOTH_PROPOSAL}
      />
    );

    await userEvent.type(
      screen.getByRole(ARIA_ROLE.TEXTBOX),
      EDITED_AMOUNT_TEXT.slice(0, 1)
    );

    expect(onChange).toHaveBeenCalledWith(
      EDITED_AMOUNT_TEXT.slice(0, 1)
    );
    expect(
      screen.getByText(VALIDATION.AMOUNT_REQUIRED)
    ).toBeDefined();
  });
});
