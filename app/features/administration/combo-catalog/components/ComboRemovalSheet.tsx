import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import type { ComboRemovalSheetProps } from "../models/ComboRemovalSheetProps.interface";
import {
  COMBO_REMOVAL_SHEET_BODY_CLASS,
  COMBO_REMOVAL_SHEET_BUTTONS_CLASS,
} from "../styles/ComboCard.styles";
import { COMBO_LIST_BUTTON_CLASS } from "../styles/ComboList.styles";

const ComboRemovalSheet = ({
  onCancelClick,
  onConfirmClick,
}: ComboRemovalSheetProps): React.JSX.Element => (
  <ActionSheet
    title={COMBO_CATALOG_COPY.REMOVAL_SHEET_TITLE}
    onClose={onCancelClick}
  >
    <div className={COMBO_REMOVAL_SHEET_BODY_CLASS}>
      <Text>
        {COMBO_CATALOG_COPY.REMOVAL_CONFIRM_MESSAGE}
      </Text>
      <div className={COMBO_REMOVAL_SHEET_BUTTONS_CLASS}>
        <Button
          variant={BUTTON.SECONDARY}
          onClick={onCancelClick}
          className={COMBO_LIST_BUTTON_CLASS}
        >
          {COMBO_CATALOG_COPY.CANCEL_BUTTON}
        </Button>
        <Button
          variant={BUTTON.DANGER}
          onClick={onConfirmClick}
          className={COMBO_LIST_BUTTON_CLASS}
        >
          {COMBO_CATALOG_COPY.REMOVE_BUTTON}
        </Button>
      </div>
    </div>
  </ActionSheet>
);

export default ComboRemovalSheet;
