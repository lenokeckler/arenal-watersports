import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import { useCategoryConfigureDraft } from "../hooks/useCategoryConfigureDraft";
import type { UseCategoryConfigureDraftOptions } from "../models/UseCategoryConfigureDraftOptions.interface";
import {
  BASELINE_EDITED_VALUES,
  ONE_FLAG_EDITED_VALUES,
} from "./CategoryConfigureSave.constants";
import { buildImageFile } from "./CategoryImage.constants";

const CLEAN_OPTIONS: UseCategoryConfigureDraftOptions = {
  isInitiallyActive: true,
  values: BASELINE_EDITED_VALUES,
  pickedFile: null,
};

const renderDraft = () =>
  renderHook(
    (options: UseCategoryConfigureDraftOptions) =>
      useCategoryConfigureDraft(options),
    { initialProps: CLEAN_OPTIONS }
  );

describe("useCategoryConfigureDraft", () => {
  it("starts clean, with the first values as the baseline", () => {
    const { result } = renderDraft();

    expect(result.current.changedCount).toBe(LENGTH.ZERO);
    expect(result.current.baseline).toEqual(
      result.current.current
    );
  });

  it("counts an edited value and a picked photo", () => {
    const { result, rerender } = renderDraft();

    rerender({
      ...CLEAN_OPTIONS,
      values: ONE_FLAG_EDITED_VALUES,
      pickedFile: buildImageFile(),
    });

    expect(result.current.changedCount).toBe(LENGTH.TWO);
  });

  it("counts the active switch once and clears it when toggled back", () => {
    const { result } = renderDraft();

    act(() => result.current.onToggleActive());
    expect(result.current.current.isActive).toBe(false);
    expect(result.current.changedCount).toBe(LENGTH.ONE);

    act(() => result.current.onToggleActive());
    expect(result.current.changedCount).toBe(LENGTH.ZERO);
  });

  it("is clean again once the saved draft becomes the baseline", () => {
    const { result, rerender } = renderDraft();
    rerender({
      ...CLEAN_OPTIONS,
      values: ONE_FLAG_EDITED_VALUES,
    });

    act(() =>
      result.current.onBaselineChange(
        result.current.current
      )
    );

    expect(result.current.changedCount).toBe(LENGTH.ZERO);
  });
});
