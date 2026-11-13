import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";

export const createReservationFormConflictPage = () => ({
  findCategoryConflictWarning: () =>
    screen.findByRole(ARIA_ROLE.ALERT, {
      name: RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_TITLE,
    }),
  findCategoryConflictError: () =>
    screen.findByText(
      RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_ERROR
    ),
  queryCategoryConflictWarning: () =>
    screen.queryByRole(ARIA_ROLE.ALERT, {
      name: RESERVATION_FORM_UI_COPY.CATEGORY_CONFLICT_WARNING_TITLE,
    }),
  findCategoryConflictCode: () =>
    screen.findByText(
      RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.CODE
    ),
  findCategoryConflictCustomerName: () =>
    screen.findByText(
      RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.CUSTOMER_NAME
    ),
  findCategoryConflictInterval: () =>
    screen.findByText(
      RESERVATION_CATEGORY_CONFLICT_WARNING_TEST.INTERVAL
    ),
});
