import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardConfirmRemovalActionsProps } from "../models/ExtraCardConfirmRemovalActionsProps.interface";
import {
  EXTRA_CARD_CONFIRM_BUTTON_CLASS,
  EXTRA_CARD_CONFIRM_BUTTON_ROW_CLASS,
  EXTRA_CARD_CONFIRM_CLASS,
  EXTRA_CARD_CONFIRM_MESSAGE_CLASS,
} from "../styles/ExtraCardActions.styles";

const ExtraCardConfirmRemovalActions = ({
  isActionLoading,
  onCancelClick,
  onConfirmRemovalClick,
}: ExtraCardConfirmRemovalActionsProps): React.JSX.Element => (
  <div className={EXTRA_CARD_CONFIRM_CLASS}>
    <Text className={EXTRA_CARD_CONFIRM_MESSAGE_CLASS}>
      {EXTRA_CATALOG_COPY.REMOVAL_CONFIRM_MESSAGE}
    </Text>
    <div className={EXTRA_CARD_CONFIRM_BUTTON_ROW_CLASS}>
      <Button
        variant={BUTTON.SECONDARY}
        disabled={isActionLoading}
        onClick={onCancelClick}
        className={EXTRA_CARD_CONFIRM_BUTTON_CLASS}
      >
        {EXTRA_CATALOG_COPY.CANCEL_BUTTON}
      </Button>
      <Button
        variant={BUTTON.DANGER}
        isLoading={isActionLoading}
        loadingText={
          EXTRA_CATALOG_COPY.LOADING_TEXT_DELETING
        }
        onClick={onConfirmRemovalClick}
        className={EXTRA_CARD_CONFIRM_BUTTON_CLASS}
      >
        {EXTRA_CATALOG_COPY.REMOVE_BUTTON}
      </Button>
    </div>
  </div>
);

export default ExtraCardConfirmRemovalActions;
