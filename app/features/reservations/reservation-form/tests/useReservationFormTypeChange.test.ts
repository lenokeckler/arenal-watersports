import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useReservationFormFields } from "../hooks/useReservationFormFields";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const RESERVATION_FORM_TYPE_CHANGE_TEST = {
  DATE: RESERVATION_FORM_VIEW_TEST.DATE,
  UNIT_ID: RESERVATION_FORM_VIEW_TEST.UNIT_ID,
} as const;

const GUIDE_ONLY_CATEGORIES = [
  {
    id: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
    isGuideOnly: true,
    isInterchangeable: false,
    name: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
  },
] satisfies ReservationCategoryOption[];

describe("useReservationFormFields reservation type changes", () => {
  it("clears a guide-only category and selected unit when changing to rental", () => {
    const { result } = renderHook(() =>
      useReservationFormFields(
        RESERVATION_FORM_TYPE_CHANGE_TEST.DATE,
        RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
        vi.fn(),
        GUIDE_ONLY_CATEGORIES
      )
    );

    act(() => {
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.TOUR
      );
    });
    act(() => {
      result.current.handleUnitChange(
        RESERVATION_FORM_TYPE_CHANGE_TEST.UNIT_ID
      );
    });
    act(() => {
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.RENTAL
      );
    });

    expect(result.current.values.categoryId).toBe(
      STRING.Empty
    );
    expect(result.current.values.unitId).toBe(STRING.Empty);
    expect(
      result.current.hasReservationTypeSelectionReset
    ).toBe(true);
  });
});
