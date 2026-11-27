export const EXTRA_CATALOG_COPY = {
  BACK_BUTTON: "Regresar",
  BACK_TO_HOME: "Volver al inicio",
  BOATS_CHANGE_LINK: "Cambiar",
  BOATS_CREATE_NOTE:
    "Después de agregar el extra podrá marcar en qué embarcaciones se ofrece. Mientras no marque ninguna, no aparece en las reservas.",
  BOATS_EDIT_TEXT: "Marque en qué embarcaciones se ofrece",
  BOATS_SECTION_TITLE: "Embarcaciones",
  CANCEL_BUTTON: "Cancelar",
  CREATE_CTA: "Nuevo extra",
  CREATE_SUCCESS_TOAST: "Extra agregado.",
  EDIT_CARD_LABEL: (name: string): string =>
    `Editar ${name}`,
  EDIT_LINK: "Editar",
  EMPTY_STATE_BODY: "Cada extra que agregue aparece aquí.",
  EMPTY_STATE_TITLE: "Todavía no hay extras.",
  FETCH_ERROR_MESSAGE: "No se pudieron cargar los extras.",
  FORBIDDEN_ERROR:
    "No tiene permiso para administrar los extras.",
  FORM_OVERLINE: "Extras",
  FORM_TITLE_CREATE: "Agregar extra",
  FORM_TITLE_EDIT: "Editar extra",
  GENERIC_MUTATION_ERROR:
    "No se pudo guardar el extra. Intente de nuevo.",
  LIST_SUBTITLE:
    "Lo que se suma a una salida: parrilla, tubing, tablas…",
  LIST_TITLE: "Extras",
  LOADING_TEXT_DELETING: "Eliminando…",
  LOADING_TEXT_SAVING: "Guardando…",
  LOADING_TEXT_UPDATING: "Actualizando…",
  NAME_HELP: "Así aparece en las reservas.",
  NAME_DUPLICATE_ERROR:
    "Ya existe un extra con ese nombre.",
  NAME_LABEL: "Nombre del extra",
  NAME_REQUIRED_ERROR: "Ingrese el nombre del extra.",
  NOT_FOUND_ERROR:
    "No se encontró el extra. Es posible que otra persona lo haya eliminado.",
  PAGINATION_NAV_LABEL: "Paginación de extras",
  PRICES_REQUIRED_ERROR:
    "Ingrese al menos un precio, en dólares o en colones.",
  PRICE_SEPARATOR: " · ",
  PRICE_GROUP_HELP:
    "Escriba al menos uno. Use punto o coma para los decimales.",
  PRICE_GROUP_TITLE: "Precio",
  PRICE_CRC_LABEL: "Precio en colones (CRC)",
  PRICE_FIELD_PLACEHOLDER: "Sin precio",
  PRICE_FORMAT_ERROR:
    "Escriba un número que no sea negativo, con punto o coma para los decimales y sin separador de miles.",
  PRICE_USD_LABEL: "Precio en dólares (USD)",
  REACTIVATE_BUTTON: "Reactivar",
  REACTIVATE_GENERIC_ERROR:
    "No se pudo reactivar el extra. Intente de nuevo.",
  REACTIVATE_SUCCESS_TOAST: "Extra reactivado.",
  REMOVAL_NEVER_USED_NOTE:
    "Si nunca se usó en una reserva, se elimina por completo.",
  REMOVAL_SHEET_TITLE: "¿Eliminar este extra?",
  REMOVAL_USED_NOTE:
    "Si ya se usó en alguna, se marca como inactivo y el historial de las reservas no cambia. Puede reactivarlo después.",
  REMOVAL_GENERIC_ERROR:
    "No se pudo eliminar el extra. Intente de nuevo.",
  REMOVE_BUTTON: "Eliminar",
  RETRY_BUTTON: "Reintentar",
  STATUS_LABEL_ACTIVE: "Activo",
  STATUS_LABEL_INACTIVE: "Inactivo",
  SUBMIT_BUTTON_CREATE: "Agregar extra",
  SUBMIT_BUTTON_EDIT: "Guardar cambios",
  UPDATE_SUCCESS_TOAST: "Extra actualizado.",
} as const;
