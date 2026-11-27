"use client";

import FormField from "@/app/components/form-field/FormField";
import { INPUT_TYPES, STRING } from "@/app/constants";
import { DAMAGE_REPORT_FIELD_ID } from "../constants/DamageReport.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportUnitFieldProps } from "../models/DamageReportUnitFieldProps.interface";
import DamageReportLockedUnit from "./DamageReportLockedUnit";
import type { JSX } from "react";

const DamageReportUnitField = ({
  error,
  isLocked,
  onChange,
  selectedUnit,
  units,
  value,
}: DamageReportUnitFieldProps): JSX.Element => {
  if (isLocked && selectedUnit) {
    return <DamageReportLockedUnit unit={selectedUnit} />;
  }

  return (
    <FormField
      id={DAMAGE_REPORT_FIELD_ID.UNIT}
      name={DAMAGE_REPORT_FIELD_ID.UNIT}
      label={DAMAGE_REPORT_COPY.UNIT_LABEL}
      labelSuffix={STRING.Empty}
      placeholder={DAMAGE_REPORT_COPY.UNIT_PLACEHOLDER}
      type={INPUT_TYPES.SELECT}
      value={value}
      error={error ?? undefined}
      showErrorText
      onChange={onChange}
      options={units.map((unit) => ({
        key: unit.id,
        label: DAMAGE_REPORT_COPY.UNIT_OPTION(
          unit.code,
          unit.categoryName
        ),
        value: unit.id,
      }))}
    />
  );
};

export default DamageReportUnitField;
