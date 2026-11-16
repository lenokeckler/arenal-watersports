export const EXTRA_COMPATIBILITY_COPY = {
  APPLIES_TO_ONE_UNIT: "Aplica a 1 unidad",
  APPLIES_TO_UNITS: (unitCount: number): string =>
    `Aplica a ${unitCount} unidades`,
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
  NOT_FOUND_ERROR:
    "No se encontró el extra o una de las embarcaciones. Es posible que otra persona la haya eliminado.",
  NO_UNITS: "Sin embarcaciones",
  OFFLINE_ERROR:
    "Sin conexión. Los cambios no se guardaron; conéctese a internet e intente de nuevo.",
  SAVE_BUTTON: "Guardar",
  SAVE_ERROR:
    "No se pudieron guardar las embarcaciones. Revise la conexión e intente de nuevo.",
  SAVE_SUCCESS_TOAST: "Embarcaciones del extra guardadas.",
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
