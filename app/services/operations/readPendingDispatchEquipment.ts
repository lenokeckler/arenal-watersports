import { DISPATCH_SHEET_ERROR } from "@/app/components/dispatch-board/constants/DispatchSheet.constants";
import { RESERVATION_TYPE } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import type { PendingDispatchReservationEquipment } from "@/app/components/dispatch-board/models/PendingDispatchReservationEquipment.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { PendingDispatchSupabaseClient } from "./models/PendingDispatchSupabaseClient.type";

export const readPendingDispatchEquipment = async (
  supabase: PendingDispatchSupabaseClient,
  reservationIds: string[]
): Promise<
  Map<string, PendingDispatchReservationEquipment>
> => {
  const equipmentByReservation = new Map<
    string,
    PendingDispatchReservationEquipment
  >();

  if (reservationIds.length === 0) {
    return equipmentByReservation;
  }

  const { data, error } = await supabase.rpc(
    "pending_dispatch_equipment",
    { p_reservation_ids: reservationIds }
  );
  throwIfSupabaseError(
    error,
    DISPATCH_SHEET_ERROR.LOAD_PENDING_EQUIPMENT
  );

  for (const row of data ?? []) {
    const reservation = equipmentByReservation.get(
      row.reservation_id
    ) ?? {
      equipment: [],
      isCombo:
        row.reservation_type === RESERVATION_TYPE.COMBO,
    };
    reservation.equipment.push({
      categoryName: row.category_name,
      quantity: row.quantity,
      totalQuantity: row.total_quantity,
    });
    equipmentByReservation.set(
      row.reservation_id,
      reservation
    );
  }

  return equipmentByReservation;
};
