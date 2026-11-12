import type { Metadata } from "next";
import MovementReport from "@/app/features/administration/movement-report/MovementReport";
import { MOVEMENT_REPORT_COPY } from "@/app/features/administration/movement-report/constants/MovementReportCopy.constants";

export const metadata: Metadata = {
  title: MOVEMENT_REPORT_COPY.HEADING,
};

const MovementReportPage = (): React.JSX.Element => (
  <MovementReport />
);

export default MovementReportPage;
