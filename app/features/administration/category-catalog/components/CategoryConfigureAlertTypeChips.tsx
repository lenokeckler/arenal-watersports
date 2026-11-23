import Button from "@/app/components/button/Button";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigureAlertTypeChipsProps } from "../models/CategoryConfigureAlertTypeChipsProps.interface";
import {
  CATEGORY_DURATION_CHIPS_GROUP_CLASS,
  resolveCategoryDurationChipClassName,
} from "../styles/CategoryDurationChips.styles";

const CategoryConfigureAlertTypeChips = ({
  choices,
  onSelectType,
}: CategoryConfigureAlertTypeChipsProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={CATEGORY_CONFIGURE_COPY.ALERTS_TYPE_LABEL}
    className={CATEGORY_DURATION_CHIPS_GROUP_CLASS}
  >
    {choices.map(({ type, label, isSelected }) => (
      <Button
        key={type}
        variant={BUTTON.BASE}
        aria-pressed={isSelected}
        className={resolveCategoryDurationChipClassName(
          isSelected
        )}
        onClick={() => onSelectType(type)}
      >
        {label}
      </Button>
    ))}
  </div>
);

export default CategoryConfigureAlertTypeChips;
