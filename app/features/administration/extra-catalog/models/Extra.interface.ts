import type { NullableRef } from "@/app/types";
import type { ExtraStatus } from "./ExtraStatus.type";

export interface Extra {
  id: string;
  name: string;
  status: ExtraStatus;
  priceUsd: NullableRef<number>;
  priceCrc: NullableRef<number>;
  occupiesCategoryId: NullableRef<string>;
  occupiesQuantity: NullableRef<number>;
  occupiedCategoryName: NullableRef<string>;
  compatibleUnitCount: number;
}
