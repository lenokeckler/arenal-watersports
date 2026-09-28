import Button from "@/app/components/button/Button";
import { BUTTON, SIZE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalog.copy";
import type { CategoryCardActionsProps } from "../models/CategoryCardActionsProps.interface";
import { CATEGORY_CARD_ACTIONS_BUTTON_CLASS } from "../styles/CategoryCardActions.styles";

const CategoryCardActions = ({
  actionState,
  isActionLoading,
  onDeleteClick,
  onMarkInactiveClick,
}: CategoryCardActionsProps): NullableRef<React.JSX.Element> => {
  if (actionState === CATEGORY_CARD_ACTION_STATE.DELETE) {
    return (
      <Button
        variant={BUTTON.DANGER}
        size={SIZE.FULL}
        isLoading={isActionLoading}
        loadingText={
          CATEGORY_CATALOG_COPY.LOADING_TEXT_DELETING
        }
        onClick={onDeleteClick}
        className={CATEGORY_CARD_ACTIONS_BUTTON_CLASS}
      >
        {CATEGORY_CATALOG_COPY.DELETE_CATEGORY_BUTTON}
      </Button>
    );
  }

  if (
    actionState === CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE
  ) {
    return (
      <Button
        variant={BUTTON.SECONDARY}
        size={SIZE.FULL}
        isLoading={isActionLoading}
        loadingText={
          CATEGORY_CATALOG_COPY.LOADING_TEXT_UPDATING
        }
        onClick={onMarkInactiveClick}
        className={CATEGORY_CARD_ACTIONS_BUTTON_CLASS}
      >
        {CATEGORY_CATALOG_COPY.MARK_INACTIVE_BUTTON}
      </Button>
    );
  }

  return null;
};

export default CategoryCardActions;
