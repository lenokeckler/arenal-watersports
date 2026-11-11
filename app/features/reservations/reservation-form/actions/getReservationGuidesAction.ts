"use server";

import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { loadReservationGuideDirectory } from "../services/loadReservationGuideDirectory";

export const getReservationGuidesAction =
  async (): Promise<ReservationGuideLoadResult> =>
    await loadReservationGuideDirectory();
