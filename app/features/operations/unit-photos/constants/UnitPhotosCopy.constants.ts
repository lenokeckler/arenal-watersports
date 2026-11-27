export const UNIT_PHOTOS_COPY = {
  ALT_PREFIX: "Foto de la máquina: ",
  ANGLE: {
    back: "Atrás",
    bottom: "Por debajo (opcional)",
    extra: "Adicional (opcional)",
    front: "Frente",
    left_side: "Costado izquierdo",
    right_side: "Costado derecho",
  },
  BASIC_PROGRESS: (done: number, total: number): string =>
    `${done} de ${total} fotos básicas`,
  CANCEL: "Cancelar",
  CONFIRM_BODY: (angle: string): string =>
    `Se borrará la foto «${angle}». No se puede deshacer.`,
  CONFIRM_TITLE: "¿Borrar la foto?",
  DELETE: "Borrar foto",
  DELETE_LABEL: (angle: string): string =>
    `Borrar foto: ${angle}`,
  DELETED: "Foto borrada.",
  DELETED_FILE_KEPT:
    "La foto se quitó, pero el archivo no se pudo borrar.",
  DELETING: "Borrando…",
  ERROR_DELETE:
    "No se pudo borrar la foto. Intente de nuevo.",
  ERROR_LOAD:
    "No se pudieron cargar las fotos de la máquina.",
  ERROR_SIZE: "La foto no puede pesar más de 5 MB.",
  ERROR_TYPE: "La foto debe ser JPG, PNG o WebP.",
  ERROR_UPLOAD:
    "No se pudo guardar la foto. Intente de nuevo.",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Fotos de la máquina",
  IMAGE_SIZES: "(min-width: 640px) 320px, 100vw",
  LARGE_IMAGE_SIZES: "(min-width: 640px) 640px, 100vw",
  NO_PHOTO: "Sin foto",
  NOT_FOUND: "No se encontró la máquina.",
  VIEW_ONLY:
    "Los guías temporales pueden ver las fotos, pero no cambiarlas.",
  REPORT_DAMAGE: "Reportar daño",
  REPLACE: "Cambiar foto",
  SAVED: "Foto guardada.",
  TITLE_SEPARATOR: " · ",
  UPLOAD: "Tomar o subir foto",
  UPLOADING: "Subiendo foto…",
  VIEW_HISTORY: "Ver historial",
  VIEW_LARGE: (angle: string): string =>
    `Ver en grande: ${angle}`,
} as const;
