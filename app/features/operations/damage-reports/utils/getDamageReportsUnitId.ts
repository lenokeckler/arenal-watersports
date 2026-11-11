import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";

export const getDamageReportsUnitId = (
  param: NullableUndefined<string | string[]>
): NullableRef<string> =>
  typeof param === "string" && param !== "" ? param : null;
