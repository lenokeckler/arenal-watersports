import type { Metadata } from "next";
import UnitReadings from "@/app/features/operations/unit-readings/UnitReadings";
import { UNIT_READINGS_COPY } from "@/app/features/operations/unit-readings/constants/UnitReadingsCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: UNIT_READINGS_COPY.HEADING,
};

const OperationsUnitReadingsPage = (): JSX.Element => (
  <UnitReadings />
);

export default OperationsUnitReadingsPage;
