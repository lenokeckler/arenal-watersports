import { STRING } from "@/app/constants";
import { RESERVATION_CUSTOM_DURATION_INITIAL_HOURS } from "../constants/ReservationFormUi.constants";

export const resolveReservationDurationHours = (
  isCustomDuration: boolean,
  customDurationDraft: string,
  selectedDurationHours: number
): number => {
  if (!isCustomDuration) {
    return selectedDurationHours;
  }
  const parsedHours = Number(customDurationDraft);
  const hasValidDraft =
    customDurationDraft.trim() !== STRING.Empty &&
    Number.isFinite(parsedHours);
  return hasValidDraft
    ? parsedHours
    : RESERVATION_CUSTOM_DURATION_INITIAL_HOURS;
};
