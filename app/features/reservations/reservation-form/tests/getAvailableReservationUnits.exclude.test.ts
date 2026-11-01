import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import { createReservationAvailabilityClient } from "./createReservationAvailabilityClient";
import {
  AVAILABLE_UNIT_OPTION_FIXTURE,
  AVAILABLE_UNIT_TEST,
  EXCLUDED_RESERVATION_COMMITMENT_FILTER,
  RESERVATION_AVAILABILITY_EXCLUDING_INPUT_FIXTURE,
  RESERVATION_AVAILABILITY_INPUT_FIXTURE,
} from "./getAvailableReservationUnits.constants";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const mockClient = (categoryIsInterchangeable: boolean) => {
  const fixture = createReservationAvailabilityClient(
    [AVAILABLE_UNIT_OPTION_FIXTURE],
    [],
    { categoryIsInterchangeable }
  );
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue(fixture.client);
  return fixture.requests;
};

const readCommitmentFilter = (
  requests: ReturnType<typeof mockClient>
) =>
  requests
    .map((request) => new URL(request.url))
    .find((url) =>
      url.pathname.endsWith(
        AVAILABLE_UNIT_TEST.COMMITMENTS_PATH
      )
    )
    ?.searchParams.get(
      RESERVATION_AVAILABILITY.EXCLUDED_RESERVATION_COLUMN
    );

const readCategoryAvailabilityBody = (
  requests: ReturnType<typeof mockClient>
) =>
  requests.find((request) =>
    request.url.endsWith(
      AVAILABLE_UNIT_TEST.CATEGORY_AVAILABILITY_RPC_PATH
    )
  )?.body;

describe("getAvailableReservationUnits exclusion", () => {
  beforeEach(() => vi.clearAllMocks());

  it("sends the excluded reservation to the unit commitments read", async () => {
    const requests = mockClient(false);

    await getAvailableReservationUnits(
      RESERVATION_AVAILABILITY_EXCLUDING_INPUT_FIXTURE
    );

    expect(readCommitmentFilter(requests)).toBe(
      EXCLUDED_RESERVATION_COMMITMENT_FILTER
    );
  });

  it("sends the excluded reservation to the category availability RPC", async () => {
    const requests = mockClient(true);

    await getAvailableReservationUnits(
      RESERVATION_AVAILABILITY_EXCLUDING_INPUT_FIXTURE
    );

    expect(
      readCategoryAvailabilityBody(requests)
    ).toContain(
      AVAILABLE_UNIT_TEST.EXCLUDED_RESERVATION_ID
    );
  });

  it("keeps the unit commitments read unfiltered without an excluded reservation", async () => {
    const requests = mockClient(false);

    await getAvailableReservationUnits(
      RESERVATION_AVAILABILITY_INPUT_FIXTURE
    );

    expect(readCommitmentFilter(requests)).toBeNull();
  });

  it("keeps the category availability RPC body without an excluded reservation", async () => {
    const requests = mockClient(true);

    await getAvailableReservationUnits(
      RESERVATION_AVAILABILITY_INPUT_FIXTURE
    );

    expect(
      readCategoryAvailabilityBody(requests)
    ).not.toContain(
      AVAILABLE_UNIT_TEST.EXCLUDED_RESERVATION_RPC_ARGUMENT
    );
  });
});
