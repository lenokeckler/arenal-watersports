import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { ReservationFormSubmitOptions } from "../models/ReservationFormSubmitOptions.interface";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";
import { RESERVATION_SUBMIT_TEST } from "./createReservationFormSubmitHandler.constants";

const submitReservationForm = (
  options: ReservationFormSubmitOptions
): void => {
  render(
    <form
      aria-label={RESERVATION_SUBMIT_TEST.FORM_NAME}
      onSubmit={createReservationFormSubmitHandler(options)}
    />
  );
  fireEvent.submit(
    screen.getByRole("form", {
      name: RESERVATION_SUBMIT_TEST.FORM_NAME,
    })
  );
};

it("maps combo values into the custom action input", () => {
  const submitCustomComboReservation = vi.fn();
  submitReservationForm({
    ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS,
    submitCustomComboReservation,
  });

  expect(submitCustomComboReservation).toHaveBeenCalledWith(
    RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT
  );
});

it("omits guide assignments when the combo has no guide item", () => {
  const submitCustomComboReservation = vi.fn();
  submitReservationForm({
    ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS,
    customCombo: {
      ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS.customCombo,
      hasGuideOnlyItem: false,
    },
    submitCustomComboReservation,
  });

  expect(submitCustomComboReservation).toHaveBeenCalledWith(
    {
      ...RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT,
      guideIds: [],
    }
  );
});

it("does not submit custom combo values through other actions", () => {
  const options: ReservationFormSubmitOptions = {
    ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS,
    submitCustomComboReservation: vi.fn(),
    submitPredefinedComboReservation: vi.fn(),
    submitReservation: vi.fn(),
  };
  submitReservationForm(options);

  expect(options.submitReservation).not.toHaveBeenCalled();
  expect(
    options.submitPredefinedComboReservation
  ).not.toHaveBeenCalled();
});

it("submits a predefined combo using its saved catalog ID", () => {
  const submitPredefinedComboReservation = vi.fn();
  submitReservationForm({
    ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS,
    predefinedCombo: {
      mode: PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED,
      selectedComboId:
        RESERVATION_SUBMIT_TEST.PREDEFINED_COMBO_ID,
    },
    submitPredefinedComboReservation,
  });

  expect(
    submitPredefinedComboReservation
  ).toHaveBeenCalledWith(
    RESERVATION_SUBMIT_TEST.EXPECTED_PREDEFINED_COMBO_INPUT
  );
});

it("requires a saved combo selection before submitting", () => {
  const setSubmissionError = vi.fn();
  const submitPredefinedComboReservation = vi.fn();
  submitReservationForm({
    ...RESERVATION_SUBMIT_TEST.COMBO_OPTIONS,
    predefinedCombo: {
      mode: PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED,
      selectedComboId: null,
    },
    setSubmissionError,
    submitPredefinedComboReservation,
  });

  expect(setSubmissionError).toHaveBeenCalledWith(
    RESERVATION_SUBMIT_TEST.PREDEFINED_COMBO_NO_SELECTION_ERROR
  );
  expect(
    submitPredefinedComboReservation
  ).not.toHaveBeenCalled();
});
