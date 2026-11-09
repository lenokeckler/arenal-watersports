import { describe, expect, it, vi } from "vitest";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import { createReservationAvailabilityClient } from "./createReservationAvailabilityClient";
import {
  AVAILABLE_UNIT_OPTION_FIXTURE,
  AVAILABLE_UNIT_TEST as test,
  EXCLUDED_RESERVATION_COMMITMENT_FILTER,
  RESERVATION_AVAILABILITY_EXCLUDING_INPUT_FIXTURE as excludingInput,
  RESERVATION_AVAILABILITY_INPUT_FIXTURE as plainInput,
} from "./getAvailableReservationUnits.constants";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const loadRequestLog = async (
  input: ReservationUnitAvailabilityInput,
  categoryIsInterchangeable: boolean
) => {
  const fixture = createReservationAvailabilityClient(
    [AVAILABLE_UNIT_OPTION_FIXTURE],
    [],
    { categoryIsInterchangeable }
  );
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue(fixture.client);
  await getAvailableReservationUnits(input);
  return fixture.requestLog.join();
};

describe("getAvailableReservationUnits exclusion", () => {
  it("filters unit commitments only when a reservation is excluded", async () => {
    expect(
      await loadRequestLog(excludingInput, false)
    ).toContain(EXCLUDED_RESERVATION_COMMITMENT_FILTER);
    expect(
      await loadRequestLog(plainInput, false)
    ).not.toContain(EXCLUDED_RESERVATION_COMMITMENT_FILTER);
  });

  it("sends the category RPC argument only when a reservation is excluded", async () => {
    expect(
      await loadRequestLog(excludingInput, true)
    ).toContain(test.EXCLUDED_RESERVATION_ID);
    expect(
      await loadRequestLog(plainInput, true)
    ).not.toContain(test.EXCLUDED_RESERVATION_RPC_ARGUMENT);
  });
});
