import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";

export const createReservationCategoryConflictPage =
  () => ({
    findWarning: () =>
      screen.findByRole(ARIA_ROLE.ALERT, {
        name: RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_TITLE,
      }),
    findError: () =>
      screen.findByText(
        RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_ERROR
      ),
    queryWarning: () =>
      screen.queryByRole(ARIA_ROLE.ALERT, {
        name: RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_TITLE,
      }),
    findCode: () =>
      screen.findByText(
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.CODE
      ),
    findCustomerName: () =>
      screen.findByText(
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.CUSTOMER_NAME
      ),
    findInterval: () =>
      screen.findByText(
        RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INTERVAL
      ),
  });
