import { BUTTON, INPUT_TYPES } from "@/app/constants";
import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import Text from "@/app/components/text/Text";
import {
  RESERVATION_DURATION_PRESETS,
  RESERVATION_FORM_FIELD_ID,
} from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import {
  RESERVATION_FORM_CUSTOM_DURATION_CLASS,
  RESERVATION_FORM_DURATION_GRID_CLASS,
  RESERVATION_FORM_FIELD_WIDE_CLASS,
  resolveReservationDurationButtonClassName,
} from "../styles/ReservationFormView.styles";

const ReservationDurationSelector = ({
  viewModel,
}: ReservationFormValuesProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_FIELD_WIDE_CLASS}>
    <Text bold>{RESERVATION_FORM_UI_COPY.DURATION}</Text>
    <div className={RESERVATION_FORM_DURATION_GRID_CLASS}>
      {RESERVATION_DURATION_PRESETS.map((preset) => (
        <Button
          key={preset.hours}
          type="button"
          variant={BUTTON.BASE}
          aria-pressed={
            viewModel.values.durationHours === preset.hours
          }
          className={resolveReservationDurationButtonClassName(
            viewModel.values.durationHours === preset.hours
          )}
          onClick={() =>
            viewModel.handleDurationChange(preset.hours)
          }
        >
          {preset.label}
        </Button>
      ))}
    </div>
    <div className={RESERVATION_FORM_CUSTOM_DURATION_CLASS}>
      <FormField
        id={RESERVATION_FORM_FIELD_ID.DURATION}
        name={RESERVATION_FORM_FIELD_ID.DURATION}
        label={RESERVATION_FORM_UI_COPY.CUSTOM_DURATION}
        type={INPUT_TYPES.NUMBER}
        value={String(viewModel.values.durationHours)}
        onChange={(event) =>
          viewModel.handleDurationChange(
            Number(event.target.value)
          )
        }
        error={viewModel.errors.durationHours}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
    </div>
  </div>
);

export default ReservationDurationSelector;
