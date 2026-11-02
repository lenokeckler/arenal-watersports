"use server";

import { createRentalReservation } from "../services/createRentalReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import { isReservationFormInput } from "../utils/isReservationFormInput";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { reportServerError } from "@/app/services/observability";
import type { Nullable } from "@/app/types";

const resolveUnavailableCategoryError = (
  error: Error
): Nullable<ReservationFormActionResult> => {
  if (
    !error.message.includes(
      RESERVATION_SERVICE_OPERATION.CATEGORY_UNAVAILABLE
    )
  ) {
    return null;
  }

  return {
    ok: false,
    errors: {
      [RESERVATION_FORM_FIELD.CATEGORY_ID]:
        RESERVATION_FORM_UI_COPY.CATEGORY_UNAVAILABLE,
    },
  };
};

const resolveReservationAccessError = (
  error: Error
): Nullable<ReservationFormActionResult> => {
  if (
    !error.message.includes(
      RESERVATION_SERVICE_OPERATION.RESERVATION_ACCESS_REQUIRED
    ) &&
    !error.message.includes(
      RESERVATION_SERVICE_OPERATION.EQUIPMENT_RESERVATION_ACCESS_REQUIRED
    )
  ) {
    return null;
  }

  return {
    ok: false,
    errors: {},
    formError:
      RESERVATION_FORM_UI_COPY.SUBMIT_RESERVATION_ACCESS_ERROR,
  };
};

const resolveUnavailableUnitError = (
  error: Error
): Nullable<ReservationFormActionResult> => {
  const isUnitConflict = error.message.includes(
    RESERVATION_SERVICE_OPERATION.UNIT_CONFLICT
  );
  if (
    !isUnitConflict &&
    !error.message.includes(
      RESERVATION_SERVICE_OPERATION.UNIT_UNAVAILABLE
    )
  ) {
    return null;
  }

  return {
    ok: false,
    errors: {
      [RESERVATION_FORM_FIELD.UNIT_ID]: isUnitConflict
        ? RESERVATION_FORM_UI_COPY.UNIT_CONFLICT
        : RESERVATION_FORM_UI_COPY.UNIT_UNAVAILABLE,
    },
    unitUnavailable: true,
  };
};

const resolveKnownReservationCreationError = (
  error: unknown
): Nullable<ReservationFormActionResult> => {
  if (!(error instanceof Error)) {
    return null;
  }

  const categoryError =
    resolveUnavailableCategoryError(error);
  if (categoryError) {
    return categoryError;
  }
  const accessError = resolveReservationAccessError(error);
  if (accessError) {
    return accessError;
  }
  return resolveUnavailableUnitError(error);
};

const handleReservationCreationError = (
  error: unknown
): ReservationFormActionResult => {
  const knownError =
    resolveKnownReservationCreationError(error);
  if (knownError) {
    return knownError;
  }

  reportServerError(
    RESERVATION_SERVICE_OPERATION.CREATE_RENTAL,
    error
  );
  throw error;
};

export const createReservationAction = async (
  input: unknown
): Promise<ReservationFormActionResult> => {
  if (!isReservationFormInput(input)) {
    return {
      ok: false,
      errors: {},
      formError: RESERVATION_FORM_UI_COPY.SUBMIT_ERROR,
    };
  }

  await getAuthorizedReservationFormClient();

  const validation = validateReservationFormInput(input);

  if (!validation.value) {
    return { ok: false, errors: validation.errors };
  }

  try {
    const reservationId = await createRentalReservation(
      validation.value
    );
    return { ok: true, reservationId };
  } catch (error) {
    return handleReservationCreationError(error);
  }
};
