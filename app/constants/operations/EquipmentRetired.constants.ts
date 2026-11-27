export const EQUIPMENT_RETIRED = {
  LABEL: "Dada de baja",
  LABELLED: (code: string): string =>
    `${code} · Dada de baja`,
} as const;
