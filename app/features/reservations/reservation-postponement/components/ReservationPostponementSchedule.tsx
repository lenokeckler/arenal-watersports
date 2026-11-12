import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY } from "../constants/ReservationPostponementFormCopy.constants";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import type { ReservationPostponementFormPartProps } from "../models/ReservationPostponementFormPartProps.interface";
import {
  RESERVATION_POSTPONEMENT_FIELD_CLASS,
  RESERVATION_POSTPONEMENT_HINT_CLASS,
  RESERVATION_POSTPONEMENT_SCHEDULE_CLASS,
} from "../styles/ReservationPostponementForm.styles";

const ReservationPostponementSchedule = ({
  viewModel,
}: ReservationPostponementFormPartProps): React.JSX.Element => (
  <div className={RESERVATION_POSTPONEMENT_SCHEDULE_CLASS}>
    <FormField
      id={RESERVATION_POSTPONEMENT_FIELD_ID.DATE}
      name={RESERVATION_POSTPONEMENT_FIELD_ID.DATE}
      label={
        RESERVATION_POSTPONEMENT_FORM_COPY.LABEL_NEW_DATE
      }
      type={INPUT_TYPES.DATE}
      classNameField={RESERVATION_POSTPONEMENT_FIELD_CLASS}
      value={viewModel.draft.date}
      disabled={viewModel.isPending}
      onChange={(event) =>
        viewModel.setDate(event.target.value)
      }
      error={viewModel.errors.date}
      showErrorText
      variant={FORM_FIELD_VARIANT.GLASS}
    />
    <div>
      <FormField
        id={RESERVATION_POSTPONEMENT_FIELD_ID.TIME}
        name={RESERVATION_POSTPONEMENT_FIELD_ID.TIME}
        label={
          RESERVATION_POSTPONEMENT_FORM_COPY.LABEL_NEW_TIME
        }
        type={INPUT_TYPES.TIME}
        classNameField={
          RESERVATION_POSTPONEMENT_FIELD_CLASS
        }
        value={viewModel.draft.time}
        disabled={viewModel.isPending}
        onChange={(event) =>
          viewModel.setTime(event.target.value)
        }
        error={viewModel.errors.time}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
      <Text className={RESERVATION_POSTPONEMENT_HINT_CLASS}>
        {RESERVATION_POSTPONEMENT_FORM_COPY.TIME_ZONE}
      </Text>
    </div>
  </div>
);

export default ReservationPostponementSchedule;
