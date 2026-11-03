import { INPUT_TYPES } from "@/app/constants";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import {
  RESERVATION_FORM_FIELD_CLASS,
  RESERVATION_FORM_INPUT_CLASS,
} from "../styles/ReservationFormView.styles";
import ReservationUnitAvailabilityMessage from "./ReservationUnitAvailabilityMessage";

const ReservationUnitField = ({
  viewModel,
}: ReservationFormValuesProps): React.JSX.Element => {
  const options = viewModel.availableUnits.map((unit) => ({
    key: unit.id,
    label: unit.code,
    value: unit.id,
  }));

  return (
    <div className={RESERVATION_FORM_FIELD_CLASS}>
      <FormField
        id={RESERVATION_FORM_FIELD_ID.UNIT}
        name={RESERVATION_FORM_FIELD_ID.UNIT}
        label={RESERVATION_FORM_UI_COPY.UNIT}
        classNameField={RESERVATION_FORM_INPUT_CLASS}
        type={INPUT_TYPES.SELECT}
        value={viewModel.values.unitId}
        options={options}
        placeholder={
          RESERVATION_FORM_UI_COPY.UNIT_PLACEHOLDER
        }
        disabled={
          viewModel.isAvailabilityLoading ||
          viewModel.hasAvailabilityError ||
          options.length === 0
        }
        onChange={(event) =>
          viewModel.handleUnitChange(event.target.value)
        }
        error={viewModel.errors.unitId}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
      <ReservationUnitAvailabilityMessage
        viewModel={viewModel}
      />
    </div>
  );
};

export default ReservationUnitField;
