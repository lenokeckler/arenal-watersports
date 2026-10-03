import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

export const createCategoryCardPage = () => {
  const user = userEvent.setup();

  const getNameHeading = (name: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name });

  const getInactivePill = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.STATUS_PILL_INACTIVE
    );

  const getGroupRow = (groupName: string) =>
    screen.queryByText(groupName);

  const getDeleteButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.DELETE_CATEGORY_BUTTON,
    });

  const getMarkInactiveButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.MARK_INACTIVE_BUTTON,
    });

  const getCancelButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
    });

  const getConfirmDeleteButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.DELETE_BUTTON,
    });

  const getConfirmDeleteMessage = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.DELETE_CONFIRM_MESSAGE
    );

  const isCancelButtonDisabled = () =>
    screen
      .getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
      })
      .hasAttribute("disabled");

  const clickCancelButton = async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_CATALOG_COPY.CANCEL_BUTTON,
      })
    );
  };

  const clickConfirmDeleteButton =
    async (): Promise<void> => {
      await user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: CATEGORY_CATALOG_COPY.DELETE_BUTTON,
        })
      );
    };

  return {
    getNameHeading,
    getInactivePill,
    getGroupRow,
    getDeleteButton,
    getMarkInactiveButton,
    getCancelButton,
    getConfirmDeleteButton,
    getConfirmDeleteMessage,
    isCancelButtonDisabled,
    clickCancelButton,
    clickConfirmDeleteButton,
  };
};
