export const SYSTEM_NAVIGATION_COPY = {
  BOARD: "Tablero",
  CALENDAR: "Calendario",
  CHANGE_MODE: "Cambiar modo",
  HISTORY: "Historial",
  INCOME: "Ingresos",
  INVENTORY: "Inventario",
  LABEL: "Navegación principal",
  MENU: "Menú",
  MENU_LABEL: "Opciones de cuenta",
  PENDING_LABEL: (label: string): string =>
    `${label}. Próximamente`,
  PROFILE: "Perfil",
} as const;
