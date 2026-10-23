export const PATHS = {
  ACCESS: {
    LOGIN: "/access/login",
    ROOT: "/access",
  },
  HOME: "/",
  RESERVATIONS: {
    CALENDAR: "/reservations/calendar",
    DETAIL: (reservationId: string): string =>
      `/reservations/${encodeURIComponent(reservationId)}`,
    NEW: "/reservations/new",
  },
} as const;
