import type { E2E_BOARD_DEVICE_LAYOUT_TOUCH } from "../constants/E2eBoardDeviceLayout.constants";

export type E2eTouchEventType =
  (typeof E2E_BOARD_DEVICE_LAYOUT_TOUCH)[Exclude<
    keyof typeof E2E_BOARD_DEVICE_LAYOUT_TOUCH,
    "COMMAND"
  >];
