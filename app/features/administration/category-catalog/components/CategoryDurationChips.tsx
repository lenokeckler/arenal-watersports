import Button from "@/app/components/button/Button";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_DURATION_PRESET_MINUTES } from "../constants/CategoryDurationPreset.constants";
import { formatCategoryDurationLabel } from "../utils/formatCategoryDurationLabel";
import type { CategoryDurationChipsProps } from "../models/CategoryDurationChipsProps.interface";
import {
  CATEGORY_CHIPS_GROUP_CLASS,
  resolveCategoryChipClassName,
} from "../styles/CategoryChips.styles";

const CategoryDurationChips = ({
  selectedPresetMinutes,
  isOtherSelected,
  onSelectPreset,
  onSelectOther,
}: CategoryDurationChipsProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={CATEGORY_CONFIGURE_COPY.DURATION_LABEL}
    className={CATEGORY_CHIPS_GROUP_CLASS}
  >
    {CATEGORY_DURATION_PRESET_MINUTES.map((minutes) => {
      const isSelected = selectedPresetMinutes === minutes;

      return (
        <Button
          key={minutes}
          variant={BUTTON.BASE}
          aria-pressed={isSelected}
          className={resolveCategoryChipClassName(
            isSelected
          )}
          onClick={() => onSelectPreset(minutes)}
        >
          {formatCategoryDurationLabel(minutes)}
        </Button>
      );
    })}
    <Button
      variant={BUTTON.BASE}
      aria-pressed={isOtherSelected}
      className={resolveCategoryChipClassName(
        isOtherSelected
      )}
      onClick={onSelectOther}
    >
      {CATEGORY_CONFIGURE_COPY.DURATION_OTHER}
    </Button>
  </div>
);

export default CategoryDurationChips;
