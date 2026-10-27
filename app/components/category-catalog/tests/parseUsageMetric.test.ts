import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import { parseUsageMetric } from "../utils/parseUsageMetric";
import { UNKNOWN_USAGE_METRIC_TEXT } from "./CategoryBehaviorFormRules.constants";

const WRONG_CASE_METRIC_TEXT =
  USAGE_METRIC.KILOMETERS.toUpperCase();
const INHERITED_PROPERTY_TEXTS = [
  "constructor",
  "toString",
  "__proto__",
  "hasOwnProperty",
];

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
    UNKNOWN_USAGE_METRIC_TEXT,
    WRONG_CASE_METRIC_TEXT,
    ...INHERITED_PROPERTY_TEXTS,
  ])("returns null for the text %j", (metricText) => {
    expect(parseUsageMetric(metricText)).toBeNull();
  });
});
