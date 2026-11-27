import type { Metadata } from "next";
import UnitHistory from "@/app/features/operations/unit-history/UnitHistory";
import { UNIT_HISTORY_COPY } from "@/app/features/operations/unit-history/constants/UnitHistoryCopy.constants";
import { PAGINATION } from "@/app/constants";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: UNIT_HISTORY_COPY.HEADING,
};

const OperationsUnitHistoryPage = async ({
  params,
  searchParams,
}: PageProps<"/operations/unit-history/[unitId]">): Promise<JSX.Element> => {
  const [{ unitId }, query] = await Promise.all([
    params,
    searchParams,
  ]);

  return (
    <UnitHistory
      page={resolveListPage(
        query[PAGINATION.QUERY_PARAMS.PAGE]
      )}
      unitId={unitId}
    />
  );
};

export default OperationsUnitHistoryPage;
