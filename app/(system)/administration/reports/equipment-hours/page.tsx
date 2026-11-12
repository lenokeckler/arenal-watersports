import type { Metadata } from "next";
import EquipmentHoursReport from "@/app/features/administration/equipment-hours-report/EquipmentHoursReport";
import { EQUIPMENT_HOURS_COPY } from "@/app/features/administration/equipment-hours-report/constants/EquipmentHoursReportCopy.constants";
import { PAGINATION } from "@/app/constants";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";

export const metadata: Metadata = {
  title: EQUIPMENT_HOURS_COPY.HEADING,
};

const EquipmentHoursReportPage = async ({
  searchParams,
}: PageProps<"/administration/reports/equipment-hours">): Promise<React.JSX.Element> => {
  const resolvedSearchParams = await searchParams;

  return (
    <EquipmentHoursReport
      page={resolveListPage(
        resolvedSearchParams[PAGINATION.QUERY_PARAMS.PAGE]
      )}
    />
  );
};

export default EquipmentHoursReportPage;
