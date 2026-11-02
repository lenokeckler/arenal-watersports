import { describe, expect, it, vi } from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { assertIsAdminWorker } from "../assertIsAdminWorker";
import { NotAuthorizedError } from "../NotAuthorizedError";

const FAKE_ADMIN_WORKER_ID = "fake-admin-worker-id";

const createFakeSupabaseClient = (
  userId: NullableRef<string>,
  isAdmin: boolean
): ServerSupabaseClient =>
  ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: userId ? { id: userId } : null },
        error: null,
      }),
    },
    rpc: vi
      .fn()
      .mockResolvedValue({ data: isAdmin, error: null }),
  }) as unknown as ServerSupabaseClient;

describe("assertIsAdminWorker", () => {
  it("throws NotAuthorizedError when there is no signed-in user", async () => {
    const supabase = createFakeSupabaseClient(null, true);

    await expect(
      assertIsAdminWorker(supabase)
    ).rejects.toThrow(NotAuthorizedError);
  });

  it("throws NotAuthorizedError when the worker is not an admin", async () => {
    const supabase = createFakeSupabaseClient(
      FAKE_ADMIN_WORKER_ID,
      false
    );

    await expect(
      assertIsAdminWorker(supabase)
    ).rejects.toThrow(NotAuthorizedError);
  });

  it("resolves with the worker id when the worker is an admin", async () => {
    const supabase = createFakeSupabaseClient(
      FAKE_ADMIN_WORKER_ID,
      true
    );

    await expect(
      assertIsAdminWorker(supabase)
    ).resolves.toBe(FAKE_ADMIN_WORKER_ID);
  });
});
