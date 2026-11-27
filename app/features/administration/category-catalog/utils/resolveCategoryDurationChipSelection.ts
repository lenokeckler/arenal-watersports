import { STRING } from "@/app/constants";
import { CATEGORY_DURATION_PRESET_MINUTES } from "../constants/CategoryDurationPreset.constants";
import type { CategoryDurationChipSelection } from "../models/CategoryDurationChipSelection.interface";

export const resolveCategoryDurationChipSelection = (
  durationText: string,
  isOtherChosen: boolean
): CategoryDurationChipSelection => {
  const presetMinutes =
    CATEGORY_DURATION_PRESET_MINUTES.find(
      (minutes) =>
        minutes.toString() === durationText.trim()
    ) ?? null;
  const isOtherSelected =
    isOtherChosen ||
    (presetMinutes === null &&
      durationText.trim() !== STRING.Empty);

  return {
    selectedPresetMinutes: isOtherSelected
      ? null
      : presetMinutes,
    isOtherSelected,
  };
};
