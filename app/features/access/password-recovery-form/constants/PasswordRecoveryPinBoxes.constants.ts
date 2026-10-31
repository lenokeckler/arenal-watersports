import { PASSWORD_RESET_PIN } from "@/app/constants";

export const PASSWORD_RECOVERY_PIN_BOX_POSITIONS: readonly number[] =
  Array.from(
    { length: PASSWORD_RESET_PIN.LENGTH },
    (_unused, position) => position
  );

export const PASSWORD_RECOVERY_PIN_BOXES_TEST_ID =
  "pin-boxes";
