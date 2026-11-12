import { createServerSupabaseClient } from "@/app/services/supabase";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import type { UnitReservationPage } from "../models/UnitReservationPage.interface";
import { mapUnitReservationRowToItem } from "../utils/mapUnitReservationRowToItem";
import { fetchUnitReservationCount } from "./fetchUnitReservationCount";
import { fetchUnitReservations } from "./fetchUnitReservations";

export const listUnitReservations = async (
  unitId: string,
  page: number
): Promise<UnitReservationPage> => {
  const supabase = await createServerSupabaseClient();

  const pageCount = resolveListPageCount(
    await fetchUnitReservationCount(supabase, unitId)
  );

  if (page > pageCount) {
    return { reservations: [], pageCount };
  }

  const reservationRows = await fetchUnitReservations(
    supabase,
    unitId,
    resolveListPageRange(page)
  );

  return {
    reservations: reservationRows.map(
      mapUnitReservationRowToItem
    ),
    pageCount,
  };
};
