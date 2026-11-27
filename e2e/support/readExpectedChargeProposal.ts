import { expect } from "@playwright/test";
import {
  E2E_RESERVATION_CHARGE as values,
  E2E_RESERVATION_CHARGE_SEED as seed,
} from "../constants/E2eReservationCharge.constants";
import { calculateExpectedChargeProposal } from "./calculateExpectedChargeProposal";
import { readReservationChargeTariff } from "./readReservationChargeTariff";

export const readExpectedChargeProposal = async (
  workerId: string,
  reservationId: string
): Promise<number> => {
  const tariff = await readReservationChargeTariff(
    workerId,
    reservationId
  );
  const peopleCount = Number(values.PEOPLE_COUNT);
  const expected = calculateExpectedChargeProposal(
    tariff.amountUsd
  );
  expect(tariff.amountUsd).toBe(Number(seed.tariff_usd));
  expect(tariff.amountCrc).toBe(Number(seed.tariff_crc));
  expect(expected).not.toBe(tariff.amountUsd * peopleCount);
  expect(expected).not.toBe(tariff.amountUsd);

  return expected;
};
