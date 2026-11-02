import { INPUT_TYPES } from "@/app/constants";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { ARIA_ROLE } from "@/app/constants";
import Text from "@/app/components/text/Text";
import {
  RESERVATION_FORM_FOCUS_TARGET,
  RESERVATION_FORM_FIELD_ID,
} from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import {
  RESERVATION_FORM_CUSTOM_DURATION_CLASS,
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_FIELD_WIDE_CLASS,
  RESERVATION_FORM_INPUT_CLASS,
} from "../styles/ReservationFormView.styles";
import ReservationDurationOptions from "./ReservationDurationOptions";

const ReservationDurationSelector = ({
  viewModel,
}: ReservationFormValuesProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_FIELD_WIDE_CLASS}>
    <div
      id={RESERVATION_FORM_FIELD_ID.DURATION_GROUP}
      tabIndex={RESERVATION_FORM_FOCUS_TARGET.TAB_INDEX}
    >
      <Text bold>{RESERVATION_FORM_UI_COPY.DURATION}</Text>
      <ReservationDurationOptions viewModel={viewModel} />
      {viewModel.isCustomDuration && (
        <div
          className={RESERVATION_FORM_CUSTOM_DURATION_CLASS}
        >
          <FormField
            id={RESERVATION_FORM_FIELD_ID.DURATION}
            name={RESERVATION_FORM_FIELD_ID.DURATION}
            label={RESERVATION_FORM_UI_COPY.CUSTOM_DURATION}
            classNameField={RESERVATION_FORM_INPUT_CLASS}
            type={INPUT_TYPES.NUMBER}
            value={viewModel.customDurationDraft}
            onChange={(event) =>
              viewModel.handleCustomDurationChange(
                event.target.value
              )
            }
            error={viewModel.errors.durationHours}
            showErrorText
            variant={FORM_FIELD_VARIANT.GLASS}
          />
        </div>
      )}
      {!viewModel.isCustomDuration &&
        viewModel.errors.durationHours && (
          <Text
            id={RESERVATION_FORM_FIELD_ID.DURATION_ERROR}
            role={ARIA_ROLE.ALERT}
            className={RESERVATION_FORM_ERROR_CLASS}
          >
            {viewModel.errors.durationHours}
          </Text>
        )}
    </div>
  </div>
);

export default ReservationDurationSelector;
