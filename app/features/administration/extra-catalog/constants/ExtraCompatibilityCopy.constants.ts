export const EXTRA_COMPATIBILITY_COPY = {
  APPLIES_TO_ONE_UNIT: "Aplica a 1 embarcación",
  APPLIES_TO_UNITS: (unitCount: number): string =>
    `Aplica a ${unitCount} embarcaciones`,
  BACK_BUTTON: "Regresar",
  BOATS_SUBTITLE:
    "Marque en qué embarcaciones se puede ofrecer este extra.",
  BOATS_TOTAL: (
    linkedCount: number,
    unitCount: number
  ): string =>
    `Aplica a ${linkedCount} de ${unitCount} embarcaciones`,
  BOATS_TOTAL_HELP:
    "Al armar una reserva, solo se ofrece en estas.",
  DIRTY_ONE: "1 cambio sin guardar",
  DIRTY_MANY: (count: number): string =>
    `${count} cambios sin guardar`,
  LEAVE_DISCARD_BUTTON: "Regresar sin guardar",
  LEAVE_SAVE_BUTTON: "Guardar y regresar",
  LEAVE_TITLE: "¿Salir sin guardar?",
  LEAVE_BODY:
    "Marcó o quitó embarcaciones y no las ha guardado.",
  BACK_TO_EXTRAS_LINK: "Volver a extras",
  CATEGORIES_EMPTY_BODY:
    "Agregue embarcaciones a una categoría por unidad para poder asignarles este extra.",
  CATEGORIES_EMPTY_TITLE:
    "No hay categorías con embarcaciones.",
  CATEGORIES_INSTRUCTION: (extraName: string): string =>
    `Elija la categoría en la que quiere definir las embarcaciones que admiten "${extraName}".`,
  CATEGORIES_TITLE: "Embarcaciones del extra",
  CATEGORY_NOT_FOUND_ERROR:
    "No se encontró la categoría. Es posible que otra persona la haya eliminado.",
  CLEAR_ALL_BUTTON: "Quitar todas",
  FORBIDDEN_ERROR:
    "No tiene permiso para definir las embarcaciones de un extra.",
  INVALID_INPUT_ERROR:
    "La solicitud no es válida. Recargue la pantalla e intente de nuevo.",
  INVALID_SELECTION_ERROR:
    "La selección incluye una embarcación que no pertenece a esta categoría.",
  LINK: "Embarcaciones",
  LINKED_OF_ONE_UNIT: (linkedCount: number): string =>
    `${linkedCount} de 1 unidad`,
  LINKED_OF_UNITS: (
    linkedCount: number,
    unitCount: number
  ): string => `${linkedCount} de ${unitCount} unidades`,
  MARKED_COUNT: (count: number): string =>
    `${count} marcadas`,
  NOT_FOUND_ERROR:
    "No se encontró el extra o una de las embarcaciones. Es posible que otra persona la haya eliminado.",
  NOT_OFFERED: "no se ofrece",
  NO_UNITS: "Sin embarcaciones",
  OFFLINE_ERROR:
    "Sin conexión. Los cambios no se guardaron; conéctese a internet e intente de nuevo. Lo que marcó sigue aquí.",
  SAVE_BUTTON: "Guardar embarcaciones",
  SAVE_ERROR:
    "No se pudieron guardar las embarcaciones. Revise la conexión e intente de nuevo.",
  SAVE_SUCCESS_TOAST: "Embarcaciones guardadas.",
  SELECT_ALL_BUTTON: "Marcar todas",
  UNITS_EMPTY:
    "Esta categoría no tiene embarcaciones activas.",
  UNITS_INSTRUCTION: (
    extraName: string,
    categoryName: string
  ): string =>
    `Marque las embarcaciones de ${categoryName} en las que aplica "${extraName}" y guarde.`,
  UNITS_TITLE: "Embarcaciones aplicables",
} as const;
