export const TitleVariant = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  AUXILIAR: "auxiliar",
} as const;

export type TitleVariant =
  (typeof TitleVariant)[keyof typeof TitleVariant];
