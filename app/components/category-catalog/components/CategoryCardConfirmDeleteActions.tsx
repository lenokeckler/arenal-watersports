import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { BUTTON } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalog.copy";
import type { CategoryCardConfirmDeleteActionsProps } from "../models/CategoryCardConfirmDeleteActionsProps.interface";
import {
  CATEGORY_CARD_ACTIONS_CONFIRM_BUTTON_CLASS,
  CATEGORY_CARD_ACTIONS_CONFIRM_BUTTON_ROW_CLASS,
  CATEGORY_CARD_ACTIONS_CONFIRM_CLASS,
  CATEGORY_CARD_ACTIONS_CONFIRM_MESSAGE_CLASS,
} from "../styles/CategoryCardActions.styles";

const CategoryCardConfirmDeleteActions = ({
  isActionLoading,
  onCancelClick,
  onConfirmDeleteClick,
}: CategoryCardConfirmDeleteActionsProps): React.JSX.Element => (
  <div className={CATEGORY_CARD_ACTIONS_CONFIRM_CLASS}>
    <Text
      className={
        CATEGORY_CARD_ACTIONS_CONFIRM_MESSAGE_CLASS
      }
    >
      {CATEGORY_CATALOG_COPY.DELETE_CONFIRM_MESSAGE}
    </Text>
    <div
      className={
        CATEGORY_CARD_ACTIONS_CONFIRM_BUTTON_ROW_CLASS
      }
    >
      <Button
        variant={BUTTON.SECONDARY}
        onClick={onCancelClick}
        className={
          CATEGORY_CARD_ACTIONS_CONFIRM_BUTTON_CLASS
        }
      >
        {CATEGORY_CATALOG_COPY.CANCEL_BUTTON}
      </Button>
      <Button
        variant={BUTTON.DANGER}
        isLoading={isActionLoading}
        loadingText={
          CATEGORY_CATALOG_COPY.LOADING_TEXT_DELETING
        }
        onClick={onConfirmDeleteClick}
        className={
          CATEGORY_CARD_ACTIONS_CONFIRM_BUTTON_CLASS
        }
      >
        {CATEGORY_CATALOG_COPY.DELETE_BUTTON}
      </Button>
    </div>
  </div>
);

export default CategoryCardConfirmDeleteActions;
