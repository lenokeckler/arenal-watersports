import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import DepositResolutionChoiceField from "../components/DepositResolutionChoiceField";
import DepositResolutionReasonField from "../components/DepositResolutionReasonField";
import DepositResolutionReturnedField from "../components/DepositResolutionReturnedField";
import { DEPOSIT_RESOLUTION_FORM_COPY as COPY } from "../constants/DepositResolutionFormCopy.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as VALIDATION } from "../constants/DepositResolutionValidationCopy.constants";
import { CLOSED_DEPOSIT } from "./DepositResolution.constants";

const keepText = (text: string): string => text;

const getRadio = (name: string) =>
  screen.getByRole(ARIA_ROLE.RADIO, {
    name: new RegExp(name),
  });

describe("DepositResolutionChoiceField", () => {
  it("offers returning everything or an amount, with the deposit", () => {
    render(
      <DepositResolutionChoiceField
        deposit={CLOSED_DEPOSIT}
        isPending={false}
        onSelect={vi.fn()}
        returnsAll
      />
    );

    expect(
      getRadio(COPY.CHOICE_ALL).matches(":checked")
    ).toBe(true);
    expect(
      screen.getByText(
        COPY.CHOICE_ALL_DESCRIPTION(
          formatMoney(CLOSED_DEPOSIT)
        ),
        { normalizer: keepText }
      )
    ).toBeDefined();
  });

  it("reports the chosen option and locks while sending", async () => {
    const onSelect = vi.fn();
    const { rerender } = render(
      <DepositResolutionChoiceField
        deposit={CLOSED_DEPOSIT}
        isPending={false}
        onSelect={onSelect}
        returnsAll
      />
    );

    await userEvent.click(getRadio(COPY.CHOICE_PART));
    expect(onSelect).toHaveBeenCalledWith(false);

    rerender(
      <DepositResolutionChoiceField
        deposit={CLOSED_DEPOSIT}
        isPending
        onSelect={onSelect}
        returnsAll
      />
    );
    expect(
      screen
        .getAllByRole(ARIA_ROLE.RADIO)
        .every((radio) => radio.matches(":disabled"))
    ).toBe(true);
  });
});

describe("DepositResolutionReturnedField", () => {
  it("shows what the company keeps in the deposit currency", () => {
    render(
      <DepositResolutionReturnedField
        deposit={CLOSED_DEPOSIT}
        isPending={false}
        keptAmount={80}
        onChange={vi.fn()}
        text="120"
      />
    );

    expect(screen.getByText(COPY.KEPT_LABEL)).toBeDefined();
    expect(
      screen.getByText(
        formatMoney({
          amount: 80,
          currency: CLOSED_DEPOSIT.currency,
        }),
        { normalizer: keepText }
      )
    ).toBeDefined();
  });

  it("hides the kept amount while the amount is invalid and shows the error", () => {
    render(
      <DepositResolutionReturnedField
        deposit={CLOSED_DEPOSIT}
        error={VALIDATION.RETURNED_REQUIRED}
        isPending={false}
        keptAmount={null}
        onChange={vi.fn()}
        text={STRING.Empty}
      />
    );

    expect(screen.queryByText(COPY.KEPT_LABEL)).toBeNull();
    expect(
      screen.getByText(VALIDATION.RETURNED_REQUIRED)
    ).toBeDefined();
  });

  it("reports typing", async () => {
    const onChange = vi.fn();
    render(
      <DepositResolutionReturnedField
        deposit={CLOSED_DEPOSIT}
        isPending={false}
        keptAmount={null}
        onChange={onChange}
        text={STRING.Empty}
      />
    );

    await userEvent.type(
      screen.getByRole(ARIA_ROLE.TEXTBOX),
      "5"
    );

    expect(onChange).toHaveBeenCalledWith("5");
  });
});

describe("DepositResolutionReasonField", () => {
  it("labels the reason and shows its error", () => {
    render(
      <DepositResolutionReasonField
        error={VALIDATION.REASON_REQUIRED}
        isPending={false}
        onChange={vi.fn()}
        text={STRING.Empty}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.TEXTBOX, {
        name: new RegExp(COPY.REASON_LABEL),
      })
    ).toBeDefined();
    expect(
      screen.getByText(VALIDATION.REASON_REQUIRED)
    ).toBeDefined();
  });
});
