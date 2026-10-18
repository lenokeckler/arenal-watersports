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

const mockRpcAnswer = (answer: unknown): void => {
  rpc.mockReturnValue({
    abortSignal: vi.fn().mockResolvedValue(answer),
  });
};

describe("readSessionLiveness", () => {
  beforeEach(() => {
    rpc.mockReset();
  });

  it("calls the caller-only liveness function", async () => {
    mockRpcAnswer({ data: true, error: null });

    await readSessionLiveness(supabaseClient);

    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.CURRENT_SESSION_IS_LIVE
    );
  });

  it("reports live when the database says true", async () => {
    mockRpcAnswer({ data: true, error: null });

    expect(await readSessionLiveness(supabaseClient)).toBe(
      true
    );
  });

  it("reports not live when the database says false", async () => {
    mockRpcAnswer({ data: false, error: null });

    expect(await readSessionLiveness(supabaseClient)).toBe(
      false
    );
  });

  it("keeps the session when the call returns an error", async () => {
    mockRpcAnswer({
      data: null,
      error: new Error(LIVENESS_FIXTURE.ERROR_MESSAGE),
    });

    expect(await readSessionLiveness(supabaseClient)).toBe(
      true
    );
  });

  it("keeps the session even when the error carries a false answer", async () => {
    mockRpcAnswer({
      data: false,
      error: new Error(LIVENESS_FIXTURE.ERROR_MESSAGE),
    });

    expect(await readSessionLiveness(supabaseClient)).toBe(
      true
    );
  });
});
