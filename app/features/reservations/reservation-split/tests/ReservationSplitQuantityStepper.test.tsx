import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ReservationSplitQuantityStepper from "../components/ReservationSplitQuantityStepper";
import {
  ARIA_DISABLED_ATTRIBUTE,
  ARIA_TRUE,
  STEPPER_ERROR,
  STEPPER_PROPS,
  STEPPER_VALUE,
} from "./ReservationSplitQuantityStepper.constants";
import { createReservationSplitQuantityStepperPage } from "./ReservationSplitQuantityStepper.page";

describe("ReservationSplitQuantityStepper", () => {
  it("announces the value to screen readers", () => {
    render(
      <ReservationSplitQuantityStepper {...STEPPER_PROPS} />
    );
    const page =
      createReservationSplitQuantityStepperPage();

    expect(
      page.getValueText(STEPPER_VALUE)
    ).toBeInTheDocument();
  });

  it("calls the handlers on a single tap each", async () => {
    const onDecrease = vi.fn();
    const onIncrease = vi.fn();
    render(
      <ReservationSplitQuantityStepper
        {...STEPPER_PROPS}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
      />
    );
    const page =
      createReservationSplitQuantityStepperPage();

    await page.decrease();
    await page.increase();

    expect(onDecrease).toHaveBeenCalledTimes(1);
    expect(onIncrease).toHaveBeenCalledTimes(1);
  });

  it("ignores a tap at the limit but keeps the button focusable", async () => {
    const onIncrease = vi.fn();
    render(
      <ReservationSplitQuantityStepper
        {...STEPPER_PROPS}
        canIncrease={false}
        onIncrease={onIncrease}
      />
    );
    const page =
      createReservationSplitQuantityStepperPage();

    await page.increase();

    expect(onIncrease).not.toHaveBeenCalled();
    expect(page.getIncreaseButton()).not.toBeDisabled();
    expect(page.getIncreaseButton()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      ARIA_TRUE
    );
    expect(page.queryAtMaxNote()).toBeInTheDocument();
  });

  it("links the error to the group", () => {
    render(
      <ReservationSplitQuantityStepper
        {...STEPPER_PROPS}
        error={STEPPER_ERROR}
      />
    );
    const page =
      createReservationSplitQuantityStepperPage();

    expect(page.getGroup()).toHaveAccessibleDescription(
      STEPPER_ERROR
    );
    expect(page.getErrorText()).toBeVisible();
  });

  it("freezes both buttons without showing the limit note", async () => {
    const onIncrease = vi.fn();
    render(
      <ReservationSplitQuantityStepper
        {...STEPPER_PROPS}
        isFrozen
        onIncrease={onIncrease}
      />
    );
    const page =
      createReservationSplitQuantityStepperPage();

    await page.increase();

    expect(onIncrease).not.toHaveBeenCalled();
    expect(page.getDecreaseButton()).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      ARIA_TRUE
    );
    expect(page.queryAtMaxNote()).not.toBeInTheDocument();
  });
});
