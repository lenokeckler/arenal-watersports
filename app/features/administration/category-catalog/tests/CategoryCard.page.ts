import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_GROUP_PREFIX_LABEL } from "../constants/CategoryGroupPrefixLabel.constants";

export const createCategoryCardPage = () => {
  const user = userEvent.setup();

  const getNameHeading = (name: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name });

  const getStatusChip = (label: string) =>
    screen.queryByText(label, { exact: true });

  const getSubtitle = (subtitle: string) =>
    screen.queryByText(subtitle);

  const getEditButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.EDIT_BUTTON,
    });

  const clickEditButton = async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_CATALOG_COPY.EDIT_BUTTON,
      })
    );
  };

  const getGroupRow = (groupName: string) =>
    screen.queryByText(groupName);

  const getBehaviorLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.BEHAVIOR_LINK,
    });

  const getDepositLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.DEPOSIT_LINK,
    });

  const getUnitsLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.UNITS_LINK,
    });

  const getAlertsLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.ALERT_LINK,
    });

  const getGroupPrefix = () =>
    screen.queryByText(CATEGORY_GROUP_PREFIX_LABEL);

  const getDeleteButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.DELETE_CATEGORY_BUTTON,
    });

  const getReactivateButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.REACTIVATE_BUTTON,
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

  const clickReactivateButton = async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_CATALOG_COPY.REACTIVATE_BUTTON,
      })
    );
  };

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
    getStatusChip,
    getSubtitle,
    getEditButton,
    clickEditButton,
    getGroupRow,
    getBehaviorLink,
    getDepositLink,
    getAlertsLink,
    getUnitsLink,
    getGroupPrefix,
    getDeleteButton,
    getMarkInactiveButton,
    getReactivateButton,
    getCancelButton,
    getConfirmDeleteButton,
    getConfirmDeleteMessage,
    isCancelButtonDisabled,
    clickCancelButton,
    clickConfirmDeleteButton,
    clickReactivateButton,
  };
};
