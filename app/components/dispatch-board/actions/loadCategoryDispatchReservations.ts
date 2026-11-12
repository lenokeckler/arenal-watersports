"use server";

import { getCategoryDispatchReservations } from "@/app/services/operations/getCategoryDispatchReservations";
import type { CategoryDispatchReservation } from "../models/CategoryDispatchReservation.interface";

export const loadCategoryDispatchReservations = async (
  categoryId: string
): Promise<CategoryDispatchReservation[]> => {
  const reservations =
    await getCategoryDispatchReservations(categoryId);

  return reservations;
};
