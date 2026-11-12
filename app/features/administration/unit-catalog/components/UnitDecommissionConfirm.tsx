import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import Text from "@/app/components/text/Text";
import { BUTTON, INPUT_TYPES } from "@/app/constants";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import { UNIT_FORM_FIELD_ID } from "../constants/UnitFormFieldId.constants";
import type { UnitDecommissionConfirmProps } from "../models/UnitDecommissionConfirmProps.interface";
import { UNIT_DECOMMISSION_MESSAGE_CLASS } from "../styles/UnitDecommission.styles";
import {
  UNIT_FORM_ACTION_BUTTON_CLASS,
  UNIT_FORM_ACTIONS_CLASS,
} from "../styles/UnitForm.styles";

const UnitDecommissionConfirm = ({
  error,
  isSubmitting,
  reason,
  onCancelClick,
  onConfirmClick,
  onReasonChange,
}: UnitDecommissionConfirmProps): React.JSX.Element => (
  <>
    <Text className={UNIT_DECOMMISSION_MESSAGE_CLASS}>
      {UNIT_DECOMMISSION_COPY.CONFIRM_MESSAGE}
    </Text>
    <FormField
      id={UNIT_FORM_FIELD_ID.REASON}
      name={UNIT_FORM_FIELD_ID.REASON}
      label={UNIT_DECOMMISSION_COPY.REASON_LABEL}
      type={INPUT_TYPES.TEXTAREA}
      value={reason}
      onChange={onReasonChange}
      error={error}
      showErrorText
      disabled={isSubmitting}
      variant={FORM_FIELD_VARIANT.DEFAULT}
    />
    <div className={UNIT_FORM_ACTIONS_CLASS}>
      <Button
        variant={BUTTON.SECONDARY}
        type="button"
        disabled={isSubmitting}
        onClick={onCancelClick}
        className={UNIT_FORM_ACTION_BUTTON_CLASS}
      >
        {UNIT_DECOMMISSION_COPY.CANCEL_BUTTON}
      </Button>
      <Button
        variant={BUTTON.DANGER}
        type="button"
        isLoading={isSubmitting}
        loadingText={UNIT_DECOMMISSION_COPY.LOADING_TEXT}
        onClick={onConfirmClick}
        className={UNIT_FORM_ACTION_BUTTON_CLASS}
      >
        {UNIT_DECOMMISSION_COPY.CONFIRM_BUTTON}
      </Button>
    </div>
  </>
);

export default UnitDecommissionConfirm;
