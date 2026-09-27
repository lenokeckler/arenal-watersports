import { STRING } from "@/app/constants";
import type { Nullable } from "@/app/types";

export const joinClassNames = (
  ...classNames: Array<Nullable<string | false>>
): string => classNames.filter(Boolean).join(STRING.SPACE);
