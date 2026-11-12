import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_IMAGE_FORM_STATE } from "../constants/CategoryImageFormState.constants";
import type { CategoryImageFormActionsProps } from "../models/CategoryImageFormActionsProps.interface";
import {
  CATEGORY_IMAGE_ACTION_BUTTON_CLASS,
  CATEGORY_IMAGE_ACTIONS_CLASS,
} from "../styles/CategoryImage.styles";
import CategoryImageRemoveConfirmation from "./CategoryImageRemoveConfirmation";

const CategoryImageFormActions = ({
  formState,
  isConfirmingRemoval,
  isSubmitting,
  onBack,
  onCancelRemoval,
  onConfirmRemoval,
  onRequestRemoval,
  onSave,
}: CategoryImageFormActionsProps): React.JSX.Element => {
  if (isConfirmingRemoval) {
    return (
      <CategoryImageRemoveConfirmation
        isRemoving={isSubmitting}
        onCancel={onCancelRemoval}
        onConfirm={onConfirmRemoval}
      />
    );
  }

  return (
    <div className={CATEGORY_IMAGE_ACTIONS_CLASS}>
      {formState === CATEGORY_IMAGE_FORM_STATE.PICKED && (
        <Button
          variant={BUTTON.PRIMARY}
          type="button"
          isLoading={isSubmitting}
          loadingText={CATEGORY_IMAGE_COPY.SAVING_TEXT}
          onClick={onSave}
          className={CATEGORY_IMAGE_ACTION_BUTTON_CLASS}
        >
          {CATEGORY_IMAGE_COPY.SAVE_BUTTON}
        </Button>
      )}
      {formState === CATEGORY_IMAGE_FORM_STATE.SAVED && (
        <Button
          variant={BUTTON.DANGER}
          type="button"
          disabled={isSubmitting}
          onClick={onRequestRemoval}
          className={CATEGORY_IMAGE_ACTION_BUTTON_CLASS}
        >
          {CATEGORY_IMAGE_COPY.REMOVE_BUTTON}
        </Button>
      )}
      <Button
        variant={BUTTON.SECONDARY}
        type="button"
        disabled={isSubmitting}
        onClick={onBack}
        className={CATEGORY_IMAGE_ACTION_BUTTON_CLASS}
      >
        {CATEGORY_IMAGE_COPY.BACK_BUTTON}
      </Button>
    </div>
  );
};

export default CategoryImageFormActions;
