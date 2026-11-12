import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { ReservationCreateSubmitOptions } from "../models/ReservationCreateSubmitOptions.interface";
import { createReservationCreateSubmitHandler } from "../utils/createReservationCreateSubmitHandler";
import { RESERVATION_CREATE_SUBMIT_TEST } from "./createReservationCreateSubmitHandler.constants";

const submitReservationForm = (
  options: ReservationCreateSubmitOptions
): void => {
  render(
    <form
      aria-label={RESERVATION_CREATE_SUBMIT_TEST.FORM_NAME}
      onSubmit={createReservationCreateSubmitHandler(
        options
      )}
    />
  );
  fireEvent.submit(
    screen.getByRole("form", {
      name: RESERVATION_CREATE_SUBMIT_TEST.FORM_NAME,
    })
  );
};

describe("createReservationCreateSubmitHandler predefined combos", () => {
  it("submits a predefined combo using its saved catalog ID", () => {
    const submitPredefinedComboReservation = vi.fn();
    const submitCustomComboReservation = vi.fn();
    const onSuccess = vi.fn();
    submitReservationForm({
      ...RESERVATION_CREATE_SUBMIT_TEST.COMBO_OPTIONS,
      predefinedCombo: {
        mode: PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED,
        selectedComboId:
          RESERVATION_CREATE_SUBMIT_TEST.PREDEFINED_COMBO_ID,
      },
      onSuccess,
      submitCustomComboReservation,
      submitPredefinedComboReservation,
    });

    expect(
      submitPredefinedComboReservation
    ).toHaveBeenCalledWith(
      RESERVATION_CREATE_SUBMIT_TEST.EXPECTED_PREDEFINED_COMBO_INPUT,
      onSuccess
    );
    expect(
      submitCustomComboReservation
    ).not.toHaveBeenCalled();
  });

  it("requires a saved combo selection before submitting", () => {
    const requestErrorFocus = vi.fn();
    const setSubmissionError = vi.fn();
    const submitPredefinedComboReservation = vi.fn();
    submitReservationForm({
      ...RESERVATION_CREATE_SUBMIT_TEST.COMBO_OPTIONS,
      predefinedCombo: {
        mode: PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED,
        selectedComboId: null,
      },
      requestErrorFocus,
      setSubmissionError,
      submitPredefinedComboReservation,
    });

    expect(setSubmissionError).toHaveBeenCalledWith(
      RESERVATION_CREATE_SUBMIT_TEST.PREDEFINED_COMBO_NO_SELECTION_ERROR
    );
    expect(requestErrorFocus).toHaveBeenCalledOnce();
    expect(
      submitPredefinedComboReservation
    ).not.toHaveBeenCalled();
  });

  it("keeps submitting the custom combo when the custom mode is chosen", () => {
    const submitCustomComboReservation = vi.fn();
    const submitPredefinedComboReservation = vi.fn();
    const onSuccess = vi.fn();
    submitReservationForm({
      ...RESERVATION_CREATE_SUBMIT_TEST.COMBO_OPTIONS,
      submitCustomComboReservation,
      submitPredefinedComboReservation,
      onSuccess,
    });

    expect(
      submitCustomComboReservation
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        customerName:
          RESERVATION_CREATE_SUBMIT_TEST.COMBO_OPTIONS.values
            .customerName,
      }),
      onSuccess
    );
    expect(
      submitPredefinedComboReservation
    ).not.toHaveBeenCalled();
  });
});
