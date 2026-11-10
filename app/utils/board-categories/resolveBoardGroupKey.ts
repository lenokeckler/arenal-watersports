import type { NullableRef } from "@/app/types";

export const resolveBoardGroupKey = (
  groupName: NullableRef<string>
): NullableRef<string> => {
  if (!groupName || groupName.trim().length === 0) {
    return null;
  }

  return groupName.toLowerCase();
};
