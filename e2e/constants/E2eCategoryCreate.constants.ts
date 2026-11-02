import { PATHS } from "@/app/constants";

export const E2E_CATEGORY_CREATE_SCREENSHOT_BASENAME =
  "us-adm-12-category-create";

export const E2E_CATEGORY_ALERTS_URL_PATTERN = new RegExp(
  `${PATHS.ADMINISTRATION.CATEGORIES}/[^/]+/${PATHS.ADMINISTRATION.CATEGORY_ALERTS_SEGMENT}$`
);
