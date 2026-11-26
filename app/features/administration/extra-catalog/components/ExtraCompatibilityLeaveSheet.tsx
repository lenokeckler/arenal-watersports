import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityBoatsViewModel } from "../models/ExtraCompatibilityBoatsViewModel.interface";
import {
  EXTRA_BOATS_BUTTON_CLASS,
  EXTRA_BOATS_SHEET_BODY_CLASS,
  EXTRA_BOATS_SHEET_TEXT_CLASS,
} from "../styles/ExtraCompatibilityBoats.styles";

const ExtraCompatibilityLeaveSheet = ({
  isSubmitting,
  onLeaveDiscard,
  onLeaveSave,
  onLeaveStay,
}: Pick<
  ExtraCompatibilityBoatsViewModel,
  | "isSubmitting"
  | "onLeaveDiscard"
  | "onLeaveSave"
  | "onLeaveStay"
>): React.JSX.Element => (
  <ActionSheet
    title={EXTRA_COMPATIBILITY_COPY.LEAVE_TITLE}
    onClose={onLeaveStay}
  >
    <div className={EXTRA_BOATS_SHEET_BODY_CLASS}>
      <Text className={EXTRA_BOATS_SHEET_TEXT_CLASS}>
        {EXTRA_COMPATIBILITY_COPY.LEAVE_BODY}
      </Text>
      <Button
        variant={BUTTON.PRIMARY}
        type={BUTTON_TYPES.BUTTON}
        isLoading={isSubmitting}
        loadingText={EXTRA_CATALOG_COPY.LOADING_TEXT_SAVING}
        onClick={onLeaveSave}
        className={EXTRA_BOATS_BUTTON_CLASS}
      >
        {EXTRA_COMPATIBILITY_COPY.LEAVE_SAVE_BUTTON}
      </Button>
      <Button
        variant={BUTTON.SECONDARY}
        type={BUTTON_TYPES.BUTTON}
        disabled={isSubmitting}
        onClick={onLeaveDiscard}
        className={EXTRA_BOATS_BUTTON_CLASS}
      >
        {EXTRA_COMPATIBILITY_COPY.LEAVE_DISCARD_BUTTON}
      </Button>
    </div>
  </ActionSheet>
);

export default ExtraCompatibilityLeaveSheet;
