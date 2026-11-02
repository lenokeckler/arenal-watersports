import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ReservationSplitUnitChoice from "../components/ReservationSplitUnitChoice";
import {
  SPLIT_DRAFT,
  SPLIT_DRAFT_KEY,
  SPLIT_ORIGINAL_TIME,
  SPLIT_UNIT_ERROR,
  SPLIT_UNIT_ITEM,
} from "./ReservationSplit.constants";
import { createReservationSplitUnitChoicePage } from "./ReservationSplitUnitChoice.page";
import type { ReservationSplitUnitChoiceProps } from "../models/ReservationSplitUnitChoiceProps.interface";

const renderChoice = (
  overrides: Partial<ReservationSplitUnitChoiceProps> = {}
) => {
  const onSelect = vi.fn();
  render(
    <ReservationSplitUnitChoice
      drafts={[SPLIT_DRAFT]}
      onSelect={onSelect}
      originalTime={SPLIT_ORIGINAL_TIME}
      selectedKey={null}
      unit={SPLIT_UNIT_ITEM}
      {...overrides}
    />
  );
  return {
    onSelect,
    page: createReservationSplitUnitChoicePage(),
  };
};

describe("ReservationSplitUnitChoice", () => {
  it("checks the original by default", () => {
    const { page } = renderChoice();

    expect(page.getOriginalOption()).toBeChecked();
    expect(page.getDepartureOption()).not.toBeChecked();
  });

  it("reports the chosen departure key", async () => {
    const { onSelect, page } = renderChoice();

    await page.selectDeparture();

    expect(onSelect).toHaveBeenCalledWith(SPLIT_DRAFT_KEY);
  });

  it("checks the departure that holds the unit", () => {
    const { page } = renderChoice({
      selectedKey: SPLIT_DRAFT_KEY,
    });

    expect(page.getDepartureOption()).toBeChecked();
  });

  it("labels a departure without time", () => {
    const { page } = renderChoice({
      drafts: [{ ...SPLIT_DRAFT, time: "" }],
    });

    expect(
      page.getDepartureOption("sin hora")
    ).toBeVisible();
  });

  it("links the error to the group and freezes the options", () => {
    const { page } = renderChoice({
      error: SPLIT_UNIT_ERROR,
      isFrozen: true,
    });

    expect(page.getGroup()).toHaveAccessibleDescription(
      SPLIT_UNIT_ERROR
    );
    expect(page.getOriginalOption()).toBeDisabled();
  });
});
