import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { createReservationEquipmentPage } from "./ReservationFormEquipment.page";
import { createReservationFormCustomerPage } from "./ReservationFormCustomer.page";
import { createReservationTypeFieldPage } from "./ReservationTypeField.page";
import { createReservationFormSubmitPage } from "./ReservationFormSubmit.page";
import { createReservationFormConflictPage } from "./ReservationFormConflict.page";
import { createReservationFormExtrasPage } from "./ReservationFormExtras.page";
import { createReservationFormCategoryPage } from "./ReservationFormCategory.page";
import { createReservationFormNavigationPage } from "./ReservationFormNavigation.page";
import { createReservationFormDurationPage } from "./ReservationFormDuration.page";

const getReservationTypeOption = (label: string) =>
  screen.getByLabelText(label, { exact: false });

const queryQuantityInput = (
  container: HTMLElement
): NullableRef<HTMLInputElement> =>
  container.querySelector<HTMLInputElement>(
    `#${RESERVATION_FORM_FIELD_ID.QUANTITY}`
  );

const findSubmissionError = () =>
  screen.findByText(RESERVATION_FORM_UI_COPY.SUBMIT_ERROR);

const findSuccessMessage = () =>
  screen.findByText(RESERVATION_FORM_UI_COPY.SUCCESS);

const createQuantityPage = (
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement
) => ({
  setQuantity: async (quantity: string): Promise<void> => {
    const quantityInput = queryQuantityInput(container);
    if (!quantityInput) {
      throw new Error(
        "The equipment quantity field is missing."
      );
    }
    await user.clear(quantityInput);
    await user.type(quantityInput, quantity);
  },
});

export const createReservationFormViewPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();
  const reservationTypePage =
    createReservationTypeFieldPage();
  const submitPage = createReservationFormSubmitPage(user);
  const conflictPage = createReservationFormConflictPage();
  const extrasPage = createReservationFormExtrasPage(user);
  const categoryPage =
    createReservationFormCategoryPage(user);
  const navigationPage =
    createReservationFormNavigationPage(user);
  const durationPage = createReservationFormDurationPage(
    user,
    container
  );
  const reservationCustomerPage =
    createReservationFormCustomerPage();

  return {
    ...createReservationEquipmentPage(user),
    ...reservationTypePage,
    ...submitPage,
    ...conflictPage,
    ...extrasPage,
    ...categoryPage,
    ...navigationPage,
    ...durationPage,
    ...reservationCustomerPage,
    findUnitOption: () =>
      screen.findByText(
        RESERVATION_FORM_VIEW_TEST.UNIT_CODE
      ),
    selectReservationType: async (
      label: string
    ): Promise<void> => {
      await user.click(getReservationTypeOption(label));
    },
    isReservationTypeSelected: (label: string): boolean =>
      (getReservationTypeOption(label) as HTMLInputElement)
        .checked,
    findReservationTypeSelectionReset: () =>
      screen.findByText(
        RESERVATION_FORM_UI_COPY.RESERVATION_TYPE_SELECTION_CLEARED
      ),
    findSubmissionError,
    findSuccessMessage,
    getFocusedElement: () => document.activeElement,
    getRenderedText: (): string =>
      container.textContent ?? STRING.Empty,
    getCustomerNameInput: () =>
      container.querySelector<HTMLInputElement>(
        `#${RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME}`
      ),
    setCustomerName: async (
      value: string
    ): Promise<void> => {
      const input =
        container.querySelector<HTMLInputElement>(
          `#${RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME}`
        );
      if (input === null) {
        throw new Error(
          "The customer name field is missing."
        );
      }
      await user.clear(input);
      await user.type(input, value);
    },
    queryQuantityInput: () => queryQuantityInput(container),
    ...createQuantityPage(user, container),
  };
};
