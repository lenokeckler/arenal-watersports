import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReservationSplitDrafts } from "../hooks/useReservationSplitDrafts";
import { EXPECTED_SPLIT } from "./ReservationSplit.constants";
import {
  QUANTITY_ID,
  UNIT_ID,
} from "./ReservationSplitDrafts.constants";

const STEP_BEYOND_LIMIT = 100;
const UNKNOWN_ID = "unknown";

const renderDrafts = () =>
  renderHook(() =>
    useReservationSplitDrafts(EXPECTED_SPLIT)
  );

describe("useReservationSplitDrafts", () => {
  it("keeps one person and one piece on the original", () => {
    const { result } = renderDrafts();
    const { key } = result.current.state.drafts[0];

    act(() => {
      result.current.stepPeopleCount(
        key,
        STEP_BEYOND_LIMIT
      );
      result.current.stepQuantity(
        key,
        QUANTITY_ID,
        STEP_BEYOND_LIMIT
      );
    });

    expect(result.current.remainder.peopleCount).toBe(1);
    expect(result.current.remainder.pieces).toBe(1);
    expect(result.current.canAddDeparture).toBe(false);
  });

  it("returns a removed departure's unit to the original", () => {
    const { result } = renderDrafts();

    act(() => result.current.addDeparture());
    const [first, second] = result.current.state.drafts;
    act(() =>
      result.current.assignUnit(UNIT_ID, second.key)
    );
    act(() => result.current.removeDeparture(second.key));

    expect(result.current.state.drafts).toEqual([first]);
    expect(
      result.current.state.unitAssignments[UNIT_ID]
    ).toBeNull();
  });

  it("never removes the only new departure", () => {
    const { result } = renderDrafts();
    const { key } = result.current.state.drafts[0];

    act(() => result.current.removeDeparture(key));

    expect(result.current.state.drafts).toHaveLength(1);
  });
});

describe("useReservationSplitDrafts guards", () => {
  it("ignores unknown ids and an assignment that empties the original", () => {
    const { result } = renderDrafts();
    const { key } = result.current.state.drafts[0];

    act(() => {
      result.current.stepQuantity(key, UNKNOWN_ID, 1);
      result.current.assignUnit(UNIT_ID, UNKNOWN_ID);
      result.current.stepQuantity(
        key,
        QUANTITY_ID,
        STEP_BEYOND_LIMIT
      );
    });
    act(() => result.current.assignUnit(UNIT_ID, key));

    expect(
      result.current.state.drafts[0].quantities
    ).toEqual({
      [QUANTITY_ID]: 4,
    });
    expect(
      result.current.state.unitAssignments[UNIT_ID]
    ).toBeNull();
  });
});
