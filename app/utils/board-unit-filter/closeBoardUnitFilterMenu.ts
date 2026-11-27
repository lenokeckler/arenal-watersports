import { BOARD_UNIT_FILTER_MENU_ID } from "@/app/constants";

export const closeBoardUnitFilterMenu = (): void => {
  document
    .getElementById(BOARD_UNIT_FILTER_MENU_ID)
    ?.hidePopover();
};
