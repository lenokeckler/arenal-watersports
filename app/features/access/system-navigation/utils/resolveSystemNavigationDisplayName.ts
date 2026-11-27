import type { SystemNavigationMenuIdentity } from "../models/SystemNavigationMenuIdentity.interface";

export const resolveSystemNavigationDisplayName = ({
  fullName,
  role,
  username,
}: SystemNavigationMenuIdentity): string => {
  const name = fullName.trim();

  return name.length > 0 && name !== role ? name : username;
};
