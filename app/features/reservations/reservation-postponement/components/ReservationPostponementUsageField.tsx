import { useId } from "react";
import { FormField, Text } from "@/app/components";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as COPY } from "../constants/ReservationPostponementReadingsCopy.constants";
import type { ReservationPostponementReadingUnitProps } from "../models/ReservationPostponementReadingUnitProps.interface";
import { RESERVATION_POSTPONEMENT_HINT_CLASS } from "../styles/ReservationPostponementForm.styles";
import { RESERVATION_POSTPONEMENT_USAGE_FIELD_CLASS } from "../styles/ReservationPostponementReadings.styles";
import { formatReservationPostponementUsage } from "../utils/formatReservationPostponementUsage";
import { resolveReservationPostponementReadingFieldId } from "../utils/resolveReservationPostponementReadingFieldId";

const ReservationPostponementUsageField = ({
  unit,
  viewModel,
}: ReservationPostponementReadingUnitProps): React.JSX.Element | null => {
  const helperId = useId();

  if (unit.usageMetric === null) {
    return null;
  }

  const fieldId =
    resolveReservationPostponementReadingFieldId(
      unit.itemId,
      "usageIn"
    );
  const metric = unit.usageMetric;

  return (
    <div>
      <FormField
        id={fieldId}
        name={fieldId}
        label={COPY.USAGE_FIELD_LABEL(metric)}
        type={INPUT_TYPES.TEXT}
        inputMode={INPUT_MODE.DECIMAL}
        classNameField={
          RESERVATION_POSTPONEMENT_USAGE_FIELD_CLASS
        }
        value={
          viewModel.draft.readings[unit.itemId]?.usageIn ??
          STRING.Empty
        }
        disabled={viewModel.isPending}
        describedBy={helperId}
        onChange={(event) =>
          viewModel.setReading(
            unit.itemId,
            "usageIn",
            event.target.value
          )
        }
        error={
          viewModel.errors.readings[unit.itemId]?.usageIn
        }
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
      <Text
        id={helperId}
        className={RESERVATION_POSTPONEMENT_HINT_CLASS}
      >
        {COPY.USAGE_FLOOR(
          formatReservationPostponementUsage(
            unit.usageFloor ?? 0,
            metric
          )
        )}
      </Text>
    </div>
  );
};

export default ReservationPostponementUsageField;
