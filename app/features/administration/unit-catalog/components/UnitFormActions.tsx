import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { UNIT_FORM_SUBMIT_LABEL } from "../constants/UnitFormModeCopy.constants";
import type { UnitFormActionsProps } from "../models/UnitFormActionsProps.interface";
import {
  UNIT_FORM_ACTION_BUTTON_CLASS,
  UNIT_FORM_ACTIONS_CLASS,
} from "../styles/UnitForm.styles";

const UnitFormActions = ({
  mode,
  isSubmitting,
  isReadOnly,
  onBack,
}: UnitFormActionsProps): React.JSX.Element => (
  <div className={UNIT_FORM_ACTIONS_CLASS}>
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onBack}
      className={UNIT_FORM_ACTION_BUTTON_CLASS}
    >
      {isReadOnly
        ? UNIT_FORM_COPY.BACK_BUTTON
        : UNIT_FORM_COPY.CANCEL_BUTTON}
    </Button>
    {!isReadOnly && (
      <Button
        variant={BUTTON.PRIMARY}
        type="submit"
        isLoading={isSubmitting}
        loadingText={UNIT_FORM_COPY.LOADING_TEXT}
        className={UNIT_FORM_ACTION_BUTTON_CLASS}
      >
        {UNIT_FORM_SUBMIT_LABEL[mode]}
      </Button>
    )}
  </div>
);

export default UnitFormActions;
