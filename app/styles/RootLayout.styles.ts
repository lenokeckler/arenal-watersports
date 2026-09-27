export const ROOT_LAYOUT_BODY_CLASS =
  "bg-background text-on-background antialiased";

export const resolveRootLayoutBodyClassName = (
  sansFontVariableClassName: string,
  monoFontVariableClassName: string,
  materialSymbolsFontVariableClassName: string
): string =>
  `${sansFontVariableClassName} ${monoFontVariableClassName} ${materialSymbolsFontVariableClassName} ${ROOT_LAYOUT_BODY_CLASS}`;
