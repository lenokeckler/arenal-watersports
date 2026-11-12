import type { ExtraStatus } from "@/app/features/administration/extra-catalog/models/ExtraStatus.type";

export interface ExtraSeedInput {
  scenario: string;
  status: ExtraStatus;
}
