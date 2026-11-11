import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import { usePredefinedComboForm } from "../hooks/usePredefinedComboForm";
import { PREDEFINED_COMBO_FORM_TEST } from "./usePredefinedComboForm.constants";

describe("usePredefinedComboForm", () => {
  it("starts in custom mode without a selected combo", () => {
    const { result } = renderHook(() =>
      usePredefinedComboForm(
        [
          PREDEFINED_COMBO_FORM_TEST.COMBO,
          PREDEFINED_COMBO_FORM_TEST.COMBO_WITHOUT_GUIDE,
        ],
        true,
        vi.fn()
      )
    );

    expect(result.current.mode).toBe(
      PREDEFINED_COMBO_SELECTION_MODE.CUSTOM
    );
    expect(result.current.selectedComboId).toBeNull();
    expect(result.current.selectedCombo).toBeNull();
  });

  it("derives a selected combo only from a persisted catalog ID", () => {
    const { result } = renderHook(() =>
      usePredefinedComboForm(
        [PREDEFINED_COMBO_FORM_TEST.COMBO],
        true,
        vi.fn()
      )
    );

    act(() => {
      result.current.handleModeChange(
        PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
      );
    });
    act(() => {
      result.current.handleComboSelection(
        PREDEFINED_COMBO_FORM_TEST.ID
      );
    });

    expect(result.current.selectedComboId).toBe(
      PREDEFINED_COMBO_FORM_TEST.ID
    );
    expect(result.current.selectedCombo).toEqual(
      PREDEFINED_COMBO_FORM_TEST.COMBO
    );
  });

  it("does not accept an ID absent from the catalog", () => {
    const { result } = renderHook(() =>
      usePredefinedComboForm(
        [PREDEFINED_COMBO_FORM_TEST.COMBO],
        true,
        vi.fn()
      )
    );
    act(() => {
      result.current.handleModeChange(
        PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
      );
    });
    act(() => {
      result.current.handleComboSelection(
        PREDEFINED_COMBO_FORM_TEST.INVALID_ID
      );
    });

    expect(result.current.selectedComboId).toBeNull();
    expect(result.current.selectedCombo).toBeNull();
  });
});
