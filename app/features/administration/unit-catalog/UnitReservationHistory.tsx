import { redirect } from "next/navigation";
import { LENGTH } from "@/app/constants";
import { resolveListPage } from "@/app/utils/list-pagination/resolveListPage";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { UNIT_RESERVATION_HISTORY_DIAGNOSTICS } from "./constants/UnitReservationHistoryDiagnostics.constants";
import type { UnitReservationHistoryProps } from "./models/UnitReservationHistoryProps.interface";
import type { UnitReservationHistoryViewProps } from "./models/UnitReservationHistoryViewProps.interface";
import { listUnitReservations } from "./services/listUnitReservations";
import UnitReservationHistoryView from "./UnitReservationHistoryView";
import { resolveUnitEditPath } from "./utils/resolveUnitPaths";

const fetchViewProps = async (
  unitId: string,
  basePath: string,
  currentPage: number
): Promise<UnitReservationHistoryViewProps> => {
  try {
    const { reservations, pageCount } =
      await listUnitReservations(unitId, currentPage);
    return {
      basePath,
      currentPage,
      fetchFailed: false,
      pageCount,
      reservations,
    };
  } catch (error) {
    const fetchError = new Error(
      UNIT_RESERVATION_HISTORY_DIAGNOSTICS.FETCH_FAILED,
      { cause: error }
    );
    return {
      basePath,
      currentPage,
      fetchError,
      fetchFailed: true,
      pageCount: LENGTH.ZERO,
      reservations: [],
    };
  }
};

const UnitReservationHistory = async ({
  categoryId,
  pageParam,
  unitId,
}: UnitReservationHistoryProps): Promise<React.JSX.Element> => {
  const basePath = resolveUnitEditPath(categoryId, unitId);
  const viewProps = await fetchViewProps(
    unitId,
    basePath,
    resolveListPage(pageParam)
  );

  if (
    viewProps.currentPage > viewProps.pageCount &&
    viewProps.pageCount > LENGTH.ZERO
  ) {
    redirect(
      resolveListPageHref(basePath, viewProps.pageCount)
    );
  }

  return <UnitReservationHistoryView {...viewProps} />;
};

export default UnitReservationHistory;
