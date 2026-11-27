import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { resolveCategoryDurationChipSelection } from "../utils/resolveCategoryDurationChipSelection";

describe("resolveCategoryDurationChipSelection", () => {
  it.each([
    {
      scenario: "a preset duration",
      text: "90",
      isOtherChosen: false,
      expected: {
        selectedPresetMinutes: 90,
        isOtherSelected: false,
      },
    },
    {
      scenario: "a duration outside the presets",
      text: "45",
      isOtherChosen: false,
      expected: {
        selectedPresetMinutes: null,
        isOtherSelected: true,
      },
    },
    {
      scenario: "an empty duration",
      text: STRING.Empty,
      isOtherChosen: false,
      expected: {
        selectedPresetMinutes: null,
        isOtherSelected: false,
      },
    },
    {
      scenario: "Otra chosen over a preset value",
      text: "60",
      isOtherChosen: true,
      expected: {
        selectedPresetMinutes: null,
        isOtherSelected: true,
      },
    },
  ])(
    "resolves $scenario",
    ({ text, isOtherChosen, expected }) => {
      expect(
        resolveCategoryDurationChipSelection(
          text,
          isOtherChosen
        )
      ).toEqual(expected);
    }
  );
});
