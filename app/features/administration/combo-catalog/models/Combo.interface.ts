import type { NullableRef } from "@/app/types";
import type { ComboAudience } from "./ComboAudience.type";
import type { ComboItem } from "./ComboItem.interface";
import type { ComboStatus } from "./ComboStatus.type";

export interface Combo {
  audience: ComboAudience;
  id: string;
  items: ComboItem[];
  name: string;
  packagePrice: NullableRef<number>;
  status: ComboStatus;
}
