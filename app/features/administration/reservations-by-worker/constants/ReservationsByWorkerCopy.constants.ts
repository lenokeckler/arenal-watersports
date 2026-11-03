export const RESERVATIONS_BY_WORKER_COPY = {
  BACK: "Volver al inicio",
  CUSTOMER: (customerName: string): string =>
    `Cliente: ${customerName}`,
  EMPTY: "No hay reservas registradas para mostrar.",
  INSTRUCTION:
    "Consulte cada reserva junto con el trabajador que la registró.",
  METADATA_TITLE:
    "Reservas por trabajador — Arenal Water Sports",
  NEXT_PAGE: "Siguiente",
  PAGE: (currentPage: number, pageCount: number): string =>
    `Página ${currentPage} de ${pageCount}`,
  PAGINATION: "Paginación de reservas por trabajador",
  PREVIOUS_PAGE: "Anterior",
  RECORDED_BY: (workerName: string): string =>
    `Registrada por ${workerName}`,
  TITLE: "Reservas por trabajador",
} as const;
