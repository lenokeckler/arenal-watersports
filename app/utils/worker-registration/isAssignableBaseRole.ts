import {
  ASSIGNABLE_BASE_ROLES,
  type AssignableBaseRole,
} from "@/app/constants";

const ASSIGNABLE_ROLES: readonly string[] =
  ASSIGNABLE_BASE_ROLES;

export const isAssignableBaseRole = (
  baseRole: string
): baseRole is AssignableBaseRole =>
  ASSIGNABLE_ROLES.includes(baseRole);
