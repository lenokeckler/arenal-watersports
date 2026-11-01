import type { UnitStatus } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";

export interface UnitFixtureSeed {
  code: string;
  status: UnitStatus;
}
