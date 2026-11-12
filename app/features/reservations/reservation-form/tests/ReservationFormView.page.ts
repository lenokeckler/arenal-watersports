import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_CATEGORY_CONFLICT_WARNING_TEST } from "./ReservationCategoryConflictWarning.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { createReservationEquipmentPage } from "./ReservationFormEquipment.page";
import { createReservationFormCustomerPage } from "./ReservationFormCustomer.page";
import { createReservationTypeFieldPage } from "./ReservationTypeField.page";

const getDurationOption = (label: string) =>
  screen.getByRole(ARIA_ROLE.BUTTON, { name: label });

const getReservationTypeOption = (label: string) =>
  screen.getByLabelText(label, { exact: false });

const getSelectedCategoryOption = () =>
  screen
    .queryByRole(ARIA_ROLE.GROUP, {
      name: RESERVATION_FORM_UI_COPY.CATEGORY,
    })
    ?.querySelector("button[aria-pressed='true']") ?? null;

const getCategoryName = (categoryId: string): string => {
  if (
    categoryId ===
    RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
  ) {
    return RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME;
  }
  if (
    categoryId ===
    RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_ID
  ) {
    return RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME;
  }
  return RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME;
};

const queryCustomDurationInput = (
  container: HTMLElement
): NullableRef<HTMLInputElement> =>
  container.querySelector<HTMLInputElement>(
    `#${RESERVATION_FORM_FIELD_ID.DURATION}`
  );

const queryQuantityInput = (
  container: HTMLElement
): NullableRef<HTMLInputElement> =>
  container.querySelector<HTMLInputElement>(
    `#${RESERVATION_FORM_FIELD_ID.QUANTITY}`
  );

const getSubmitButton = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: RESERVATION_FORM_UI_COPY.SUBMIT,
  });

const querySubmitButton = (): NullableRef<HTMLElement> =>
  screen.queryByRole(ARIA_ROLE.BUTTON, {
    name: RESERVATION_FORM_UI_COPY.SUBMIT,
  });

const getBackButton = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: RESERVATION_FORM_VIEW_TEST.BACK_TO_CALENDAR,
  });

const findDurationValidationError = () =>
  screen.findByText(
    RESERVATION_FORM_COPY[
      RESERVATION_FORM_FIELD.DURATION_HOURS
    ]
  );

const findSubmissionError = () =>
  screen.findByText(RESERVATION_FORM_UI_COPY.SUBMIT_ERROR);

const findSuccessMessage = () =>
  screen.findByText(RESERVATION_FORM_UI_COPY.SUCCESS);

const selectDuration = async (
  user: ReturnType<typeof userEvent.setup>,
  label: string
): Promise<void> => {
  await user.click(getDurationOption(label));
};

const typeCustomDuration = async (
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement,
  value: string
): Promise<void> => {
  const customDurationInput =
    queryCustomDurationInput(container);
  if (!customDurationInput) {
    throw new Error(
      "Custom duration input is not visible."
    );
  }
  await user.type(customDurationInput, value);
};

const submit = async (
  user: ReturnType<typeof userEvent.setup>
): Promise<void> => {
  await waitFor(() => getSubmitButton());
  await user.click(getSubmitButton());
};

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
  const reservationCustomerPage =
    createReservationFormCustomerPage();

  return {
    ...createReservationEquipmentPage(user),
    ...reservationTypePage,
    ...reservationCustomerPage,
    getDurationOption,
    getSelectedCategoryOption,
    findUnitOption: () =>
      screen.findByText(
        RESERVATION_FORM_VIEW_TEST.UNIT_CODE
      ),
    getCategorySelect: () =>
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: RESERVATION_FORM_UI_COPY.CATEGORY,
      }),
    queryCategoryOption: (categoryId: string) =>
      screen.queryByRole(ARIA_ROLE.BUTTON, {
        name: getCategoryName(categoryId),
      }),
    selectCategory: async (
      categoryId: string
    ): Promise<void> => {
      await user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: getCategoryName(categoryId),
        })
      );
    },
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
    getBackButton,
    findDurationValidationError,
    findSubmissionError,
    findSuccessMessage,
    getFocusedElement: () => document.activeElement,
    getExtraCheckbox: (name: string) =>
      screen.getByLabelText(name, { exact: false }),
    getExtrasQuote: () =>
      screen.getByText(
        RESERVATION_FORM_UI_COPY.QUOTE_TITLE
      ),
    getExtrasRetryButton: () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_UI_COPY.EXTRAS_RETRY,
      }),
    getQuoteRetryButton: () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_UI_COPY.QUOTE_RETRY,
      }),
    getRenderedText: (): string =>
      container.textContent ?? STRING.Empty,
    toggleExtra: async (name: string): Promise<void> => {
      await user.click(
        screen.getByLabelText(name, { exact: false })
      );
    },
    clickExtrasRetry: async (): Promise<void> => {
      await user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: RESERVATION_FORM_UI_COPY.EXTRAS_RETRY,
        })
      );
    },
    clickQuoteRetry: async (): Promise<void> => {
      await user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: RESERVATION_FORM_UI_COPY.QUOTE_RETRY,
        })
      );
    },
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
    getSubmitButton,
    querySubmitButton,
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
    clickBack: async (): Promise<void> => {
      await user.click(getBackButton());
    },
    queryCustomDurationInput: () =>
      queryCustomDurationInput(container),
    queryQuantityInput: () => queryQuantityInput(container),
    selectDuration: (label: string) =>
      selectDuration(user, label),
    ...createQuantityPage(user, container),
    submit: () => submit(user),
    typeCustomDuration: (value: string) =>
      typeCustomDuration(user, container, value),
  };
};
