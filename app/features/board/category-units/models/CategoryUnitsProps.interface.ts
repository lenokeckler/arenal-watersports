import type { NullableUndefined } from "@/app/types";

export interface CategoryUnitsProps {
  canDispatch?: boolean;
  categoryId: string;
  pageParam: NullableUndefined<string | string[]>;
}
