import { EQUIPMENT_BOARD_COPY } from "@/app/features/board/equipment-board/constants/EquipmentBoardCopy.constants";

export const E2E_HOME_COPY = {
  PAGE_TITLE: EQUIPMENT_BOARD_COPY.METADATA_TITLE,
  HEADING: EQUIPMENT_BOARD_COPY.PAGE_TITLE,
} as const;

export const E2E_HOME_SCREENSHOT_BASENAME = "01-home";
