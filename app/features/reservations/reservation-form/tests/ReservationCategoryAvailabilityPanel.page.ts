import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";

export const createReservationCategoryAvailabilityPanelPage =
  () => {
    const user = userEvent.setup();
    const getPanel = () =>
      screen.getByRole(ARIA_ROLE.REGION, {
        name: RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY,
      });

    return {
      getPanel,
      getStatus: () =>
        within(getPanel()).getByRole(ARIA_ROLE.STATUS),
      getAlert: () =>
        within(getPanel()).getByRole(ARIA_ROLE.ALERT),
      getAvailabilityCount: (count: number) =>
        within(getPanel()).getByText(
          `${count} ${RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_AVAILABLE}`
        ),
      clickRetry: async (): Promise<void> => {
        await user.click(
          within(getPanel()).getByRole(ARIA_ROLE.BUTTON, {
            name: RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_RETRY,
          })
        );
      },
    };
  };
