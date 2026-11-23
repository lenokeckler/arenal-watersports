import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON, BUTTON_TYPES } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigureLeaveSheetProps } from "../models/CategoryConfigureLeaveSheetProps.interface";
import { CATEGORY_CONFIGURE_BODY_CLASS } from "../styles/CategoryConfigureBody.styles";
import {
  CATEGORY_CONFIGURE_DELETE_SHEET_BUTTON_CLASS,
  CATEGORY_CONFIGURE_DELETE_SHEET_TEXT_CLASS,
} from "../styles/CategoryConfigureDelete.styles";

const CategoryConfigureLeaveSheet = ({
  body,
  isSaving,
  onSaveAndLeave,
  onDiscard,
  onCancel,
}: CategoryConfigureLeaveSheetProps): React.JSX.Element => (
  <ActionSheet
    title={CATEGORY_CONFIGURE_COPY.LEAVE_TITLE}
    onClose={onCancel}
  >
    <div className={CATEGORY_CONFIGURE_BODY_CLASS}>
      <Text
        className={
          CATEGORY_CONFIGURE_DELETE_SHEET_TEXT_CLASS
        }
      >
        {body}
      </Text>
      <Button
        variant={BUTTON.PRIMARY}
        type={BUTTON_TYPES.BUTTON}
        isLoading={isSaving}
        onClick={onSaveAndLeave}
        className={
          CATEGORY_CONFIGURE_DELETE_SHEET_BUTTON_CLASS
        }
      >
        {CATEGORY_CONFIGURE_COPY.LEAVE_SAVE}
      </Button>
      <Button
        variant={BUTTON.SECONDARY}
        type={BUTTON_TYPES.BUTTON}
        disabled={isSaving}
        onClick={onDiscard}
        className={
          CATEGORY_CONFIGURE_DELETE_SHEET_BUTTON_CLASS
        }
      >
        {CATEGORY_CONFIGURE_COPY.LEAVE_DISCARD}
      </Button>
      <Button
        variant={BUTTON.CANCEL}
        type={BUTTON_TYPES.BUTTON}
        disabled={isSaving}
        onClick={onCancel}
        className={
          CATEGORY_CONFIGURE_DELETE_SHEET_BUTTON_CLASS
        }
      >
        {CATEGORY_CONFIGURE_COPY.CANCEL}
      </Button>
    </div>
  </ActionSheet>
);

export default CategoryConfigureLeaveSheet;
