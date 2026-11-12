import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import {
  INVENTORY_COPY,
  INVENTORY_UNIT_STATUS_COPY,
} from "../constants/InventoryCopy.constants";
import { INVENTORY_STOCK_ADJUSTMENT_REASON_LABELS } from "../constants/InventoryStockAdjustmentOptions.constants";
import { EXPECTED_INVENTORY_UNIT_ROW_ERROR } from "./InventoryCategoryDetails.constants";
import type { ActiveInventoryUnitStatus } from "@/app/constants";

const getUnitStatus = (
  unitCode: string,
  status: ActiveInventoryUnitStatus
) => {
  const unitCodeElement = screen.getByText(unitCode, {
    exact: true,
  });
  const unitRow = unitCodeElement.parentElement;

  if (!unitRow) {
    throw new Error(EXPECTED_INVENTORY_UNIT_ROW_ERROR);
  }

  return within(unitRow).getByText(
    INVENTORY_UNIT_STATUS_COPY[status],
    { exact: true }
  );
};

const queryUnitListItem = () => {
  const unitSection = screen.queryByRole(ARIA_ROLE.REGION, {
    name: INVENTORY_COPY.UNITS,
  });

  return unitSection
    ? within(unitSection).queryByRole(ARIA_ROLE.LISTITEM)
    : null;
};

export const createInventoryCategoryPage = () => {
  const user = userEvent.setup();

  return {
    getBackLink: () =>
      screen.getByRole(ARIA_ROLE.LINK, {
        name: INVENTORY_COPY.BACK_TO_INVENTORY,
      }),
    getCategoryHeading: (categoryName: string) =>
      screen.getByRole(ARIA_ROLE.HEADING, {
        level: 1,
        name: categoryName,
      }),
    getAdjustmentReason: () =>
      screen.getByLabelText(
        INVENTORY_COPY.ADJUSTMENT_REASON_LABEL,
        { exact: false }
      ),
    getAvailableAdjustment: () =>
      screen.getByLabelText(
        INVENTORY_COPY.ADJUSTMENT_AVAILABLE,
        { exact: false }
      ),
    setAvailableAdjustment: async (value: string) => {
      const availableInput = screen.getByLabelText(
        INVENTORY_COPY.ADJUSTMENT_AVAILABLE,
        { exact: false }
      );
      await user.clear(availableInput);
      await user.type(availableInput, value);
    },
    clickSaveAdjustment: () =>
      user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: INVENTORY_COPY.ADJUSTMENT_SUBMIT,
        })
      ),
    queryAdjustmentReason: () =>
      screen.queryByLabelText(
        INVENTORY_COPY.ADJUSTMENT_REASON_LABEL,
        { exact: false }
      ),
    getMovementHistoryHeading: () =>
      screen.getByRole(ARIA_ROLE.HEADING, {
        level: 2,
        name: INVENTORY_COPY.MOVEMENT_HISTORY_TITLE,
      }),
    getRequiredReasonError: () =>
      screen.getByText(
        INVENTORY_COPY.ADJUSTMENT_REASON_REQUIRED
      ),
    getMovementAuthor: (actorName: string) =>
      screen.getByText(
        `${INVENTORY_COPY.MOVEMENT_AUTHOR}: ${actorName}`
      ),
    getMovementDate: () =>
      screen.getByText((content) =>
        content.startsWith(
          `${INVENTORY_COPY.MOVEMENT_DATE}:`
        )
      ),
    getNextMovementPage: () =>
      screen.getByRole(ARIA_ROLE.LINK, {
        name: INVENTORY_COPY.NEXT_PAGE,
      }),
    getMovementReason: (reason: string) =>
      screen.getByText(
        `${INVENTORY_COPY.MOVEMENT_REASON}: ${INVENTORY_STOCK_ADJUSTMENT_REASON_LABELS[reason]}`
      ),
    getCountValue: (count: number) =>
      screen.getByText(String(count), { exact: true }),
    getUnitCode: (unitCode: string) =>
      screen.getByText(unitCode, { exact: true }),
    getUnitStatus,
    queryUnitListItem,
  };
};
