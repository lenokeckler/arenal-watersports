import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useSelectionHarness } from "./ReservationFormSelectionFields.testHarness";
import { RESERVATION_FORM_SELECTION_TEST } from "./ReservationFormSelectionFields.constants";

describe("useReservationFormSelectionFields preservation", () => {
  it("keeps extras across rental and tour and clears them for combos", () => {
    const { result } = renderHook(useSelectionHarness);

    act(() =>
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.TOUR
      )
    );
    expect(result.current.values.extraIds).toEqual([
      RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID,
    ]);
    act(() =>
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.RENTAL
      )
    );
    expect(result.current.values.extraIds).toEqual([
      RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID,
    ]);
    act(() =>
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.COMBO
      )
    );
    expect(result.current.values.extraIds).toEqual([]);
  });

  it("clears the selected unit and extras when date changes", () => {
    const { result } = renderHook(useSelectionHarness);

    act(() =>
      result.current.handleDateChange(
        RESERVATION_FORM_SELECTION_TEST.CHANGED_DATE
      )
    );
    expect(result.current.values.unitId).toBe(STRING.Empty);
    expect(result.current.values.extraIds).toEqual([]);
  });

  it("clears the selected unit and extras when time changes", () => {
    const { result } = renderHook(useSelectionHarness);

    act(() =>
      result.current.handleTimeChange(
        RESERVATION_FORM_SELECTION_TEST.CHANGED_TIME
      )
    );

    expect(result.current.values.unitId).toBe(STRING.Empty);
    expect(result.current.values.extraIds).toEqual([]);
  });

  it("clears the selected unit and extras when duration changes", () => {
    const { result } = renderHook(useSelectionHarness);

    act(() =>
      result.current.handleDurationChange(
        RESERVATION_FORM_SELECTION_TEST.CHANGED_DURATION_HOURS
      )
    );

    expect(result.current.values.unitId).toBe(STRING.Empty);
    expect(result.current.values.extraIds).toEqual([]);
  });
});
