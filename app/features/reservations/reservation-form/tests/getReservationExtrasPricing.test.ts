import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_SCHEDULE } from "../constants/ReservationSchedule.constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationExtrasPricing } from "../services/getReservationExtrasPricing";
import { RESERVATION_EXTRAS_PRICING_INPUT_TEST } from "./isReservationExtrasPricingInput.constants";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("getReservationExtrasPricing", () => {
  beforeEach(() => vi.clearAllMocks());

  it("maps the database quote without accepting client prices", async () => {
    const rpc = vi.fn().mockResolvedValue({
      data: [
        {
          has_boat_tariff: true,
          list_amount_crc: 23000,
          list_amount_usd: 43,
        },
      ],
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue({
      rpc,
    } as never);
    await expect(
      getReservationExtrasPricing(
        RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
      )
    ).resolves.toEqual(
      RESERVATION_EXTRAS_PRICING_INPUT_TEST.PRICING
    );
    expect(rpc).toHaveBeenCalledWith(
      "reservation_extras_price_quote",
      {
        p_duration_minutes:
          RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
            .durationHours *
          RESERVATION_SCHEDULE.MINUTES_PER_HOUR,
        p_extra_ids:
          RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
            .extraIds,
        p_reservation_type:
          RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
            .reservationType,
        p_unit_id:
          RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
            .unitId,
      }
    );
  });

  it("keeps a missing boat tariff explicit in the result", async () => {
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue({
      rpc: vi.fn().mockResolvedValue({
        data: [
          {
            has_boat_tariff: false,
            list_amount_crc: null,
            list_amount_usd: null,
          },
        ],
        error: null,
      }),
    } as never);
    await expect(
      getReservationExtrasPricing(
        RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
      )
    ).resolves.toEqual({
      hasBoatTariff: false,
      listAmountCrc: null,
      listAmountUsd: null,
    });
  });

  it("preserves operation context when the database quote fails", async () => {
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue({
      rpc: vi.fn().mockResolvedValue({
        data: null,
        error: { code: "XX000", message: "Quote failed" },
      }),
    } as never);
    await expect(
      getReservationExtrasPricing(
        RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
      )
    ).rejects.toThrow(
      `Supabase query failed: ${RESERVATION_SERVICE_OPERATION.LOAD_EXTRAS_PRICING}`
    );
  });
});
