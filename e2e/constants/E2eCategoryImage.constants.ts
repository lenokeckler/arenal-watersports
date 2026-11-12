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
