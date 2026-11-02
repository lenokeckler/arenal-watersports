import { randomUUID } from "node:crypto";
import { STRING } from "@/app/constants";
import { E2E_INCOME_METHOD } from "../constants/E2eDailyIncome.constants";

export const buildE2ePaymentMethod = (): string =>
  `${E2E_INCOME_METHOD.NAME_PREFIX}${randomUUID()
    .replaceAll("-", STRING.Empty)
    .slice(0, E2E_INCOME_METHOD.SUFFIX_LENGTH)}`;
