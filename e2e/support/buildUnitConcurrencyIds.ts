import { createHash } from "node:crypto";
import {
  E2E_UNIT_CONCURRENCY,
  E2E_UNIT_CONCURRENCY_ROLE,
} from "../constants/E2eUnitConcurrency.constants";
import type { UnitConcurrencyIds } from "./models/UnitConcurrencyIds.interface";

const UUID_GROUPS = [8, 4, 4, 4, 12];

const buildDeterministicUuid = (key: string): string => {
  const hex = createHash("md5").update(key).digest("hex");
  let offset = 0;

  return UUID_GROUPS.map((size) => {
    const group = hex.slice(offset, offset + size);
    offset += size;

    return group;
  }).join("-");
};

export const buildUnitConcurrencyIds = (
  scenario: string
): UnitConcurrencyIds => {
  const idOf = (role: string): string =>
    buildDeterministicUuid(
      `${E2E_UNIT_CONCURRENCY.KEY_PREFIX}-${scenario}-${role}`
    );

  return {
    categoryId: idOf(E2E_UNIT_CONCURRENCY_ROLE.CATEGORY),
    dispatchId: idOf(E2E_UNIT_CONCURRENCY_ROLE.DISPATCH),
    reservationId: idOf(
      E2E_UNIT_CONCURRENCY_ROLE.RESERVATION
    ),
    unitCode: `${E2E_UNIT_CONCURRENCY.UNIT_CODE_PREFIX}-${scenario}`,
    unitId: idOf(E2E_UNIT_CONCURRENCY_ROLE.UNIT),
  };
};
