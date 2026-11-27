import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import type { ComboFormActionsProps } from "../models/ComboFormActionsProps.interface";
import {
  COMBO_FORM_ACTION_BUTTON_CLASS,
  COMBO_FORM_ACTIONS_CLASS,
} from "../styles/ComboForm.styles";

const ComboFormActions = ({
  isSubmitting,
  onBack,
}: ComboFormActionsProps): React.JSX.Element => (
  <div className={COMBO_FORM_ACTIONS_CLASS}>
    <Button
      variant={BUTTON.PRIMARY}
      type="submit"
      isLoading={isSubmitting}
      loadingText={COMBO_FORM_COPY.SAVING_TEXT}
      className={COMBO_FORM_ACTION_BUTTON_CLASS}
    >
      {COMBO_FORM_COPY.SAVE_BUTTON}
    </Button>
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onBack}
      className={COMBO_FORM_ACTION_BUTTON_CLASS}
    >
      {COMBO_FORM_COPY.BACK_BUTTON}
    </Button>
  </div>
);

export default ComboFormActions;
