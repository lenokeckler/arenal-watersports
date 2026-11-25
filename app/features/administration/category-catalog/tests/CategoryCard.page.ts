import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_GROUP_PREFIX_LABEL } from "../constants/CategoryGroupPrefixLabel.constants";

export const createCategoryCardPage = () => {
  const getCardLink = () =>
    screen.getByRole(ARIA_ROLE.LINK);

  const getButtons = () =>
    screen.queryAllByRole(ARIA_ROLE.BUTTON);

  const getEditLabel = () =>
    screen.queryByText(CATEGORY_CATALOG_COPY.EDIT_BUTTON);

  const getNameHeading = (name: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name });

  const getStatusChip = (label: string) =>
    screen.queryByText(label, { exact: true });

  const getSubtitle = (subtitle: string) =>
    screen.queryByText(subtitle);

  const getBehaviorLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.BEHAVIOR_LINK,
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

  return {
    getCardLink,
    getEditLabel,
    getButtons,
    getNameHeading,
    getStatusChip,
    getSubtitle,
    getBehaviorLink,
    getGroupPrefix,
    getDeleteButton,
    getMarkInactiveButton,
    getReactivateButton,
  };
};
