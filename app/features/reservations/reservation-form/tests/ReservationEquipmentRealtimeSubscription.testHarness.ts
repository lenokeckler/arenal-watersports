import { vi } from "vitest";
import { RESERVATION_EQUIPMENT_REALTIME } from "../constants/ReservationEquipmentRealtime.constants";
import { subscribeToReservationEquipmentEligibility } from "../utils/subscribeToReservationEquipmentEligibility";
import { RESERVATION_EQUIPMENT_REALTIME_SUBSCRIPTION_TEST } from "./ReservationEquipmentRealtimeSubscription.constants";
import type { ReservationRealtimeTableFilter } from "./models/ReservationRealtimeTableFilter.interface";

export const createRealtimeSubscriptionHarness = () => {
  const eventHandlers: Array<() => void> = [];
  const registeredTables: string[] = [];
  const onChange = vi.fn();
  const channel = {
    on: vi.fn(
      (
        _event: string,
        filter: ReservationRealtimeTableFilter,
        handler: () => void
      ) => {
        registeredTables.push(filter.table);
        eventHandlers.push(handler);
        return channel;
      }
    ),
    subscribe: vi.fn(),
  };
  const supabase = {
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: {
          session: { access_token: "session-token" },
        },
        error: null,
      }),
    },
    channel: vi.fn(() => channel),
    realtime: { setAuth: vi.fn() },
  };
  const subscribe = (isActive: boolean) =>
    subscribeToReservationEquipmentEligibility({
      isActive: () => isActive,
      onChange,
      onStatus: vi.fn(),
      subscriptionAttempt:
        RESERVATION_EQUIPMENT_REALTIME_SUBSCRIPTION_TEST.INITIAL_ATTEMPT,
      supabase: supabase as never,
    });

  return {
    eventHandlers,
    onChange,
    registeredTables,
    subscribe,
    supabase,
  };
};

export const RESERVATION_REALTIME_TABLES = Object.values(
  RESERVATION_EQUIPMENT_REALTIME.TABLE
);
