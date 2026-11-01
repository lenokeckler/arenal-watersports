import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  INPUT_TYPES,
  RESERVATION_HISTORY_FILTER_PARAM,
  STRING,
} from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
import type { ReservationHistoryDateFieldsProps } from "../models/ReservationHistoryDateFieldsProps.interface";

const ReservationHistoryDateFields = ({
  hasInvertedDateRange,
  onChange,
  values,
}: ReservationHistoryDateFieldsProps): React.JSX.Element => (
  <>
    <FormField
      id={RESERVATION_HISTORY_DOM_ID.FROM}
      name={RESERVATION_HISTORY_FILTER_PARAM.FROM}
      label={RESERVATION_HISTORY_COPY.FILTER_FROM_LABEL}
      type={INPUT_TYPES.DATE}
      variant={FORM_FIELD_VARIANT.GLASS}
      labelSuffix={STRING.Empty}
      value={values.from}
      onChange={onChange}
    />
    <FormField
      id={RESERVATION_HISTORY_DOM_ID.TO}
      name={RESERVATION_HISTORY_FILTER_PARAM.TO}
      label={RESERVATION_HISTORY_COPY.FILTER_TO_LABEL}
      type={INPUT_TYPES.DATE}
      variant={FORM_FIELD_VARIANT.GLASS}
      labelSuffix={STRING.Empty}
      value={values.to}
      onChange={onChange}
      error={
        hasInvertedDateRange
          ? RESERVATION_HISTORY_COPY.FILTER_DATE_RANGE_ERROR
          : undefined
      }
      showErrorText
    />
  </>
);

export default ReservationHistoryDateFields;
