import { act, renderHook } from "@testing-library/react";
import { STRING } from "@/app/constants";
import { describe, expect, it, vi } from "vitest";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useReservationFormFields } from "../hooks/useReservationFormFields";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

describe("reservation guide selection state", () => {
  it("allows three guides, toggles one off, and clears when leaving tour", () => {
    const { result } = renderHook(() =>
      useReservationFormFields(
        RESERVATION_FORM_VIEW_TEST.DATE,
        STRING.Empty,
        vi.fn(),
        []
      )
    );

    act(() => {
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.TOUR
      );
    });
    act(() => {
      result.current.handleGuideToggle(
        RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID
      );
    });
    act(() => {
      result.current.handleGuideToggle(
        RESERVATION_GUIDE_SELECTION_TEST.SECOND_ID
      );
    });
    act(() => {
      result.current.handleGuideToggle(
        RESERVATION_GUIDE_SELECTION_TEST.THIRD_ID
      );
    });

    expect(result.current.values.guideIds).toEqual([
      RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
      RESERVATION_GUIDE_SELECTION_TEST.SECOND_ID,
      RESERVATION_GUIDE_SELECTION_TEST.THIRD_ID,
    ]);

    act(() => {
      result.current.handleGuideToggle(
        RESERVATION_GUIDE_SELECTION_TEST.SECOND_ID
      );
    });
    expect(result.current.values.guideIds).toEqual([
      RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
      RESERVATION_GUIDE_SELECTION_TEST.THIRD_ID,
    ]);

    act(() => {
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.RENTAL
      );
    });
    expect(result.current.values.guideIds).toEqual([]);
  });

  it("removes selected guides missing from a refreshed list", () => {
    const { result } = renderHook(() =>
      useReservationFormFields(
        RESERVATION_FORM_VIEW_TEST.DATE,
        STRING.Empty,
        vi.fn(),
        []
      )
    );

    act(() => {
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.TOUR
      );
    });
    act(() => {
      result.current.handleGuideToggle(
        RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID
      );
    });
    act(() => {
      result.current.handleGuideToggle(
        RESERVATION_GUIDE_SELECTION_TEST.SECOND_ID
      );
    });
    act(() => {
      result.current.reconcileGuideSelection([
        RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
      ]);
    });

    expect(result.current.values.guideIds).toEqual([
      RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
    ]);
  });
});
