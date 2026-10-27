import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_GROUP_PREFIX_LABEL } from "../constants/CategoryGroupPrefixLabel.constants";

export const createCategoryCardPage = () => {
  const getNameHeading = (name: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name });

  const getInactivePill = () =>
    screen.queryByText(
      CATEGORY_CATALOG_COPY.STATUS_PILL_INACTIVE
    );

  const getGroupRow = (groupName: string) =>
    screen.queryByText(groupName);

  const getTrackingModeLabel = (label: string) =>
    screen.queryByText(label);

  const getGroupPrefix = () =>
    screen.queryByText(CATEGORY_GROUP_PREFIX_LABEL);

  const getDeleteButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.DELETE_CATEGORY_BUTTON,
    });

  const getMarkInactiveButton = () =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: CATEGORY_CATALOG_COPY.MARK_INACTIVE_BUTTON,
    });

  return {
    getNameHeading,
    getInactivePill,
    getGroupRow,
    getTrackingModeLabel,
    getGroupPrefix,
    getDeleteButton,
    getMarkInactiveButton,
  };
};
