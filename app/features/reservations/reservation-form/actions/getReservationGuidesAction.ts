"use server";

import type { ReservationGuideOption } from "../models/ReservationGuideOption.interface";
import { getReservationGuides } from "../services/getReservationGuides";

export const getReservationGuidesAction = async (): Promise<
  ReservationGuideOption[]
> => await getReservationGuides();
