import { describe, expect, it, vi } from "vitest";
import {
  SUPABASE_RPC,
  WORKER_ACCOUNT_RESULT,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { extendWorkerExpiry } from "../extendWorkerExpiry";

const EXTENSION = {
  expiresAt: "2026-12-05T23:59:59-06:00",
  workerId: "55555555-5555-5555-5555-555555555555",
};

const buildClient = (response: {
  data: unknown;
  error: unknown;
}) => {
  const rpc = vi.fn().mockResolvedValue(response);

  return {
    client: { rpc } as unknown as ServerSupabaseClient,
    rpc,
  };
};

describe("extendWorkerExpiry", () => {
  it("asks the database to extend the expiry of the worker", async () => {
    const { client, rpc } = buildClient({
      data: WORKER_ACCOUNT_RESULT.EXTENDED,
      error: null,
    });

    expect(
      await extendWorkerExpiry(client, EXTENSION)
    ).toBe(WORKER_ACCOUNT_RESULT.EXTENDED);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.EXTEND_WORKER_EXPIRY,
      {
        new_expires_at: EXTENSION.expiresAt,
        target_worker: EXTENSION.workerId,
      }
    );
  });

  it("passes a refusal from the database through", async () => {
    const { client } = buildClient({
      data: WORKER_ACCOUNT_RESULT.INVALID_DATE,
      error: null,
    });

    expect(
      await extendWorkerExpiry(client, EXTENSION)
    ).toBe(WORKER_ACCOUNT_RESULT.INVALID_DATE);
  });

  it("answers failed for a result it does not know", async () => {
    const { client } = buildClient({
      data: "something_else",
      error: null,
    });

    expect(
      await extendWorkerExpiry(client, EXTENSION)
    ).toBe(WORKER_ACCOUNT_RESULT.FAILED);
  });

  it("throws the database error", async () => {
    const { client } = buildClient({
      data: null,
      error: {
        code: "42501",
        message: "permission denied",
      },
    });

    await expect(
      extendWorkerExpiry(client, EXTENSION)
    ).rejects.toThrow(SUPABASE_RPC.EXTEND_WORKER_EXPIRY);
  });
});
