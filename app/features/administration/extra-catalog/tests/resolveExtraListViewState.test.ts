import { describe, expect, it } from "vitest";
import { EXTRA_LIST_VIEW_STATE } from "../constants/ExtraListViewState.constants";
import { resolveExtraListViewState } from "../utils/resolveExtraListViewState";

const SOME_EXTRAS = 3;
const NO_EXTRAS = 0;

describe("resolveExtraListViewState", () => {
  it.each([
    [false, SOME_EXTRAS, EXTRA_LIST_VIEW_STATE.READY],
    [false, NO_EXTRAS, EXTRA_LIST_VIEW_STATE.EMPTY],
    [true, NO_EXTRAS, EXTRA_LIST_VIEW_STATE.ERROR],
    [true, SOME_EXTRAS, EXTRA_LIST_VIEW_STATE.ERROR],
  ])(
    "with fetchFailed %s and %s extras resolves %s",
    (fetchFailed, extraCount, expectedState) => {
      expect(
        resolveExtraListViewState(fetchFailed, extraCount)
      ).toBe(expectedState);
    }
  );
});
