import {
  fireEvent,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { BOARD_LAYOUT_COPY } from "../constants/BoardLayoutCopy.constants";
import {
  POINTER_ID,
  ROW_CENTER_OFFSET,
  ROW_HEIGHT,
} from "./BoardLayoutControls.constants";

export const createBoardLayoutControlsPage = () => {
  const user = userEvent.setup();

  const queryControls = () =>
    screen.queryByRole(ARIA_ROLE.GROUP, {
      name: BOARD_LAYOUT_COPY.SECTION_LABEL,
    });

  const getOrderList = () =>
    screen.getByRole(ARIA_ROLE.LIST, {
      name: BOARD_LAYOUT_COPY.ORDER_LABEL,
    });

  const getRows = () =>
    within(getOrderList()).getAllByRole(ARIA_ROLE.LISTITEM);

  const getOrderedLabels = () =>
    getRows().map(
      (row) => row.firstElementChild?.textContent
    );

  const getColumnsButton = (columns: number) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: BOARD_LAYOUT_COPY.COLUMNS_OPTION_ARIA(columns),
    });

  const getHandle = (label: string) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: BOARD_LAYOUT_COPY.MOVE_HANDLE(label),
    });

  const chooseColumns = async (columns: number) => {
    await user.click(getColumnsButton(columns));
  };

  const pressKeyOnHandle = async (
    label: string,
    key: string
  ) => {
    getHandle(label).focus();
    await user.keyboard(`{${key}}`);
  };

  const layOutRows = () => {
    getRows().forEach((row, index) => {
      row.getBoundingClientRect = () =>
        ({
          bottom: (index + 1) * ROW_HEIGHT,
          top: index * ROW_HEIGHT,
        }) as DOMRect;
    });
  };

  const pressHandle = (label: string, button?: number) => {
    fireEvent.pointerDown(getHandle(label), {
      button,
      pointerId: POINTER_ID,
    });
  };

  const dragHandleToRow = (
    label: string,
    rowIndex: number
  ) => {
    fireEvent.pointerMove(getHandle(label), {
      clientY: rowIndex * ROW_HEIGHT + ROW_CENTER_OFFSET,
      pointerId: POINTER_ID,
    });
  };

  const loseHandleCapture = (label: string) => {
    fireEvent.lostPointerCapture(getHandle(label), {
      pointerId: POINTER_ID,
    });
  };

  const releaseHandle = (label: string) => {
    fireEvent.pointerUp(getHandle(label), {
      pointerId: POINTER_ID,
    });
  };

  return {
    chooseColumns,
    dragHandleToRow,
    getColumnsButton,
    getHandle,
    getOrderedLabels,
    layOutRows,
    loseHandleCapture,
    pressHandle,
    pressKeyOnHandle,
    queryControls,
    releaseHandle,
  };
};
