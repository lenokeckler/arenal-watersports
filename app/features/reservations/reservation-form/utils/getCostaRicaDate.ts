import { RESERVATION_TIME_ZONE } from "../constants/ReservationFormUi.constants";

export const getCostaRicaDate = (date: Date): string => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: RESERVATION_TIME_ZONE,
    year: "numeric",
  }).formatToParts(date);
  const partValues = new Map(
    parts.map((part) => [part.type, part.value])
  );
  const year = partValues.get("year");
  const month = partValues.get("month");
  const day = partValues.get("day");

  if (!year || !month || !day) {
    throw new Error(
      "Unable to determine the Costa Rica date"
    );
  }

  return `${year}-${month}-${day}`;
};
