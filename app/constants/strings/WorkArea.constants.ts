export const WORK_AREA = {
  ADMINISTRATION: "administracion",
  OPERATIONS: "operaciones",
  RESERVATIONS: "reservas",
} as const;

export type WorkArea =
  (typeof WORK_AREA)[keyof typeof WORK_AREA];
