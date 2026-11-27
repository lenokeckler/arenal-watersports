export const DEPOSIT_RESOLUTION_FORM_COPY = {
  ACTIONS: "Acciones de la resolución",
  BACK: "Volver",
  CHOICE_ALL: "Se devuelve todo",
  CHOICE_ALL_DESCRIPTION: (amount: string): string =>
    `El equipo volvió en orden: ${amount}`,
  CHOICE_LEGEND: "¿Cuánto se le devuelve al cliente?",
  CHOICE_PART: "Se devuelve un monto",
  CHOICE_PART_DESCRIPTION:
    "Hubo daño: la empresa se queda una parte o todo",
  KEPT_LABEL: "La empresa se queda",
  REASON_HELPER:
    "Se anota en el reporte de depósitos retenidos.",
  REASON_LABEL: "Motivo del daño",
  RESOLVED_BY: (name: string): string =>
    `Resuelto por ${name}`,
  RETURNED_HELPER: (amount: string): string =>
    `Entre 0 y ${amount}. Escriba 0 si no se devuelve nada.`,
  RETURNED_LABEL: "Monto que se devuelve",
  RETURNED_PLACEHOLDER: "0.00",
  RETURNED_RECEIPT_LABEL: "Se devuelve",
  SUBMIT: "Resolver depósito",
  SUBMITTING: "Resolviendo depósito…",
  SUCCESS: (code: string): string =>
    `Depósito de la reserva ${code} resuelto. Ya no está en pendientes.`,
} as const;
