import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { getReservationGuides } from "./getReservationGuides";
import { recordReservationGuideLoadFailure } from "../utils/recordReservationGuideLoadFailure";
import { resolveReservationGuideLoadErrorCode } from "../utils/resolveReservationGuideLoadErrorCode";

export const loadReservationGuideDirectory =
  async (): Promise<ReservationGuideLoadResult> => {
    try {
      return {
        guides: await getReservationGuides(),
        kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
      };
    } catch (error) {
      const code =
        resolveReservationGuideLoadErrorCode(error);
      recordReservationGuideLoadFailure(error, code);
      return {
        code,
        kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
      };
    }
  };
