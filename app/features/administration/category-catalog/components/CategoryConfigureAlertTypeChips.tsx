import Button from "@/app/components/button/Button";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { CATEGORY_CONFIGURE_ALERTS_ID } from "../constants/CategoryConfigureAlertsId.constants";
import type { CategoryConfigureAlertTypeChipsProps } from "../models/CategoryConfigureAlertTypeChipsProps.interface";
import {
  CATEGORY_CHIPS_GROUP_CLASS,
  resolveCategoryChipClassName,
} from "../styles/CategoryChips.styles";

const CategoryConfigureAlertTypeChips = ({
  choices,
  onSelectType,
}: CategoryConfigureAlertTypeChipsProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-labelledby={
      CATEGORY_CONFIGURE_ALERTS_ID.TYPE_LABEL
    }
    className={CATEGORY_CHIPS_GROUP_CLASS}
  >
    {choices.map(({ type, label, isSelected }) => (
      <Button
        key={type}
        variant={BUTTON.BASE}
        aria-pressed={isSelected}
        className={resolveCategoryChipClassName(isSelected)}
        onClick={() => onSelectType(type)}
      >
        {label}
      </Button>
    ))}
  </div>
);

export default CategoryConfigureAlertTypeChips;
