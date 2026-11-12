import { randomUUID } from "node:crypto";
import { STRING } from "@/app/constants";
import { E2E_DEPOSIT_CUSTOMER } from "../constants/E2ePendingDeposits.constants";

export const buildE2eCustomerName = (): string =>
  `${E2E_DEPOSIT_CUSTOMER.NAME_PREFIX}${randomUUID()
    .replaceAll("-", STRING.Empty)
    .slice(0, E2E_DEPOSIT_CUSTOMER.SUFFIX_LENGTH)}`;
