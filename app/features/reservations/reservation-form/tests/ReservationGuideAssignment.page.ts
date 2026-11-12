import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";

export const createReservationGuideAssignmentPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();
  const form = within(container);
  const getGuideCheckbox = (name: string) =>
    form.getByLabelText(name, { exact: true });
  const getGuideRetryButton = () =>
    form.getByRole(ARIA_ROLE.BUTTON, {
      name: RESERVATION_FORM_UI_COPY.GUIDES_RETRY,
    });
  const getGuideError = () =>
    form.getByRole(ARIA_ROLE.ALERT);
  const getNoGuideWarning = () =>
    form.getByText(
      RESERVATION_FORM_UI_COPY.GUIDES_NO_SELECTION_WARNING,
      { exact: true }
    );
  return {
    getGuideCheckbox,
    findGuideCheckbox: (name: string) =>
      form.findByLabelText(name, { exact: true }),
    getGuideError,
    getGuideAssignmentError: () =>
      form.getByText(
        (_, element) =>
          element?.id ===
          RESERVATION_FORM_FIELD_ID.GUIDE_IDS_ERROR
      ),
    getNoGuideWarning,
    queryGuideSelector: () =>
      form.queryByRole(ARIA_ROLE.GROUP, {
        name: RESERVATION_FORM_UI_COPY.GUIDES,
      }),
    toggleGuide: async (name: string): Promise<void> => {
      await user.click(getGuideCheckbox(name));
    },
    clickGuideRetry: async (): Promise<void> => {
      await user.click(getGuideRetryButton());
    },
  };
};
