import { INPUT_TYPES } from "@/app/constants";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import Text from "@/app/components/text/Text";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import {
  RESERVATION_FORM_FIELD_CLASS,
  RESERVATION_FORM_FIELD_WIDE_CLASS,
  RESERVATION_FORM_TIME_HINT_CLASS,
} from "../styles/ReservationFormView.styles";
import ReservationDurationSelector from "./ReservationDurationSelector";

const ReservationCustomerScheduleFields = ({
  viewModel,
}: ReservationFormValuesProps): React.JSX.Element => (
  <>
    <div className={RESERVATION_FORM_FIELD_WIDE_CLASS}>
      <FormField
        id={RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME}
        name={RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME}
        label={RESERVATION_FORM_UI_COPY.CUSTOMER_NAME}
        value={viewModel.values.customerName}
        onChange={(event) =>
          viewModel.handleCustomerNameChange(
            event.target.value
          )
        }
        error={viewModel.errors.customerName}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
    </div>
    <div className={RESERVATION_FORM_FIELD_CLASS}>
      <FormField
        id={RESERVATION_FORM_FIELD_ID.PEOPLE_COUNT}
        name={RESERVATION_FORM_FIELD_ID.PEOPLE_COUNT}
        label={RESERVATION_FORM_UI_COPY.PEOPLE_COUNT}
        type={INPUT_TYPES.NUMBER}
        value={String(viewModel.values.peopleCount)}
        onChange={(event) =>
          viewModel.handlePeopleCountChange(
            Number(event.target.value)
          )
        }
        error={viewModel.errors.peopleCount}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
    </div>
    <div className={RESERVATION_FORM_FIELD_CLASS}>
      <FormField
        id={RESERVATION_FORM_FIELD_ID.DATE}
        name={RESERVATION_FORM_FIELD_ID.DATE}
        label={RESERVATION_FORM_UI_COPY.DATE}
        type={INPUT_TYPES.DATE}
        value={viewModel.values.date}
        onChange={(event) =>
          viewModel.handleDateChange(event.target.value)
        }
        error={viewModel.errors.date}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
    </div>
    <div className={RESERVATION_FORM_FIELD_CLASS}>
      <FormField
        id={RESERVATION_FORM_FIELD_ID.TIME}
        name={RESERVATION_FORM_FIELD_ID.TIME}
        label={RESERVATION_FORM_UI_COPY.TIME}
        type={INPUT_TYPES.TIME}
        value={viewModel.values.time}
        onChange={(event) =>
          viewModel.handleTimeChange(event.target.value)
        }
        error={viewModel.errors.time}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
      <Text className={RESERVATION_FORM_TIME_HINT_CLASS}>
        {RESERVATION_FORM_UI_COPY.TIME_ZONE}
      </Text>
    </div>
    <ReservationDurationSelector viewModel={viewModel} />
  </>
);

export default ReservationCustomerScheduleFields;
