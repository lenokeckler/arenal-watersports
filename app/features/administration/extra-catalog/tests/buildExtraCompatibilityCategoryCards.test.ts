import { describe, expect, it } from "vitest";
import { buildExtraCompatibilityCategoryCards } from "../utils/buildExtraCompatibilityCategoryCards";
import { buildExtraCompatibilityProgressLabel } from "../utils/buildExtraCompatibilityProgressLabel";
import { resolveExtraCompatibilityCategoryPath } from "../utils/resolveExtraCompatibilityCategoryPath";
import {
  COMPATIBILITY_CATEGORY_SUMMARY,
  COMPATIBILITY_EXTRA_ID,
  SINGLE_UNIT_CATEGORY_SUMMARY,
} from "./ExtraCompatibility.constants";

describe("buildExtraCompatibilityCategoryCards", () => {
  it("builds one card per category linking to its units screen", () => {
    const cards = buildExtraCompatibilityCategoryCards(
      COMPATIBILITY_EXTRA_ID,
      [
        COMPATIBILITY_CATEGORY_SUMMARY,
        SINGLE_UNIT_CATEGORY_SUMMARY,
      ]
    );

    expect(cards).toStrictEqual(
      [
        COMPATIBILITY_CATEGORY_SUMMARY,
        SINGLE_UNIT_CATEGORY_SUMMARY,
      ].map((category) => ({
        href: resolveExtraCompatibilityCategoryPath(
          COMPATIBILITY_EXTRA_ID,
          category.id
        ),
        id: category.id,
        name: category.name,
        progressLabel: buildExtraCompatibilityProgressLabel(
          category.linkedUnitCount,
          category.unitCount
        ),
      }))
    );
  });

  it("builds no card when there are no categories", () => {
    expect(
      buildExtraCompatibilityCategoryCards(
        COMPATIBILITY_EXTRA_ID,
        []
      )
    ).toStrictEqual([]);
  });
});
