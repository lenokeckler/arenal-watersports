import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import { parseUsageMetric } from "../utils/parseUsageMetric";

const UNKNOWN_METRIC_TEXT = "furlongs";
const WRONG_CASE_METRIC_TEXT =
  USAGE_METRIC.KILOMETERS.toUpperCase();

describe("parseUsageMetric", () => {
  it.each(Object.values(USAGE_METRIC))(
    "returns %s as itself",
    (usageMetric) => {
      expect(parseUsageMetric(usageMetric)).toBe(
        usageMetric
      );
    }
  );

  it.each([
    STRING.Empty,
    UNKNOWN_METRIC_TEXT,
    WRONG_CASE_METRIC_TEXT,
  ])("returns null for the text %j", (metricText) => {
    expect(parseUsageMetric(metricText)).toBeNull();
  });
});
