import type { NullableRef } from "@/app/types";
import type { ComboAudience } from "./ComboAudience.type";
import type { ComboForEditItem } from "./ComboForEditItem.interface";

export interface ComboForEdit {
  audience: ComboAudience;
  id: string;
  items: ComboForEditItem[];
  name: string;
  packagePrice: NullableRef<number>;
}
