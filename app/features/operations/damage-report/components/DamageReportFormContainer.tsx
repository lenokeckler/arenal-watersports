"use client";

import DamageReportForm from "./DamageReportForm";
import { useDamageReportFormViewModel } from "../hooks/useDamageReportFormViewModel";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";

interface DamageReportFormContainerProps {
  units: DamageReportUnit[];
}

const DamageReportFormContainer = ({
  units,
}: DamageReportFormContainerProps) => {
  const viewModel = useDamageReportFormViewModel(units);

  return <DamageReportForm viewModel={viewModel} />;
};

export default DamageReportFormContainer;
