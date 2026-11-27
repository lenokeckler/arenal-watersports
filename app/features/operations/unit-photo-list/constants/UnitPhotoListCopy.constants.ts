export const UNIT_PHOTO_LIST_COPY = {
  ALL: "Todas",
  CARD_LABEL: (
    code: string,
    done: number,
    total: number
  ): string => `${code}: ${done} de ${total} fotos básicas`,
  COVER_ALT: (code: string): string => `Foto de ${code}`,
  DETAIL: (done: number, total: number): string =>
    `${done} de ${total} básicas`,
  EMPTY: "No hay máquinas que lleven fotos de estado.",
  ERROR: "No se pudieron cargar las fotos.",
  FILTER_LABEL: "Categoría",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Fotos del estado",
  IMAGE_SIZES: "(min-width: 640px) 384px, 50vw",
  PAGES_LABEL: "Páginas de las fotos",
} as const;
