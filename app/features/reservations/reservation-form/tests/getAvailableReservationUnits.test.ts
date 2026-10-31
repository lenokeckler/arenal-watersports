import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationEquipmentAvailability } from "../models/ReservationEquipmentAvailability.interface";
import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import {
  AVAILABLE_UNIT_TEST,
  CLOSED_DISPATCH_RESERVATION_UNIT_COMMITMENT_FIXTURE,
  OVERDUE_RESERVATION_UNIT_COMMITMENT_FIXTURE,
  RESERVATION_AVAILABILITY_INPUT_FIXTURE,
} from "./getAvailableReservationUnits.constants";
import { createReservationAvailabilityClient } from "./createReservationAvailabilityClient";
import type { ReservationAvailabilityClientOptions } from "./models/ReservationAvailabilityClientOptions.interface";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const mockAvailabilityClient = (
  units: ReservationCategoryUnitOption[],
  commitments: ReservationUnitCommitment[] = [],
  options: ReservationAvailabilityClientOptions = {}
) => {
  const fixture = createReservationAvailabilityClient(
    units,
    commitments,
    options
  );
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue(fixture.client);
  return fixture;
};

const loadAvailability = () =>
  getAvailableReservationUnits(
    RESERVATION_AVAILABILITY_INPUT_FIXTURE
  );

const makeUnit = (
  code: string,
  id: string
): ReservationCategoryUnitOption => ({ code, id });

const unitAvailability = (
  availableUnits: ReservationCategoryUnitOption[]
): ReservationEquipmentAvailability => ({
  availableQuantity: null,
  availableUnits,
});

describe("getAvailableReservationUnits", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads all unit commitments in one batch", async () => {
    const units = [
      makeUnit(
        AVAILABLE_UNIT_TEST.UNIT_CODE,
        AVAILABLE_UNIT_TEST.UNIT_ID
      ),
      makeUnit(
        AVAILABLE_UNIT_TEST.SECOND_UNIT_CODE,
        AVAILABLE_UNIT_TEST.SECOND_UNIT_ID
      ),
    ];
    const fixture = mockAvailabilityClient(units);

    await expect(loadAvailability()).resolves.toEqual(
      unitAvailability(units)
    );
    expect(fixture.requestPaths).toHaveLength(3);
  });

  it("keeps an overdue open dispatch occupied", async () => {
    const unit = makeUnit(
      AVAILABLE_UNIT_TEST.UNIT_CODE,
      AVAILABLE_UNIT_TEST.UNIT_ID
    );
    mockAvailabilityClient(
      [unit],
      [OVERDUE_RESERVATION_UNIT_COMMITMENT_FIXTURE]
    );

    await expect(loadAvailability()).resolves.toEqual(
      unitAvailability([])
    );
  });

  it("releases a unit after its dispatch closes", async () => {
    const unit = makeUnit(
      AVAILABLE_UNIT_TEST.UNIT_CODE,
      AVAILABLE_UNIT_TEST.UNIT_ID
    );
    mockAvailabilityClient(
      [unit],
      [CLOSED_DISPATCH_RESERVATION_UNIT_COMMITMENT_FIXTURE]
    );

    await expect(loadAvailability()).resolves.toEqual(
      unitAvailability([unit])
    );
  });

  it("returns zero free quantity for an interchangeable category", async () => {
    const fixture = mockAvailabilityClient([], [], {
      availableQuantity: AVAILABLE_UNIT_TEST.FREE_QUANTITY,
      categoryIsInterchangeable: true,
    });

    await expect(loadAvailability()).resolves.toEqual({
      availableQuantity: AVAILABLE_UNIT_TEST.FREE_QUANTITY,
      availableUnits: [],
    });
    expect(
      fixture.requestPaths.some((path) =>
        path.endsWith(
          AVAILABLE_UNIT_TEST.CATEGORY_AVAILABILITY_RPC_PATH
        )
      )
    ).toBe(true);
  });

  it("fails when interval quantity is missing", async () => {
    mockAvailabilityClient([], [], {
      categoryIsInterchangeable: true,
      hasCategoryAvailabilityRow: false,
    });

    await expect(loadAvailability()).rejects.toThrow(
      RESERVATION_AVAILABILITY.ERROR
        .CATEGORY_AVAILABILITY_MISSING
    );
  });
});
