import type { NullableRef } from "@/app/types";
import type { ExtraStatus } from "@/app/features/administration/extra-catalog/models/ExtraStatus.type";

export interface ExtraSeedInput {
  scenario: string;
  status: ExtraStatus;
  priceUsd: NullableRef<number>;
  priceCrc: NullableRef<number>;
}
