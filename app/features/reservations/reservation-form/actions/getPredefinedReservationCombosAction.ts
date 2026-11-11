"use server";

import type { ReservationPredefinedCombo } from "../models/ReservationPredefinedCombo.interface";
import { getPredefinedReservationCombos } from "../services/getPredefinedReservationCombos";

export const getPredefinedReservationCombosAction =
  async (): Promise<ReservationPredefinedCombo[]> =>
    await getPredefinedReservationCombos();
