import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityUnitsHelpersProps } from "../models/ExtraCompatibilityUnitsHelpersProps.interface";
import {
  EXTRA_COMPATIBILITY_UNITS_HELPER_BUTTON_CLASS,
  EXTRA_COMPATIBILITY_UNITS_HELPERS_CLASS,
} from "../styles/ExtraCompatibilityUnits.styles";

const ExtraCompatibilityUnitsHelpers = ({
  isSubmitting,
  onClearAll,
  onSelectAll,
}: ExtraCompatibilityUnitsHelpersProps): React.JSX.Element => (
  <div className={EXTRA_COMPATIBILITY_UNITS_HELPERS_CLASS}>
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onSelectAll}
      className={
        EXTRA_COMPATIBILITY_UNITS_HELPER_BUTTON_CLASS
      }
    >
      {EXTRA_COMPATIBILITY_COPY.SELECT_ALL_BUTTON}
    </Button>
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onClearAll}
      className={
        EXTRA_COMPATIBILITY_UNITS_HELPER_BUTTON_CLASS
      }
    >
      {EXTRA_COMPATIBILITY_COPY.CLEAR_ALL_BUTTON}
    </Button>
  </div>
);

export default ExtraCompatibilityUnitsHelpers;
