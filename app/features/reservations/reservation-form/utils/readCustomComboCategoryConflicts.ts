import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import type { CustomComboConflictRequest } from "../models/CustomComboConflictRequest.interface";
import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";

export const readCustomComboCategoryConflicts = async (
  request: CustomComboConflictRequest
): Promise<ReservationCategoryConflict[]> => {
  const resultSets = await Promise.all(
    request.categoryIds.map((categoryId) =>
      getReservationCategoryConflictsAction({
        categoryId,
        date: request.date,
        durationMinutes: request.durationMinutes,
        time: request.time,
      })
    )
  );
  const conflictsByReservationId = new Map<
    string,
    ReservationCategoryConflict
  >();
  resultSets.flat().forEach((conflict) => {
    conflictsByReservationId.set(
      conflict.reservation_id,
      conflict
    );
  });
  return [...conflictsByReservationId.values()];
};
