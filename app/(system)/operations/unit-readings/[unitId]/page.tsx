import type { Metadata } from "next";
import UnitCorrection from "@/app/features/operations/unit-readings/UnitCorrection";
import { UNIT_CORRECTION_COPY } from "@/app/features/operations/unit-readings/constants/UnitCorrectionCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: UNIT_CORRECTION_COPY.HEADING,
};

const OperationsUnitCorrectionPage = async ({
  params,
}: PageProps<"/operations/unit-readings/[unitId]">): Promise<JSX.Element> => {
  const { unitId } = await params;

  return <UnitCorrection unitId={unitId} />;
};

export default OperationsUnitCorrectionPage;
