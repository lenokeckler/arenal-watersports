import type { UnitFields } from "./UnitFields.interface";

export interface CreateUnitInput extends UnitFields {
  categoryId: string;
}
