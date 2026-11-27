import { STRING } from "@/app/constants";
import { SYSTEM_NAVIGATION_INITIALS_LENGTH } from "../constants/SystemNavigationMenu.constants";

export const buildSystemNavigationInitials = (
  fullName: string
): string =>
  fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, SYSTEM_NAVIGATION_INITIALS_LENGTH)
    .map((word) => word.charAt(0))
    .join(STRING.Empty)
    .toLocaleUpperCase();
