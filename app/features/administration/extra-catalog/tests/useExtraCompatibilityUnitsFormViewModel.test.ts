import {
  pushMock,
  refreshMock,
  renderUnitsViewModel,
  setCompatibilityMock,
  showToastMock,
  submitUnitsViewModel,
  toggleUnit,
} from "./extraCompatibilityUnits.harness";
import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import { resolveExtraCompatibilityPath } from "../utils/resolveExtraCompatibilityPath";
import { createDeferred } from "./createDeferred";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_EXTRA_ID,
  COMPATIBILITY_UNITS,
  FREE_UNIT_ID,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";
import { SUBMISSIONS_WHILE_LOCKED } from "./ExtraForm.constants";
import { settleDeferred } from "./settleDeferred";

const checkedUnitIds = (
  result: ReturnType<typeof renderUnitsViewModel>["result"]
): string[] =>
  result.current.options
    .filter((option) => option.isChecked)
    .map((option) => option.id);

describe("useExtraCompatibilityUnitsFormViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    setCompatibilityMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("starts with the linked units checked and nothing to save", () => {
    const { result } = renderUnitsViewModel();

    expect(checkedUnitIds(result)).toStrictEqual([
      LINKED_UNIT_ID,
    ]);
    expect(result.current.hasChanges).toBe(false);
  });

  it("checks and unchecks a unit and flags the change", () => {
    const { result } = renderUnitsViewModel();

    toggleUnit(result, FREE_UNIT_ID);

    expect(checkedUnitIds(result)).toStrictEqual([
      LINKED_UNIT_ID,
      FREE_UNIT_ID,
    ]);
    expect(result.current.hasChanges).toBe(true);

    toggleUnit(result, FREE_UNIT_ID);

    expect(result.current.hasChanges).toBe(false);
  });

  it("checks every unit with the select all helper", () => {
    const { result } = renderUnitsViewModel();

    act(() => result.current.onSelectAll());

    expect(checkedUnitIds(result)).toStrictEqual([
      LINKED_UNIT_ID,
      FREE_UNIT_ID,
    ]);
  });

  it("unchecks every unit with the clear all helper", () => {
    const { result } = renderUnitsViewModel();

    act(() => result.current.onClearAll());

    expect(checkedUnitIds(result)).toStrictEqual([]);
    expect(result.current.hasChanges).toBe(true);
  });

  it("goes back to the categories screen of the extra", () => {
    const { result } = renderUnitsViewModel();

    act(() => result.current.onBack());

    expect(pushMock).toHaveBeenCalledWith(
      resolveExtraCompatibilityPath(COMPATIBILITY_EXTRA_ID)
    );
  });

  it("saves the checked units, toasts, goes back and refreshes the counts", async () => {
    const { result } = renderUnitsViewModel();
    toggleUnit(result, FREE_UNIT_ID);

    await submitUnitsViewModel(result);

    expect(setCompatibilityMock).toHaveBeenCalledWith({
      extraId: COMPATIBILITY_EXTRA_ID,
      categoryId: COMPATIBILITY_CATEGORY_ID,
      unitIds: [LINKED_UNIT_ID, FREE_UNIT_ID],
    });
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      EXTRA_COMPATIBILITY_COPY.SAVE_SUCCESS_TOAST
    );
    expect(pushMock).toHaveBeenCalledWith(
      resolveExtraCompatibilityPath(COMPATIBILITY_EXTRA_ID)
    );
    expect(refreshMock).toHaveBeenCalledOnce();
  });

  it("saves an empty selection to clear the links of the category", async () => {
    const { result } = renderUnitsViewModel();
    act(() => result.current.onClearAll());

    await submitUnitsViewModel(result);

    expect(setCompatibilityMock).toHaveBeenCalledWith({
      extraId: COMPATIBILITY_EXTRA_ID,
      categoryId: COMPATIBILITY_CATEGORY_ID,
      unitIds: [],
    });
  });

  it("does not submit when nothing changed", async () => {
    const { result } = renderUnitsViewModel();

    await submitUnitsViewModel(result);

    expect(setCompatibilityMock).not.toHaveBeenCalled();
    expect(showToastMock).not.toHaveBeenCalled();
  });

  it("keeps the worker on the screen when the save fails", async () => {
    setCompatibilityMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_COMPATIBILITY_COPY.NOT_FOUND_ERROR,
    });
    const { result } = renderUnitsViewModel();
    toggleUnit(result, FREE_UNIT_ID);

    await submitUnitsViewModel(result);

    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      EXTRA_COMPATIBILITY_COPY.NOT_FOUND_ERROR
    );
    expect(pushMock).not.toHaveBeenCalled();
    expect(checkedUnitIds(result)).toStrictEqual([
      LINKED_UNIT_ID,
      FREE_UNIT_ID,
    ]);
  });

  it("blocks a second submission while the first is in flight", async () => {
    const deferred = createDeferred<ExtraMutationResult>();
    setCompatibilityMock.mockReturnValue(deferred.promise);
    const { result } = renderUnitsViewModel(
      COMPATIBILITY_UNITS
    );
    toggleUnit(result, FREE_UNIT_ID);

    act(() => {
      void result.current.onSubmit(buildFormSubmitEvent());
      void result.current.onSubmit(buildFormSubmitEvent());
    });

    expect(result.current.isSubmitting).toBe(true);
    expect(setCompatibilityMock).toHaveBeenCalledTimes(
      SUBMISSIONS_WHILE_LOCKED
    );

    await settleDeferred(deferred, {
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });

    expect(result.current.isSubmitting).toBe(false);
  });
});
