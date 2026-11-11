import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import { usePredefinedComboForm } from "../hooks/usePredefinedComboForm";
import { PREDEFINED_COMBO_FORM_TEST } from "./usePredefinedComboForm.constants";

describe("usePredefinedComboForm reset transitions", () => {
  it("clears selection and guide assignments when returning to custom mode", () => {
    const onGuideIdsChange = vi.fn();
    const { result } = renderHook(() =>
      usePredefinedComboForm(
        [PREDEFINED_COMBO_FORM_TEST.COMBO],
        true,
        onGuideIdsChange
      )
    );
    act(() =>
      result.current.handleModeChange(
        PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
      )
    );
    act(() =>
      result.current.handleComboSelection(
        PREDEFINED_COMBO_FORM_TEST.ID
      )
    );

    act(() =>
      result.current.handleModeChange(
        PREDEFINED_COMBO_SELECTION_MODE.CUSTOM
      )
    );

    expect(result.current.selectedComboId).toBeNull();
    expect(result.current.selectedCombo).toBeNull();
    expect(result.current.mode).toBe(
      PREDEFINED_COMBO_SELECTION_MODE.CUSTOM
    );
    expect(onGuideIdsChange).toHaveBeenCalledWith([]);
  });

  it("hides selection when reservation type leaves combo", () => {
    const onGuideIdsChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ isComboReservation }) =>
        usePredefinedComboForm(
          [PREDEFINED_COMBO_FORM_TEST.COMBO],
          isComboReservation,
          onGuideIdsChange
        ),
      { initialProps: { isComboReservation: true } }
    );
    act(() =>
      result.current.handleModeChange(
        PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
      )
    );
    act(() =>
      result.current.handleComboSelection(
        PREDEFINED_COMBO_FORM_TEST.ID
      )
    );

    act(() => result.current.reset());
    rerender({ isComboReservation: false });

    expect(result.current.mode).toBe(
      PREDEFINED_COMBO_SELECTION_MODE.CUSTOM
    );
    expect(result.current.selectedComboId).toBeNull();
    expect(result.current.selectedCombo).toBeNull();
    expect(onGuideIdsChange).toHaveBeenCalledWith([]);
  });

  it("clears guide assignment when the next combo has no guide item", () => {
    const onGuideIdsChange = vi.fn();
    const { result } = renderHook(() =>
      usePredefinedComboForm(
        [
          PREDEFINED_COMBO_FORM_TEST.COMBO,
          PREDEFINED_COMBO_FORM_TEST.COMBO_WITHOUT_GUIDE,
        ],
        true,
        onGuideIdsChange
      )
    );
    act(() =>
      result.current.handleModeChange(
        PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
      )
    );
    act(() =>
      result.current.handleComboSelection(
        PREDEFINED_COMBO_FORM_TEST.ID
      )
    );

    act(() =>
      result.current.handleComboSelection(
        PREDEFINED_COMBO_FORM_TEST.COMBO_WITHOUT_GUIDE.id
      )
    );

    expect(onGuideIdsChange).toHaveBeenCalledWith([]);
    expect(result.current.selectedCombo).toEqual(
      PREDEFINED_COMBO_FORM_TEST.COMBO_WITHOUT_GUIDE
    );
  });
});
