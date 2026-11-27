import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Text from "@/app/components/text/Text";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityBoatsViewModel } from "../models/ExtraCompatibilityBoatsViewModel.interface";
import {
  EXTRA_BOATS_BAR_BUTTONS_CLASS,
  EXTRA_BOATS_BAR_CLASS,
  EXTRA_BOATS_BUTTON_CLASS,
  EXTRA_BOATS_DIRTY_CLASS,
  EXTRA_BOATS_DIRTY_ICON_CLASS,
} from "../styles/ExtraCompatibilityBoats.styles";

const ExtraCompatibilityBoatsBar = ({
  dirtyLabel,
  isSubmitting,
  onBack,
  onSave,
}: Pick<
  ExtraCompatibilityBoatsViewModel,
  "dirtyLabel" | "isSubmitting" | "onBack" | "onSave"
>): React.JSX.Element => (
  <div className={EXTRA_BOATS_BAR_CLASS}>
    {dirtyLabel ? (
      <div className={EXTRA_BOATS_DIRTY_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.INFO}
          className={EXTRA_BOATS_DIRTY_ICON_CLASS}
        />
        <Text>{dirtyLabel}</Text>
      </div>
    ) : null}
    <div className={EXTRA_BOATS_BAR_BUTTONS_CLASS}>
      <Button
        variant={BUTTON.PRIMARY}
        type={BUTTON_TYPES.BUTTON}
        disabled={!dirtyLabel}
        isLoading={isSubmitting}
        loadingText={EXTRA_CATALOG_COPY.LOADING_TEXT_SAVING}
        onClick={onSave}
        className={EXTRA_BOATS_BUTTON_CLASS}
      >
        {EXTRA_COMPATIBILITY_COPY.SAVE_BUTTON}
      </Button>
      <Button
        variant={BUTTON.SECONDARY}
        type={BUTTON_TYPES.BUTTON}
        disabled={isSubmitting}
        onClick={onBack}
        className={EXTRA_BOATS_BUTTON_CLASS}
      >
        {EXTRA_COMPATIBILITY_COPY.BACK_BUTTON}
      </Button>
    </div>
  </div>
);

export default ExtraCompatibilityBoatsBar;
