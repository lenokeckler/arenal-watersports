import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { readSessionLiveness } from "../readSessionLiveness";
import type { ServerSupabaseClient } from "../models/ServerSupabaseClient.type";
import { LIVENESS_FIXTURE } from "./readSessionLiveness.constants";

const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));

const supabaseClient = {
  rpc,
} as unknown as ServerSupabaseClient;

describe("readSessionLiveness", () => {
  beforeEach(() => {
    rpc.mockReset();
  });

  it("calls the caller-only liveness function", async () => {
    rpc.mockResolvedValue({ data: true, error: null });

    await readSessionLiveness(supabaseClient);

    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.CURRENT_SESSION_IS_LIVE
    );
  });

  it("reports live when the database says true", async () => {
    rpc.mockResolvedValue({ data: true, error: null });

    expect(await readSessionLiveness(supabaseClient)).toBe(
      true
    );
  });

  it("reports not live when the database says false", async () => {
    rpc.mockResolvedValue({ data: false, error: null });

    expect(await readSessionLiveness(supabaseClient)).toBe(
      false
    );
  });

  it("keeps the session when the call returns an error", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: new Error(LIVENESS_FIXTURE.ERROR_MESSAGE),
    });

    expect(await readSessionLiveness(supabaseClient)).toBe(
      true
    );
  });

  it("keeps the session even when the error carries a false answer", async () => {
    rpc.mockResolvedValue({
      data: false,
      error: new Error(LIVENESS_FIXTURE.ERROR_MESSAGE),
    });

    expect(await readSessionLiveness(supabaseClient)).toBe(
      true
    );
  });
});
