import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import { INPUT_TYPES } from "@/app/constants";
import { RESERVATION_SPLIT_FIELD_ID } from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitDepartureTimeFieldProps } from "../models/ReservationSplitDepartureTimeFieldProps.interface";
import {
  RESERVATION_SPLIT_TIME_FIELD_CLASS,
  RESERVATION_SPLIT_TIME_HINT_CLASS,
} from "../styles/ReservationSplitCards.styles";

const ReservationSplitDepartureTimeField = ({
  draft,
  error,
  viewModel,
}: ReservationSplitDepartureTimeFieldProps): React.JSX.Element => {
  const timeId = `${RESERVATION_SPLIT_FIELD_ID.TIME_PREFIX}${draft.key}`;

  return (
    <div>
      <FormField
        id={timeId}
        name={timeId}
        label={RESERVATION_SPLIT_UI_COPY.LABEL_START_TIME}
        type={INPUT_TYPES.TIME}
        classNameField={RESERVATION_SPLIT_TIME_FIELD_CLASS}
        value={draft.time}
        disabled={viewModel.isPending}
        onChange={(event) =>
          viewModel.setTime(draft.key, event.target.value)
        }
        error={error}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
      <Text className={RESERVATION_SPLIT_TIME_HINT_CLASS}>
        {RESERVATION_SPLIT_UI_COPY.TIME_ZONE}
      </Text>
      <Text className={RESERVATION_SPLIT_TIME_HINT_CLASS}>
        {RESERVATION_SPLIT_UI_COPY.SAME_DAY_HINT}
      </Text>
    </div>
  );
};

export default ReservationSplitDepartureTimeField;
