import { CATEGORY_IMAGE } from "@/app/constants";
import { E2E_PROJECT } from "./E2eRuntime.constants";

export const E2E_CATEGORY_IMAGE = {
  CATEGORY_COLUMN: "image_path",
  CATEGORY_TABLE: "equipment_categories",
  ID_COLUMN: "id",
  PNG_BASE64:
    "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAbElEQVR4nBXCQREAQAgDsSqpEpSgBCVVgoh9o+jmMhESMirUaFDQohMWNi7ceHDw4hMlylRRTQ0VaqkTLdp00U0PHXrpEyPGTDHNDBNmmRMRMSnSZEjIkhMr1myxzQ4bdtkTv7nimhsu3HL3ANYVZoFF15JOAAAAAElFTkSuQmCC",
} as const;

export const E2E_CATEGORY_IMAGE_UPLOADED_CARD: Record<
  string,
  string
> = {
  [E2E_PROJECT.DEFAULT]: "Lancha",
  [E2E_PROJECT.MOBILE]: "Paddleboard",
};

export const E2E_CATEGORY_IMAGE_STATIC_CARD = {
  LABEL: "Cuadraciclo",
  SOURCE_PATTERN: /cuadraciclo\.webp/,
} as const;

export const E2E_CATEGORY_IMAGE_UPLOADED_SOURCE_PATTERN =
  new RegExp(CATEGORY_IMAGE.BUCKET);

export const E2E_CATEGORY_IMAGE_ERROR = {
  OPERATION_ADD: "add the E2E category image",
  OPERATION_REMOVE: "remove the E2E category image",
} as const;
