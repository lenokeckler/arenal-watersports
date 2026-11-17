import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityUnitsActionsProps } from "../models/ExtraCompatibilityUnitsActionsProps.interface";
import {
  EXTRA_COMPATIBILITY_UNITS_ACTION_BUTTON_CLASS,
  EXTRA_COMPATIBILITY_UNITS_ACTIONS_CLASS,
} from "../styles/ExtraCompatibilityUnits.styles";

const ExtraCompatibilityUnitsActions = ({
  hasChanges,
  isSubmitting,
  onBack,
}: ExtraCompatibilityUnitsActionsProps): React.JSX.Element => (
  <div className={EXTRA_COMPATIBILITY_UNITS_ACTIONS_CLASS}>
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onBack}
      className={
        EXTRA_COMPATIBILITY_UNITS_ACTION_BUTTON_CLASS
      }
    >
      {EXTRA_COMPATIBILITY_COPY.BACK_BUTTON}
    </Button>
    <Button
      variant={BUTTON.PRIMARY}
      type="submit"
      disabled={!hasChanges}
      isLoading={isSubmitting}
      loadingText={EXTRA_CATALOG_COPY.LOADING_TEXT_SAVING}
      className={
        EXTRA_COMPATIBILITY_UNITS_ACTION_BUTTON_CLASS
      }
    >
      {EXTRA_COMPATIBILITY_COPY.SAVE_BUTTON}
    </Button>
  </div>
);

export default ExtraCompatibilityUnitsActions;
