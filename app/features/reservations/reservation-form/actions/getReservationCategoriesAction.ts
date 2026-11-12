"use server";

import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { getReservationCategories } from "../services/getReservationCategories";

export const getReservationCategoriesAction =
  async (): Promise<ReservationCategoryOption[]> =>
    await getReservationCategories();
