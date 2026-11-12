import { getReservationExtrasAction } from "../actions/getReservationExtrasAction";
import type { ReservationExtraOptionsLoadResult } from "../models/ReservationExtraOptionsLoadResult.type";

export const loadReservationExtraOptions = async (
  unitId: string
): Promise<ReservationExtraOptionsLoadResult> => {
  try {
    return {
      ok: true,
      options: await getReservationExtrasAction({ unitId }),
    };
  } catch (error) {
    return { error, ok: false };
  }
};
