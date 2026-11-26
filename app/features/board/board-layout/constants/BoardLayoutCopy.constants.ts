export const BOARD_LAYOUT_COPY = {
  COLUMNS_LABEL: "Tarjetas por fila",
  COLUMNS_OPTION: (columns: number): string => `${columns}`,
  COLUMNS_OPTION_ARIA: (columns: number): string =>
    `${columns} tarjetas por fila`,
  MOVE_HANDLE: (label: string): string => `Mover ${label}`,
  ORDER_HINT:
    "Arrastre una categoría para moverla. Con el teclado, use las flechas hacia arriba y hacia abajo.",
  ORDER_LABEL: "Orden de las categorías",
  SECTION_LABEL: "Tablero",
} as const;
