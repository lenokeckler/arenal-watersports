import type { PendingDispatchReservationsPage } from "@/app/components/dispatch-board/models/PendingDispatchReservationsPage.interface";
import { DISPATCH_BOARD_PAGINATION } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import { ERRORS } from "@/app/constants/errors/Errors.constant";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { getPendingDispatchOffset } from "./getPendingDispatchOffset";
import { readPendingDispatchEquipment } from "./readPendingDispatchEquipment";
import type { PendingDispatchSupabaseClient } from "./models/PendingDispatchSupabaseClient.type";

export const readPendingDispatchReservations = async (
  supabase: PendingDispatchSupabaseClient,
  page: number,
  startsAt: string,
  endsAt: string
): Promise<PendingDispatchReservationsPage> => {
  const offset = getPendingDispatchOffset(page);
  const { data, error } = await supabase.rpc(
    "pending_dispatch_reservations",
    {
      p_ends_at: endsAt,
      p_limit: DISPATCH_BOARD_PAGINATION.PAGE_SIZE + 1,
      p_offset: offset,
      p_starts_at: startsAt,
    }
  );
  throwIfSupabaseError(
    error,
    "load pending dispatch reservations"
  );

  if (data === null) {
    throw new Error(ERRORS.COMMON.SERVER);
  }

  const pageRows = data.slice(
    0,
    DISPATCH_BOARD_PAGINATION.PAGE_SIZE
  );
  const equipment = await readPendingDispatchEquipment(
    supabase,
    pageRows.map((reservation) => reservation.id)
  );

  return {
    hasNextPage:
      data.length > DISPATCH_BOARD_PAGINATION.PAGE_SIZE,
    page,
    reservations: pageRows.map((reservation) => ({
      ...reservation,
      equipment:
        equipment.get(reservation.id)?.equipment ?? [],
      isCombo:
        equipment.get(reservation.id)?.isCombo ?? false,
    })),
  };
};
