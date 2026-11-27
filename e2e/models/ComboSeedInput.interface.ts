import type { ComboAudience } from "@/app/features/administration/combo-catalog/models/ComboAudience.type";
import type { ComboStatus } from "@/app/features/administration/combo-catalog/models/ComboStatus.type";

export interface ComboSeedInput {
  audience: ComboAudience;
  price: number;
  scenario: string;
  status: ComboStatus;
}
