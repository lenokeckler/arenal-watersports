import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  INPUT_TYPES,
  RESERVATION_HISTORY_FILTER_PARAM,
  STRING,
} from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
import { RESERVATION_HISTORY_TYPE_OPTIONS } from "../constants/ReservationHistoryTypeOptions.constants";
import type { ReservationHistorySelectFieldsProps } from "../models/ReservationHistorySelectFieldsProps.interface";
import {
  RESERVATION_HISTORY_FILTERS_SELECT_CLASS,
  RESERVATION_HISTORY_FILTERS_SELECT_SIZE_CLASS,
} from "../styles/ReservationHistoryFilters.styles";
import { buildReservationHistoryCategoryFilterOptions } from "../utils/buildReservationHistoryCategoryFilterOptions";

const ReservationHistorySelectFields = ({
  categoryOptions,
  onChange,
  values,
}: ReservationHistorySelectFieldsProps): React.JSX.Element => (
  <>
    <div
      className={RESERVATION_HISTORY_FILTERS_SELECT_CLASS}
    >
      <FormField
        id={RESERVATION_HISTORY_DOM_ID.TYPE}
        name={RESERVATION_HISTORY_FILTER_PARAM.TYPE}
        label={RESERVATION_HISTORY_COPY.FILTER_TYPE_LABEL}
        type={INPUT_TYPES.SELECT}
        variant={FORM_FIELD_VARIANT.GLASS}
        labelSuffix={STRING.Empty}
        selectSizeClassName={
          RESERVATION_HISTORY_FILTERS_SELECT_SIZE_CLASS
        }
        options={[...RESERVATION_HISTORY_TYPE_OPTIONS]}
        value={values.type}
        onChange={onChange}
      />
    </div>
    <div
      className={RESERVATION_HISTORY_FILTERS_SELECT_CLASS}
    >
      <FormField
        id={RESERVATION_HISTORY_DOM_ID.CATEGORY}
        name={RESERVATION_HISTORY_FILTER_PARAM.CATEGORY}
        label={RESERVATION_HISTORY_COPY.EQUIPMENT_LABEL}
        type={INPUT_TYPES.SELECT}
        variant={FORM_FIELD_VARIANT.GLASS}
        labelSuffix={STRING.Empty}
        selectSizeClassName={
          RESERVATION_HISTORY_FILTERS_SELECT_SIZE_CLASS
        }
        options={buildReservationHistoryCategoryFilterOptions(
          categoryOptions
        )}
        value={values.category}
        onChange={onChange}
      />
    </div>
  </>
);

export default ReservationHistorySelectFields;
