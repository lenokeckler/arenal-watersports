import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardViewModel } from "../models/ExtraCardViewModel.interface";
import {
  EXTRA_REMOVAL_SHEET_BODY_CLASS,
  EXTRA_REMOVAL_SHEET_BUTTON_CLASS,
  EXTRA_REMOVAL_SHEET_NAME_CLASS,
  EXTRA_REMOVAL_SHEET_NOTE_CLASS,
  EXTRA_REMOVAL_SHEET_NOTE_ICON_CLASS,
} from "../styles/ExtraCardActions.styles";

const ExtraRemovalSheet = ({
  isActionLoading,
  name,
  onCancelClick,
  onConfirmRemovalClick,
}: Pick<
  ExtraCardViewModel,
  | "isActionLoading"
  | "name"
  | "onCancelClick"
  | "onConfirmRemovalClick"
>): React.JSX.Element => (
  <ActionSheet
    title={EXTRA_CATALOG_COPY.REMOVAL_SHEET_TITLE}
    onClose={onCancelClick}
  >
    <div className={EXTRA_REMOVAL_SHEET_BODY_CLASS}>
      <Text className={EXTRA_REMOVAL_SHEET_NAME_CLASS}>
        {name}
      </Text>
      <div className={EXTRA_REMOVAL_SHEET_NOTE_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.DELETE}
          className={EXTRA_REMOVAL_SHEET_NOTE_ICON_CLASS}
        />
        <Text>
          {EXTRA_CATALOG_COPY.REMOVAL_NEVER_USED_NOTE}
        </Text>
      </div>
      <div className={EXTRA_REMOVAL_SHEET_NOTE_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.HISTORY}
          className={EXTRA_REMOVAL_SHEET_NOTE_ICON_CLASS}
        />
        <Text>{EXTRA_CATALOG_COPY.REMOVAL_USED_NOTE}</Text>
      </div>
      <Button
        variant={BUTTON.DANGER}
        isLoading={isActionLoading}
        loadingText={
          EXTRA_CATALOG_COPY.LOADING_TEXT_DELETING
        }
        onClick={onConfirmRemovalClick}
        className={EXTRA_REMOVAL_SHEET_BUTTON_CLASS}
      >
        {EXTRA_CATALOG_COPY.REMOVE_BUTTON}
      </Button>
      <Button
        variant={BUTTON.SECONDARY}
        disabled={isActionLoading}
        onClick={onCancelClick}
        className={EXTRA_REMOVAL_SHEET_BUTTON_CLASS}
      >
        {EXTRA_CATALOG_COPY.CANCEL_BUTTON}
      </Button>
    </div>
  </ActionSheet>
);

export default ExtraRemovalSheet;
