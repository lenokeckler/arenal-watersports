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

const ReservationQuantityField = ({
  viewModel,
}: ReservationFormValuesProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_FIELD_CLASS}>
    <FormField
      id={RESERVATION_FORM_FIELD_ID.QUANTITY}
      name={RESERVATION_FORM_FIELD_ID.QUANTITY}
      label={RESERVATION_FORM_UI_COPY.QUANTITY}
      classNameField={RESERVATION_FORM_INPUT_CLASS}
      type={INPUT_TYPES.NUMBER}
      value={String(viewModel.values.quantity)}
      onChange={(event) =>
        viewModel.handleQuantityChange(
          Number(event.target.value)
        )
      }
      error={viewModel.errors.quantity}
      showErrorText
      variant={FORM_FIELD_VARIANT.GLASS}
    />
  </div>
);

export default ReservationQuantityField;
