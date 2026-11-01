"use client";

import FormField from "@/app/components/form-field/FormField";
import { INPUT_TYPES } from "@/app/constants";
import { DAMAGE_REPORT_CAUSES } from "../constants/DamageReportCause.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportFormViewModel } from "../models/DamageReportFormViewModel.interface";
import Button from "@/app/components/button/Button";
import {
  BUTTON,
  SIZE,
} from "@/app/components/button/constants";
import {
  DAMAGE_REPORT_ACTIONS_CLASS,
  DAMAGE_REPORT_FIELDS_CLASS,
  DAMAGE_REPORT_FORM_CLASS,
  DAMAGE_REPORT_ERROR_CLASS,
  DAMAGE_REPORT_SUCCESS_CLASS,
} from "../styles/DamageReportForm.styles";

interface DamageReportFormProps {
  viewModel: DamageReportFormViewModel;
}

const DamageReportForm = ({
  viewModel,
}: DamageReportFormProps) => {
  const {
    handleCauseChange,
    handleDescriptionChange,
    handleImpactDeltaChange,
    handleSubmit,
    handleUnitChange,
    isSubmitting,
    submissionError,
    submissionSuccess,
    units,
    values,
  } = viewModel;

  return (
    <form
      className={DAMAGE_REPORT_FORM_CLASS}
      onSubmit={handleSubmit}
    >
      <div className={DAMAGE_REPORT_FIELDS_CLASS}>
        <FormField
          id="damage-report-unit"
          name="unitId"
          label={DAMAGE_REPORT_COPY.UNIT_LABEL}
          value={values.unitId}
          placeholder={DAMAGE_REPORT_COPY.UNIT_PLACEHOLDER}
          type={INPUT_TYPES.SELECT}
          onChange={handleUnitChange}
          options={units.map((unit) => ({
            key: unit.id,
            value: unit.id,
            label: `${unit.code} — ${unit.categoryName}`,
          }))}
        />

        <FormField
          id="damage-report-cause"
          name="cause"
          label={DAMAGE_REPORT_COPY.CAUSE_LABEL}
          placeholder={DAMAGE_REPORT_COPY.CAUSE_PLACEHOLDER}
          value={values.cause ?? ""}
          type={INPUT_TYPES.SELECT}
          onChange={handleCauseChange}
          options={DAMAGE_REPORT_CAUSES}
        />

        <FormField
          id="damage-report-description"
          name="description"
          label={DAMAGE_REPORT_COPY.DESCRIPTION_LABEL}
          value={values.description}
          placeholder={
            DAMAGE_REPORT_COPY.DESCRIPTION_PLACEHOLDER
          }
          type={INPUT_TYPES.TEXTAREA}
          onChange={handleDescriptionChange}
        />

        <FormField
          id="damage-report-impact-delta"
          name="impactDelta"
          label={DAMAGE_REPORT_COPY.IMPACT_DELTA_LABEL}
          value={String(values.impactDelta)}
          type={INPUT_TYPES.NUMBER}
          onChange={handleImpactDeltaChange}
        />
      </div>

      {submissionSuccess && (
        <p className={DAMAGE_REPORT_SUCCESS_CLASS}>
          {DAMAGE_REPORT_COPY.SUCCESS}
        </p>
      )}

      {submissionError && (
        <p className={DAMAGE_REPORT_ERROR_CLASS}>
          {submissionError}
        </p>
      )}

      <div className={DAMAGE_REPORT_ACTIONS_CLASS}>
        <Button
          type="submit"
          variant={BUTTON.DANGER}
          size={SIZE.FULL}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? DAMAGE_REPORT_COPY.LOADING_BUTTON
            : DAMAGE_REPORT_COPY.SUBMIT_BUTTON}
        </Button>
      </div>
    </form>
  );
};

export default DamageReportForm;
