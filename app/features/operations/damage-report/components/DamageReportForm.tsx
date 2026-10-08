"use client";

import FormField from "@/app/components/form-field/FormField";
import { INPUT_TYPES } from "@/app/constants";
import { DAMAGE_REPORT_CAUSES } from "../constants/DamageReportCause.constants";
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
          label="Unidad afectada"
          value={values.unitId}
          placeholder="Seleccionar unidad"
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
          label="Causa"
          placeholder="Seleccionar causa"
          value={values.cause ?? ""}
          type={INPUT_TYPES.SELECT}
          onChange={handleCauseChange}
          options={DAMAGE_REPORT_CAUSES}
        />

        <FormField
          id="damage-report-description"
          name="description"
          label="Descripción"
          value={values.description}
          placeholder="Describa lo ocurrido"
          type={INPUT_TYPES.TEXTAREA}
          onChange={handleDescriptionChange}
        />

        <FormField
          id="damage-report-impact-delta"
          name="impactDelta"
          label="Aumento del conteo de golpes"
          value={String(values.impactDelta)}
          type={INPUT_TYPES.NUMBER}
          onChange={handleImpactDeltaChange}
        />
      </div>

      {submissionSuccess && (
        <p className={DAMAGE_REPORT_SUCCESS_CLASS}>
          Reporte de daño registrado correctamente.
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
            ? "Registrando..."
            : "Reportar daño"}
        </Button>
      </div>
    </form>
  );
};

export default DamageReportForm;
