import type { Locator } from "@playwright/test";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
  STRING,
} from "@/app/constants";

export const locateOriginBlock = (
  main: Locator,
  customerName: string,
  originCode: string
): Locator =>
  main
    .getByRole(ARIA_ROLE.GROUP, { name: customerName })
    .filter({
      hasText: [
        RESERVATIONS_CALENDAR_COPY.ORIGIN,
        originCode,
      ].join(STRING.SPACE),
    });
