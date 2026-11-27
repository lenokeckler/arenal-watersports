"use client";

import Button from "@/app/components/button/Button";
import {
  BUTTON,
  SIZE,
} from "@/app/components/button/constants";
import ChoicePills from "@/app/components/choice-pills/ChoicePills";
import CountStepper from "@/app/components/count-stepper/CountStepper";
import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  DAMAGE_CAUSE_LABELS,
  DAMAGE_CAUSE_ORDER,
  DAMAGE_REPORT_LIMITS,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { DAMAGE_REPORT_FIELD_ID } from "../constants/DamageReport.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import { useDamageReportFormViewModel } from "../hooks/useDamageReportFormViewModel";
import type { DamageReportFormProps } from "../models/DamageReportFormProps.interface";
import DamageReportAftermath from "./DamageReportAftermath";
import DamageReportUnitField from "./DamageReportUnitField";
import {
  DAMAGE_REPORT_ERROR_CLASS,
  DAMAGE_REPORT_FORM_CLASS,
} from "../styles/DamageReportForm.styles";
import type { JSX } from "react";

const CAUSE_OPTIONS = DAMAGE_CAUSE_ORDER.map((cause) => ({
  label: DAMAGE_CAUSE_LABELS[cause],
  value: cause,
}));

const DamageReportForm = ({
  screen,
}: DamageReportFormProps): JSX.Element => {
  const form = useDamageReportFormViewModel(screen);
  const { draft, errors, selectedUnit } = form;

  return (
    <form
      className={DAMAGE_REPORT_FORM_CLASS}
      onSubmit={form.handleSubmit}
      noValidate
    >
      <DamageReportUnitField
        error={errors.unit}
        isLocked={screen.presetUnitId !== null}
        onChange={form.handleUnitChange}
        selectedUnit={selectedUnit}
        units={screen.units}
        value={draft.unitId}
      />
      <ChoicePills
        error={errors.cause}
        legend={DAMAGE_REPORT_COPY.CAUSE_LABEL}
        name={DAMAGE_REPORT_FIELD_ID.CAUSE}
        onChange={form.handleCauseChange}
        options={CAUSE_OPTIONS}
        value={draft.cause}
      />
      <FormField
        id={DAMAGE_REPORT_FIELD_ID.DESCRIPTION}
        name={DAMAGE_REPORT_FIELD_ID.DESCRIPTION}
        label={DAMAGE_REPORT_COPY.DESCRIPTION_LABEL}
        labelSuffix={STRING.Empty}
        placeholder={
          DAMAGE_REPORT_COPY.DESCRIPTION_PLACEHOLDER
        }
        type={INPUT_TYPES.TEXTAREA}
        value={draft.description}
        error={errors.description ?? undefined}
        showErrorText
        onChange={form.handleDescriptionChange}
      />
      <CountStepper
        label={DAMAGE_REPORT_COPY.HITS_LABEL}
        lessLabel={DAMAGE_REPORT_COPY.HITS_LESS}
        moreLabel={DAMAGE_REPORT_COPY.HITS_MORE}
        max={DAMAGE_REPORT_LIMITS.HITS_MAX}
        min={DAMAGE_REPORT_LIMITS.HITS_MIN}
        onChange={form.handleHitsChange}
        value={draft.hits}
      />
      <DamageReportAftermath
        draft={draft}
        hasNotedTrip={screen.pending?.hasTrip ?? false}
        onStateChange={form.handleStateChange}
        onTripChange={form.handleTripChange}
        selectedUnit={selectedUnit}
      />
      {form.errorMessage && (
        <Text
          className={DAMAGE_REPORT_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {form.errorMessage}
        </Text>
      )}
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.PRIMARY}
        size={SIZE.FULL}
        isLoading={form.isSubmitting}
        loadingText={DAMAGE_REPORT_COPY.SUBMITTING}
      >
        {DAMAGE_REPORT_COPY.SUBMIT_BUTTON}
      </Button>
      {!form.isCompleting && (
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.SECONDARY}
          size={SIZE.FULL}
          disabled={form.isSubmitting}
          onClick={form.handleSubmitLater}
        >
          {DAMAGE_REPORT_COPY.SUBMIT_LATER_BUTTON}
        </Button>
      )}
    </form>
  );
};

export default DamageReportForm;
