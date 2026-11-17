import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";

export const createExtraCompatibilityUnitsPage = () => {
  const user = userEvent.setup();

  const getTitle = () =>
    screen.queryByRole(ARIA_ROLE.HEADING, {
      name: EXTRA_COMPATIBILITY_COPY.UNITS_TITLE,
    });

  const getInstruction = (
    extraName: string,
    categoryName: string
  ) =>
    screen.queryByText(
      EXTRA_COMPATIBILITY_COPY.UNITS_INSTRUCTION(
        extraName,
        categoryName
      )
    );

  const getUnitCheckbox = (code: string) =>
    screen.getByRole(ARIA_ROLE.CHECKBOX, {
      name: new RegExp(code),
    });

  const queryUnitWithStatus = (
    code: string,
    status: string
  ) =>
    screen.queryByRole(ARIA_ROLE.CHECKBOX, {
      name: new RegExp(`${code}\\s*${status}`),
    });

  const getSelectAllButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.SELECT_ALL_BUTTON,
    });

  const getClearAllButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.CLEAR_ALL_BUTTON,
    });

  const getSaveButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(
        EXTRA_COMPATIBILITY_COPY.SAVE_BUTTON
      ),
    });

  const getBackButton = () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: EXTRA_COMPATIBILITY_COPY.BACK_BUTTON,
    });

  const queryEmptyMessage = () =>
    screen.queryByText(
      EXTRA_COMPATIBILITY_COPY.UNITS_EMPTY
    );

  const toggleUnit = async (
    code: string
  ): Promise<void> => {
    await user.click(getUnitCheckbox(code));
  };

  const selectAll = async (): Promise<void> => {
    await user.click(getSelectAllButton());
  };

  const clearAll = async (): Promise<void> => {
    await user.click(getClearAllButton());
  };

  const save = async (): Promise<void> => {
    await user.click(getSaveButton());
  };

  const back = async (): Promise<void> => {
    await user.click(getBackButton());
  };

  return {
    back,
    clearAll,
    getInstruction,
    getSaveButton,
    getTitle,
    getUnitCheckbox,
    queryEmptyMessage,
    queryUnitWithStatus,
    save,
    selectAll,
    toggleUnit,
  };
};
