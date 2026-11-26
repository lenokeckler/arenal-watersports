import type { NullableUndefined } from "@/app/types";

export interface CategoryUnitsProps {
  canDispatch?: boolean;
  categoryId: string;
  statusParam?: NullableUndefined<string | string[]>;
  pageParam: NullableUndefined<string | string[]>;
}
