import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import {
  SESSION_LIVENESS,
  SUPABASE_RPC,
} from "@/app/constants";
import { readSessionLiveness } from "../readSessionLiveness";
import type { ServerSupabaseClient } from "../models/ServerSupabaseClient.type";
import { LIVENESS_FIXTURE } from "./readSessionLiveness.constants";

const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));

const supabaseClient = {
  rpc,
} as unknown as ServerSupabaseClient;

const mockRpcAnswer = (answer: unknown): Mock => {
  const abortSignal = vi.fn().mockResolvedValue(answer);
  rpc.mockReturnValue({ abortSignal });
  return abortSignal;
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

  it.each(LIVENESS_FIXTURE.CLIENT_ERROR_STATUSES)(
    "reports not live when the call is refused with status %s",
    async (status) => {
      mockRpcAnswer({
        data: null,
        error: new Error(LIVENESS_FIXTURE.ERROR_MESSAGE),
        status,
      });

      expect(
        await readSessionLiveness(supabaseClient)
      ).toBe(false);
    }
  );

  it.each(LIVENESS_FIXTURE.SERVER_ERROR_STATUSES)(
    "keeps the session when the server fails with status %s",
    async (status) => {
      mockRpcAnswer({
        data: null,
        error: new Error(LIVENESS_FIXTURE.ERROR_MESSAGE),
        status,
      });

      expect(
        await readSessionLiveness(supabaseClient)
      ).toBe(true);
    }
  );

  it.each(LIVENESS_FIXTURE.NO_RESPONSE_STATUSES)(
    "keeps the session when there is no response and the status is %s",
    async (status) => {
      mockRpcAnswer({
        data: null,
        error: new Error(LIVENESS_FIXTURE.ERROR_MESSAGE),
        status,
      });

      expect(
        await readSessionLiveness(supabaseClient)
      ).toBe(true);
    }
  );

  it("bounds the call with a timeout signal", async () => {
    const abortSignal = mockRpcAnswer({
      data: true,
      error: null,
    });
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout");

    await readSessionLiveness(supabaseClient);

    expect(timeoutSpy).toHaveBeenCalledWith(
      SESSION_LIVENESS.TIMEOUT_MS
    );
    expect(abortSignal).toHaveBeenCalledWith(
      timeoutSpy.mock.results[0].value
    );
    timeoutSpy.mockRestore();
  });
});
