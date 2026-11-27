import { vi } from "vitest";
import type { EquipmentSupabaseClient } from "../models/EquipmentSupabaseClient.type";

export const createQueryRecorder = (result: {
  count?: number;
  data?: unknown[];
}) => {
  const calls: Record<
    string,
    ReturnType<typeof vi.fn>
  > = {};
  const builder: Record<string, unknown> = {
    then: (resolve: (value: unknown) => void) =>
      resolve({ error: null, ...result }),
  };
  [
    "eq",
    "gte",
    "limit",
    "lt",
    "neq",
    "order",
    "select",
  ].forEach((name) => {
    calls[name] = vi.fn(() => builder);
    builder[name] = calls[name];
  });
  const client = {
    from: vi.fn(() => builder),
  } as unknown as EquipmentSupabaseClient;

  return { calls, client };
};
