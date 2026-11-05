import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReservationFormSubmitOptions } from "../models/ReservationFormSubmitOptions.interface";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";
import { RESERVATION_SUBMIT_TEST } from "./createReservationFormSubmitHandler.constants";

describe("createReservationFormSubmitHandler", () => {
  it("maps combo values into the custom action input without list pricing", () => {
    const submitCustomComboReservation = vi.fn();
    const options: ReservationFormSubmitOptions = {
      ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS,
      setFieldError: vi.fn(),
      submitReservation: vi.fn(),
      submitCustomComboReservation,
    };
    render(
      <form
        aria-label={RESERVATION_SUBMIT_TEST.FORM_NAME}
        onSubmit={createReservationFormSubmitHandler(
          options
        )}
      />
    );
    const form = screen.getByRole("form", {
      name: RESERVATION_SUBMIT_TEST.FORM_NAME,
    });
    fireEvent.submit(form);
    expect(
      submitCustomComboReservation
    ).toHaveBeenCalledWith({
      ...RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT,
    });
    options.customCombo.hasGuideOnlyItem = false;
    fireEvent.submit(form);
    expect(
      submitCustomComboReservation
    ).toHaveBeenNthCalledWith(2, {
      ...RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT,
      guideIds: [],
    });
    expect(
      options.submitReservation
    ).not.toHaveBeenCalled();
  });
});
