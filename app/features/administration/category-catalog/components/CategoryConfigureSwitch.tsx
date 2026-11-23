import Button from "@/app/components/button/Button";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import type { CategoryConfigureSwitchProps } from "../models/CategoryConfigureSwitchProps.interface";
import {
  resolveCategoryConfigureSwitchKnobClassName,
  resolveCategoryConfigureSwitchTrackClassName,
} from "../styles/CategoryConfigureSwitch.styles";

const CategoryConfigureSwitch = ({
  ariaLabel,
  isChecked,
  isDisabled,
  onToggle,
}: CategoryConfigureSwitchProps): React.JSX.Element => (
  <Button
    variant={BUTTON.BASE}
    role={ARIA_ROLE.SWITCH}
    aria-checked={isChecked}
    aria-label={ariaLabel}
    disabled={isDisabled}
    onClick={onToggle}
    className={resolveCategoryConfigureSwitchTrackClassName(
      isChecked
    )}
  >
    <div
      aria-hidden="true"
      className={resolveCategoryConfigureSwitchKnobClassName(
        isChecked
      )}
    />
  </Button>
);

export default CategoryConfigureSwitch;
