import type { NullableRef } from "@/app/types";
import type { UnitFields } from "./UnitFields.interface";

export interface Unit extends UnitFields {
  id: string;
  categoryId: string;
  decommissionedAt: NullableRef<string>;
  decommissionReason: NullableRef<string>;
}
