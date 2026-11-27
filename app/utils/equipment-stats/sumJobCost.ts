import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import type { CurrencyCode } from "@/app/constants/money/CurrencyCode.constants";
import { MONEY_SCALE } from "@/app/constants/money/MoneyScale.constants";
import { safeNumber } from "@/app/utils/safe-value/SafeValue";

export const sumJobCost = (
  jobs: EquipmentJob[],
  currency: CurrencyCode
): number =>
  jobs.reduce(
    (cents, job) =>
      job.currency === currency
        ? cents +
          Math.round(
            safeNumber(job.costAmount) *
              MONEY_SCALE.CENTS_PER_UNIT
          )
        : cents,
    0
  ) / MONEY_SCALE.CENTS_PER_UNIT;
