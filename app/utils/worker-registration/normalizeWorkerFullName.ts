import {
  STRING,
  WORKER_FULL_NAME_SPACES_PATTERN,
} from "@/app/constants";

export const normalizeWorkerFullName = (
  fullName: string
): string =>
  fullName
    .trim()
    .replace(WORKER_FULL_NAME_SPACES_PATTERN, STRING.SPACE);
