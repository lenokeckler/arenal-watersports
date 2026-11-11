import type { Metadata } from "next";
import OutOnWater from "@/app/features/operations/out-on-water/OutOnWater";
import { OUT_ON_WATER_METADATA } from "@/app/features/operations/out-on-water/constants/OutOnWaterMetadata.constants";
import type { JSX } from "react";

export const metadata: Metadata = OUT_ON_WATER_METADATA;

const OperationsOutOnWaterPage = (): JSX.Element => (
  <OutOnWater />
);

export default OperationsOutOnWaterPage;
