import { describe, expect, it } from "vitest";
import { CATEGORY_IMAGE_FILE_ISSUE } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { resolveCategoryImageIssueMessage } from "../utils/resolveCategoryImageIssueMessage";

describe("resolveCategoryImageIssueMessage", () => {
  it.each([
    [
      CATEGORY_IMAGE_FILE_ISSUE.EMPTY,
      CATEGORY_IMAGE_COPY.FILE_EMPTY_ERROR,
    ],
    [
      CATEGORY_IMAGE_FILE_ISSUE.TOO_LARGE,
      CATEGORY_IMAGE_COPY.FILE_TOO_LARGE_ERROR,
    ],
    [
      CATEGORY_IMAGE_FILE_ISSUE.UNSUPPORTED_TYPE,
      CATEGORY_IMAGE_COPY.FILE_UNSUPPORTED_TYPE_ERROR,
    ],
  ] as const)(
    "maps %s to its Spanish message",
    (issue, message) => {
      expect(resolveCategoryImageIssueMessage(issue)).toBe(
        message
      );
    }
  );
});
