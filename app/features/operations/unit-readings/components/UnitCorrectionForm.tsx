"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import FormField from "@/app/components/form-field/FormField";
import FuelGauge from "@/app/components/fuel-gauge/FuelGauge";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  UNIT_CORRECTION_COPY,
  UNIT_CORRECTION_FIELD_ID,
} from "../constants/UnitCorrectionCopy.constants";
import { UNIT_READINGS_STATUS } from "../constants/UnitReadings.constants";
import { UNIT_READINGS_COPY } from "../constants/UnitReadingsCopy.constants";
import { useUnitCorrectionForm } from "../hooks/useUnitCorrectionForm";
import type { UnitCorrectionFormProps } from "../models/UnitCorrectionFormProps.interface";
import {
  UNIT_CORRECTION_ERROR_CLASS,
  UNIT_CORRECTION_FORM_CLASS,
  UNIT_CORRECTION_NOTE_CLASS,
} from "../styles/UnitReadings.styles";

const STATUS_OPTIONS = Object.values(
  UNIT_READINGS_STATUS
).map((status) => ({
  key: status,
  label: UNIT_READINGS_COPY.STATUS[status],
  value: status,
}));

const UnitCorrectionForm = (
  props: UnitCorrectionFormProps
): React.JSX.Element => {
  const form = useUnitCorrectionForm(props);
  const { draft, errors } = form;
  const { unit } = props;

  return (
    <form
      className={UNIT_CORRECTION_FORM_CLASS}
      onSubmit={form.handleSubmit}
    >
      <Text className={UNIT_CORRECTION_NOTE_CLASS}>
        {`${unit.code}${UNIT_READINGS_COPY.UNIT_SEPARATOR}${unit.categoryName}`}
      </Text>
      <FuelGauge
        level={form.gaugeLevel}
        max={form.gaugeMax}
        onSelectLevel={form.handleSelectLevel}
      />
      <FormField
        id={UNIT_CORRECTION_FIELD_ID.FUEL_LEVEL}
        name={UNIT_CORRECTION_FIELD_ID.FUEL_LEVEL}
        label={UNIT_CORRECTION_COPY.FUEL_LEVEL_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TEXT}
        inputMode={INPUT_MODE.NUMERIC}
        value={draft.fuelLevel}
        error={errors.fuelLevel ?? undefined}
        showErrorText
        onChange={form.handleChange("fuelLevel")}
      />
      <FormField
        id={UNIT_CORRECTION_FIELD_ID.FUEL_MAX}
        name={UNIT_CORRECTION_FIELD_ID.FUEL_MAX}
        label={UNIT_CORRECTION_COPY.FUEL_MAX_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TEXT}
        inputMode={INPUT_MODE.NUMERIC}
        value={draft.fuelMax}
        error={errors.fuelMax ?? undefined}
        showErrorText
        onChange={form.handleChange("fuelMax")}
      />
      <FormField
        id={UNIT_CORRECTION_FIELD_ID.USAGE}
        name={UNIT_CORRECTION_FIELD_ID.USAGE}
        label={
          unit.usageMetric === null
            ? UNIT_CORRECTION_COPY.USAGE_LABEL_NONE
            : UNIT_CORRECTION_COPY.USAGE_LABEL[
                unit.usageMetric
              ]
        }
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TEXT}
        inputMode={INPUT_MODE.DECIMAL}
        value={draft.usageTotal}
        error={errors.usageTotal ?? undefined}
        showErrorText
        onChange={form.handleChange("usageTotal")}
      />
      <FormField
        id={UNIT_CORRECTION_FIELD_ID.IMPACTS}
        name={UNIT_CORRECTION_FIELD_ID.IMPACTS}
        label={UNIT_CORRECTION_COPY.IMPACTS_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TEXT}
        inputMode={INPUT_MODE.NUMERIC}
        value={draft.impactCount}
        error={errors.impactCount ?? undefined}
        showErrorText
        onChange={form.handleChange("impactCount")}
      />
      <FormField
        id={UNIT_CORRECTION_FIELD_ID.STATUS}
        name={UNIT_CORRECTION_FIELD_ID.STATUS}
        label={UNIT_CORRECTION_COPY.STATUS_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.SELECT}
        value={draft.status}
        onChange={form.handleChange("status")}
        options={STATUS_OPTIONS}
      />
      {form.errorMessage && (
        <Text
          className={UNIT_CORRECTION_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {form.errorMessage}
        </Text>
      )}
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.PRIMARY}
        isLoading={form.isSubmitting}
        loadingText={UNIT_CORRECTION_COPY.SUBMITTING}
      >
        {UNIT_CORRECTION_COPY.SUBMIT}
      </Button>
    </form>
  );
};

export default UnitCorrectionForm;
