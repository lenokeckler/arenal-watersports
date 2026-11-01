import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryBehaviorFormActionsProps } from "../models/CategoryBehaviorFormActionsProps.interface";
import {
  CATEGORY_CREATE_FORM_ACTION_BUTTON_CLASS,
  CATEGORY_CREATE_FORM_ACTIONS_CLASS,
} from "../styles/CategoryCreateFormActions.styles";

const CategoryBehaviorFormActions = ({
  isSubmitting,
  onBack,
}: CategoryBehaviorFormActionsProps): React.JSX.Element => (
  <div className={CATEGORY_CREATE_FORM_ACTIONS_CLASS}>
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onBack}
      className={CATEGORY_CREATE_FORM_ACTION_BUTTON_CLASS}
    >
      {CATEGORY_CATALOG_COPY.CANCEL_BUTTON}
    </Button>
    <Button
      variant={BUTTON.PRIMARY}
      type="submit"
      isLoading={isSubmitting}
      loadingText={
        CATEGORY_CATALOG_COPY.LOADING_TEXT_UPDATING
      }
      className={CATEGORY_CREATE_FORM_ACTION_BUTTON_CLASS}
    >
      {CATEGORY_CATALOG_COPY.BEHAVIOR_SUBMIT_BUTTON}
    </Button>
  </div>
);

export default CategoryBehaviorFormActions;
