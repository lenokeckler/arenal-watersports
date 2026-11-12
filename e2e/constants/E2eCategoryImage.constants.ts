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

export const E2E_CATEGORY_IMAGE_BASE_NAME =
  "E2E Fixture — Imagen";

export const resolveCategoryImageFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_CATEGORY_IMAGE_BASE_NAME} (${projectName} · ${scenario})`;

const TINY_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAIAAADRv8uKAAAAKklEQVR4nO3NMQ0AAAgDsMlB9qQiA44m/ZtpT0QsFovFYrFYLBaLxX/jBbUyl9u8cQ7BAAAAAElFTkSuQmCC";

const BASE64_ENCODING = "base64";

export const E2E_CATEGORY_IMAGE_FILE = {
  PNG: {
    buffer: Buffer.from(TINY_PNG_BASE64, BASE64_ENCODING),
    mimeType: "image/png",
    name: "kayak.png",
  },
  TEXT: {
    buffer: Buffer.from("not an image"),
    mimeType: "text/plain",
    name: "notes.txt",
  },
} as const;
