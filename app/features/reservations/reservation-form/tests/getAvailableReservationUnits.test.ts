import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import {
  AVAILABLE_UNIT_TEST,
  CLOSED_DISPATCH_RESERVATION_UNIT_COMMITMENT_FIXTURE,
  OVERDUE_RESERVATION_UNIT_COMMITMENT_FIXTURE,
  RESERVATION_UNIT_COMMITMENT_FIXTURE,
} from "./getAvailableReservationUnits.constants";
import { createReservationAvailabilityClient } from "./createReservationAvailabilityClient";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const loadAvailability = (quantity = 1) =>
  getAvailableReservationUnits({
    categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
    date: AVAILABLE_UNIT_TEST.DATE,
    durationMinutes: AVAILABLE_UNIT_TEST.DURATION_MINUTES,
    quantity,
    time: AVAILABLE_UNIT_TEST.TIME,
  });

const mockAvailabilityClient = (
  quantity: number,
  units: ReservationCategoryUnitOption[],
  interchangeable: boolean,
  commitments: ReservationUnitCommitment[] = []
) => {
  const client = createReservationAvailabilityClient(
    quantity,
    units,
    commitments,
    interchangeable
  );
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue(client.client);
  return client;
};

describe("getAvailableReservationUnits", () => {
  beforeEach(() => vi.clearAllMocks());

  it("excludes overlapping reservations using a batch read", async () => {
    const unit = {
      code: AVAILABLE_UNIT_TEST.UNIT_CODE,
      id: AVAILABLE_UNIT_TEST.UNIT_ID,
    };
    const client = mockAvailabilityClient(
      0,
      [unit],
      false,
      [RESERVATION_UNIT_COMMITMENT_FIXTURE]
    );

    await expect(loadAvailability()).resolves.toEqual({
      availableQuantity: 0,
      availableUnits: [],
      hasRequestedQuantity: false,
    });
    expect(client.requestPaths).toHaveLength(4);
  });

  it("returns available concrete units from the batch read", async () => {
    const units = [
      {
        code: AVAILABLE_UNIT_TEST.UNIT_CODE,
        id: AVAILABLE_UNIT_TEST.UNIT_ID,
      },
      {
        code: AVAILABLE_UNIT_TEST.SECOND_UNIT_CODE,
        id: AVAILABLE_UNIT_TEST.SECOND_UNIT_ID,
      },
    ];
    const client = mockAvailabilityClient(2, units, false);

    await expect(loadAvailability()).resolves.toEqual({
      availableQuantity: 2,
      availableUnits: units,
      hasRequestedQuantity: true,
    });
    expect(client.requestPaths).toHaveLength(4);
  });

  it("returns category stock and requested quantity availability", async () => {
    const client = mockAvailabilityClient(2, [], true);

    await expect(loadAvailability(3)).resolves.toEqual({
      availableQuantity: 2,
      availableUnits: [],
      hasRequestedQuantity: false,
    });
    expect(client.requestPaths).toHaveLength(2);
  });

  it("keeps overdue open dispatches unavailable", async () => {
    const unit = {
      code: AVAILABLE_UNIT_TEST.UNIT_CODE,
      id: AVAILABLE_UNIT_TEST.UNIT_ID,
    };
    mockAvailabilityClient(0, [unit], false, [
      OVERDUE_RESERVATION_UNIT_COMMITMENT_FIXTURE,
    ]);

    await expect(loadAvailability()).resolves.toMatchObject(
      {
        availableQuantity: 0,
        availableUnits: [],
        hasRequestedQuantity: false,
      }
    );
  });

  it("releases a concrete unit after a dispatch is closed", async () => {
    const unit = {
      code: AVAILABLE_UNIT_TEST.UNIT_CODE,
      id: AVAILABLE_UNIT_TEST.UNIT_ID,
    };
    const client = mockAvailabilityClient(
      0,
      [unit],
      false,
      [CLOSED_DISPATCH_RESERVATION_UNIT_COMMITMENT_FIXTURE]
    );

    await expect(loadAvailability()).resolves.toEqual({
      availableQuantity: 1,
      availableUnits: [unit],
      hasRequestedQuantity: true,
    });
    expect(client.requestPaths).toHaveLength(4);
  });
});
