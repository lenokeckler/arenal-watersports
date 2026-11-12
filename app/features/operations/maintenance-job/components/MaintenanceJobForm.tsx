"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  MAINTENANCE_JOB_CURRENCY,
  MAINTENANCE_JOB_WORK_TYPE,
} from "../constants/MaintenanceJob.constants";
import {
  MAINTENANCE_JOB_COPY,
  MAINTENANCE_JOB_FIELD_ID,
} from "../constants/MaintenanceJobCopy.constants";
import { useMaintenanceJobForm } from "../hooks/useMaintenanceJobForm";
import type { MaintenanceJobFormInput } from "../models/MaintenanceJobFormInput.interface";
import {
  MAINTENANCE_JOB_COST_CLASS,
  MAINTENANCE_JOB_ERROR_CLASS,
  MAINTENANCE_JOB_FORM_CLASS,
  MAINTENANCE_JOB_NOTE_CLASS,
} from "../styles/MaintenanceJob.styles";

const WORK_TYPE_OPTIONS = Object.values(
  MAINTENANCE_JOB_WORK_TYPE
).map((workType) => ({
  key: workType,
  label: MAINTENANCE_JOB_COPY.WORK_TYPES[workType],
  value: workType,
}));

const CURRENCY_OPTIONS = Object.values(
  MAINTENANCE_JOB_CURRENCY
).map((currency) => ({
  key: currency,
  label: MAINTENANCE_JOB_COPY.CURRENCIES[currency],
  value: currency,
}));

const MaintenanceJobForm = (
  props: MaintenanceJobFormInput
): React.JSX.Element => {
  const form = useMaintenanceJobForm(props);
  const { draft, errors, selectedUnit } = form;

  return (
    <form
      className={MAINTENANCE_JOB_FORM_CLASS}
      onSubmit={form.handleSubmit}
    >
      <FormField
        id={MAINTENANCE_JOB_FIELD_ID.UNIT}
        name={MAINTENANCE_JOB_FIELD_ID.UNIT}
        label={MAINTENANCE_JOB_COPY.UNIT_LABEL}
        labelSuffix={STRING.Empty}
        placeholder={MAINTENANCE_JOB_COPY.UNIT_PLACEHOLDER}
        type={INPUT_TYPES.SELECT}
        value={draft.unitId}
        error={errors.unit ?? undefined}
        showErrorText
        onChange={form.handleChange("unitId")}
        options={props.units.map((unit) => ({
          key: unit.unitId,
          label: `${unit.code}${MAINTENANCE_JOB_COPY.UNIT_SEPARATOR}${unit.categoryName}`,
          value: unit.unitId,
        }))}
      />
      <FormField
        id={MAINTENANCE_JOB_FIELD_ID.WORK_TYPE}
        name={MAINTENANCE_JOB_FIELD_ID.WORK_TYPE}
        label={MAINTENANCE_JOB_COPY.WORK_TYPE_LABEL}
        labelSuffix={STRING.Empty}
        placeholder={
          MAINTENANCE_JOB_COPY.WORK_TYPE_PLACEHOLDER
        }
        type={INPUT_TYPES.SELECT}
        value={draft.workType}
        error={errors.workType ?? undefined}
        showErrorText
        onChange={form.handleChange("workType")}
        options={WORK_TYPE_OPTIONS}
      />
      <FormField
        id={MAINTENANCE_JOB_FIELD_ID.DATE}
        name={MAINTENANCE_JOB_FIELD_ID.DATE}
        label={MAINTENANCE_JOB_COPY.DATE_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.DATE}
        value={draft.performedAt}
        error={errors.date ?? undefined}
        showErrorText
        onChange={form.handleChange("performedAt")}
      />
      <FormField
        id={MAINTENANCE_JOB_FIELD_ID.DESCRIPTION}
        name={MAINTENANCE_JOB_FIELD_ID.DESCRIPTION}
        label={MAINTENANCE_JOB_COPY.DESCRIPTION_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TEXTAREA}
        value={draft.description}
        error={errors.description ?? undefined}
        showErrorText
        onChange={form.handleChange("description")}
      />
      {form.isOilChange && (
        <>
          <FormField
            id={MAINTENANCE_JOB_FIELD_ID.NEXT_OIL_CHANGE}
            name={MAINTENANCE_JOB_FIELD_ID.NEXT_OIL_CHANGE}
            label={
              MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_LABEL
            }
            labelSuffix={STRING.Empty}
            type={INPUT_TYPES.TEXT}
            inputMode={INPUT_MODE.DECIMAL}
            value={draft.nextOilChangeAt}
            error={errors.threshold ?? undefined}
            showErrorText
            onChange={form.handleChange("nextOilChangeAt")}
          />
          <Text className={MAINTENANCE_JOB_NOTE_CLASS}>
            {selectedUnit
              ? `${MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_HINT}${MAINTENANCE_JOB_COPY.ACCUMULATED_PREFIX}${selectedUnit.usageTotal}${selectedUnit.usageMetric === null ? STRING.Empty : MAINTENANCE_JOB_COPY.USAGE_UNIT[selectedUnit.usageMetric]}.`
              : MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_HINT}
          </Text>
        </>
      )}
      <div className={MAINTENANCE_JOB_COST_CLASS}>
        <FormField
          id={MAINTENANCE_JOB_FIELD_ID.COST}
          name={MAINTENANCE_JOB_FIELD_ID.COST}
          label={MAINTENANCE_JOB_COPY.COST_FIELD_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.DECIMAL}
          value={draft.costAmount}
          error={errors.cost ?? undefined}
          showErrorText
          onChange={form.handleChange("costAmount")}
        />
        <FormField
          id={MAINTENANCE_JOB_FIELD_ID.CURRENCY}
          name={MAINTENANCE_JOB_FIELD_ID.CURRENCY}
          label={MAINTENANCE_JOB_COPY.COST_CURRENCY_LABEL}
          labelSuffix={STRING.Empty}
          placeholder={
            MAINTENANCE_JOB_COPY.COST_CURRENCY_PLACEHOLDER
          }
          type={INPUT_TYPES.SELECT}
          value={draft.costCurrency}
          error={errors.currency ?? undefined}
          showErrorText
          onChange={form.handleChange("costCurrency")}
          options={CURRENCY_OPTIONS}
        />
      </div>
      <Text className={MAINTENANCE_JOB_NOTE_CLASS}>
        {MAINTENANCE_JOB_COPY.COST_HINT}
      </Text>
      <FormField
        id={MAINTENANCE_JOB_FIELD_ID.EXTERNAL}
        name={MAINTENANCE_JOB_FIELD_ID.EXTERNAL}
        label={MAINTENANCE_JOB_COPY.EXTERNAL_LABEL}
        value={MAINTENANCE_JOB_COPY.EXTERNAL_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.CHECKBOX}
        checked={draft.isExternal}
        onChange={form.handleExternalToggle}
      />
      {form.errorMessage && (
        <Text
          className={MAINTENANCE_JOB_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {form.errorMessage}
        </Text>
      )}
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.PRIMARY}
        isLoading={form.isSubmitting}
        loadingText={MAINTENANCE_JOB_COPY.SUBMITTING}
      >
        {MAINTENANCE_JOB_COPY.SUBMIT}
      </Button>
    </form>
  );
};

export default MaintenanceJobForm;
