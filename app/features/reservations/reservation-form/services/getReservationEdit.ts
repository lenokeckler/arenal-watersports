import { UUID_PATTERN } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_EDIT_QUERY } from "../constants/ReservationEditQuery.constants";
import type { ReservationEdit } from "../models/ReservationEdit.interface";
import { mapReservationEdit } from "../utils/mapReservationEdit";
import { buildReservationEditQuery } from "./buildReservationEditQuery";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";
import { getReservationLastEditorName } from "./getReservationLastEditorName";

export const getReservationEdit = async (
  reservationId: string
): Promise<NullableRef<ReservationEdit>> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }
  const supabase =
    await getAuthorizedReservationFormClient();
  const { data: row, error } =
    await buildReservationEditQuery(
      supabase,
      reservationId
    );
  throwIfSupabaseError(
    error,
    RESERVATION_EDIT_QUERY.READ_OPERATION
  );
  if (!row) {
    return null;
  }
  return mapReservationEdit(
    row,
    await getReservationLastEditorName(
      supabase,
      row.updated_by
    )
  );
};
