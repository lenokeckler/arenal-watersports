import { describe, expect, it } from "vitest";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import { resolveRetentionReason } from "../utils/resolveRetentionReason";
import {
  BLANK_REASONS,
  MULTILINE_REASON,
  REAL_REASON,
} from "./DepositsReport.constants";

describe("resolveRetentionReason", () => {
  it.each(BLANK_REASONS)(
    "returns the fallback copy for the blank reason %j",
    (reason) => {
      expect(resolveRetentionReason(reason)).toBe(
        DEPOSITS_REPORT_COPY.NO_REASON
      );
    }
  );

  it("returns a real reason unchanged", () => {
    expect(resolveRetentionReason(REAL_REASON)).toBe(
      REAL_REASON
    );
  });

  it("keeps the inner line breaks of a multi-line reason", () => {
    expect(resolveRetentionReason(MULTILINE_REASON)).toBe(
      MULTILINE_REASON
    );
  });
});
