import { vi } from "vitest";
import { RESERVATION_FORM_DEFAULT_VALUES } from "../constants/ReservationFormUi.constants";
import { useReservationFormFields } from "../hooks/useReservationFormFields";
import { RESERVATION_FORM_SELECTION_TEST } from "./ReservationFormSelectionFields.constants";

export const useSelectionHarness = () =>
  useReservationFormFields(
    RESERVATION_FORM_DEFAULT_VALUES.date,
    RESERVATION_FORM_SELECTION_TEST.SELECTED_CATEGORY_ID,
    vi.fn(),
    {
      initialValues: {
        ...RESERVATION_FORM_DEFAULT_VALUES,
        categoryId:
          RESERVATION_FORM_SELECTION_TEST.SELECTED_CATEGORY_ID,
        extraIds: [
          RESERVATION_FORM_SELECTION_TEST.EXISTING_EXTRA_ID,
        ],
        unitId:
          RESERVATION_FORM_SELECTION_TEST.SELECTED_UNIT_ID,
      },
    }
  );
