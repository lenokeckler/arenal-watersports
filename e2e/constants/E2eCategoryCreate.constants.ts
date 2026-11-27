import { PATHS } from "@/app/constants";

export const E2E_CATEGORY_CREATE_SCREENSHOT_BASENAME =
  "us-adm-12-category-create";

export const E2E_UUID_SOURCE =
  "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

export const E2E_CATEGORY_CONFIGURE_URL_PATTERN =
  new RegExp(
    `${PATHS.ADMINISTRATION.CATEGORIES}/${E2E_UUID_SOURCE}$`
  );
