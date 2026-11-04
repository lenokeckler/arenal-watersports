import { getCostaRicaDate } from "@/app/features/reservations/reservation-form/utils/getCostaRicaDate";
import { E2E_RESERVATION_CATEGORY_CONFLICT } from "../constants/E2eReservationForm.constants";

type E2EProjectName =
  keyof typeof E2E_RESERVATION_CATEGORY_CONFLICT.PROJECT_DATE_OFFSETS;

const isE2EProjectName = (
  projectName: string
): projectName is E2EProjectName =>
  Object.hasOwn(
    E2E_RESERVATION_CATEGORY_CONFLICT.PROJECT_DATE_OFFSETS,
    projectName
  );

export const getReservationConflictDate = (
  projectName: string
): string => {
  const projectOffsets =
    E2E_RESERVATION_CATEGORY_CONFLICT.PROJECT_DATE_OFFSETS;
  if (!isE2EProjectName(projectName)) {
    throw new Error(
      "Unknown Playwright project for reservation conflict date."
    );
  }

  const projectOffset = projectOffsets[projectName];
  const date = new Date(
    `${E2E_RESERVATION_CATEGORY_CONFLICT.REFERENCE_DATE}T${E2E_RESERVATION_CATEGORY_CONFLICT.DATE_SAFE_UTC_HOUR}:00:00Z`
  );
  date.setUTCDate(date.getUTCDate() + projectOffset);

  return getCostaRicaDate(date);
};
