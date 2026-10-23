import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { useSelectionHarness } from "./ReservationFormSelectionFields.testHarness";
import { RESERVATION_FORM_SELECTION_TEST } from "./ReservationFormSelectionFields.constants";

describe("useReservationFormSelectionFields extras", () => {
  it("toggles a selected extra without adding quantity", () => {
    const { result } = renderHook(useSelectionHarness);

    act(() =>
      result.current.handleExtraToggle(
        RESERVATION_FORM_SELECTION_TEST.NEXT_EXTRA_ID
      )
    );
    expect(result.current.values.extraIds).toEqual([
      RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID,
      RESERVATION_FORM_SELECTION_TEST.NEXT_EXTRA_ID,
    ]);

    act(() =>
      result.current.handleExtraToggle(
        RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID
      )
    );
    expect(result.current.values.extraIds).toEqual([
      RESERVATION_FORM_SELECTION_TEST.NEXT_EXTRA_ID,
    ]);
  });

  it("clears extras only when category or concrete unit changes", () => {
    const { result } = renderHook(useSelectionHarness);

    act(() =>
      result.current.handleCategoryChange(
        RESERVATION_FORM_SELECTION_TEST.SELECTED_CATEGORY_ID
      )
    );
    expect(result.current.values.extraIds).toEqual([
      RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID,
    ]);
    act(() =>
      result.current.handleUnitChange(
        RESERVATION_FORM_SELECTION_TEST.SELECTED_UNIT_ID
      )
    );
    expect(result.current.values.extraIds).toEqual([
      RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID,
    ]);

    act(() =>
      result.current.handleUnitChange(
        RESERVATION_FORM_SELECTION_TEST.NEXT_UNIT_ID
      )
    );
    expect(result.current.values.extraIds).toEqual([]);
    act(() =>
      result.current.handleExtraToggle(
        RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID
      )
    );
    act(() =>
      result.current.handleCategoryChange(
        RESERVATION_FORM_SELECTION_TEST.NEXT_CATEGORY_ID
      )
    );
    expect(result.current.values.extraIds).toEqual([]);
    expect(result.current.values.unitId).toBe(STRING.Empty);
  });
});
