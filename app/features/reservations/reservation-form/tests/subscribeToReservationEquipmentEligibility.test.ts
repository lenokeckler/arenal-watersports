import { describe, expect, it } from "vitest";
import { RESERVATION_EQUIPMENT_REALTIME } from "../constants/ReservationEquipmentRealtime.constants";
import {
  createRealtimeSubscriptionHarness,
  RESERVATION_REALTIME_TABLES,
} from "./ReservationEquipmentRealtimeSubscription.testHarness";

describe("subscribeToReservationEquipmentEligibility", () => {
  it("refreshes eligibility for every published inventory table", async () => {
    const harness = createRealtimeSubscriptionHarness();
    await harness.subscribe(true);
    harness.eventHandlers.forEach((handler) => handler());

    expect(harness.registeredTables).toEqual(
      RESERVATION_REALTIME_TABLES
    );
    expect(harness.onChange).toHaveBeenCalledTimes(
      harness.registeredTables.length
    );
    expect(harness.registeredTables).toContain(
      RESERVATION_EQUIPMENT_REALTIME.TABLE.DISPATCHES
    );
  });

  it("does not create a channel when the subscription is inactive", async () => {
    const harness = createRealtimeSubscriptionHarness();
    await harness.subscribe(false);

    expect(harness.supabase.channel).not.toHaveBeenCalled();
    expect(
      harness.supabase.realtime.setAuth
    ).not.toHaveBeenCalled();
  });
});
