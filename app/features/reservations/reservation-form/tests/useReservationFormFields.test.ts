import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReservationFormFields } from "../hooks/useReservationFormFields";
import { RESERVATION_EDIT_TEST } from "./ReservationEdit.constants";
import { VALID_RESERVATION_FORM_INPUT } from "./reservationFormUtils.constants";

const NEXT_TIME = "11:15";
const initialValues = {
  ...VALID_RESERVATION_FORM_INPUT,
  unitId: RESERVATION_EDIT_TEST.UNIT_ID,
};

describe("useReservationFormFields", () => {
  it.each([
    [false, ""],
    [true, RESERVATION_EDIT_TEST.UNIT_ID],
  ])(
    "with keepsUnitOnScheduleChange %s a time change leaves unit %s",
    (keepsUnitOnScheduleChange, expectedUnitId) => {
      const { result } = renderHook(() =>
        useReservationFormFields("", "", vi.fn(), {
          initialValues,
          keepsUnitOnScheduleChange,
        })
      );

      act(() => result.current.handleTimeChange(NEXT_TIME));

      expect(result.current.values.unitId).toBe(
        expectedUnitId
      );
    }
  );
});
