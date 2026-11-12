import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const MATERIAL_ICON_CLASS =
  "material-symbols-outlined";

export const resolveMaterialIconClassName = (
  className: string
): string => joinClassNames(MATERIAL_ICON_CLASS, className);
