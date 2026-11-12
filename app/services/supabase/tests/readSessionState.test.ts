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
  SESSION_STATE,
  SUPABASE_RPC,
} from "@/app/constants";
import { readSessionState } from "../readSessionState";
import type { ServerSupabaseClient } from "../models/ServerSupabaseClient.type";
import { SESSION_STATE_FIXTURE } from "./readSessionState.constants";

const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));

const supabaseClient = {
  rpc,
} as unknown as ServerSupabaseClient;

const mockRpcAnswer = (answer: unknown): Mock => {
  const abortSignal = vi.fn().mockResolvedValue(answer);
  rpc.mockReturnValue({ abortSignal });
  return abortSignal;
};

describe("readSessionState", () => {
  beforeEach(() => {
    rpc.mockReset();
  });

  it("calls the caller-only session state function", async () => {
    mockRpcAnswer({
      data: SESSION_STATE.LIVE,
      error: null,
    });

    await readSessionState(supabaseClient);

    expect(rpc).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.CURRENT_SESSION_STATE
    );
  });

  it.each(Object.values(SESSION_STATE))(
    "reports the %s state the database returns",
    async (state) => {
      mockRpcAnswer({ data: state, error: null });

      expect(await readSessionState(supabaseClient)).toBe(
        state
      );
    }
  );

  it.each(SESSION_STATE_FIXTURE.UNKNOWN_ANSWERS)(
    "reports an ended session for the unknown answer %j",
    async (answer) => {
      mockRpcAnswer({ data: answer, error: null });

      expect(await readSessionState(supabaseClient)).toBe(
        SESSION_STATE.ENDED
      );
    }
  );

  it.each(SESSION_STATE_FIXTURE.CLIENT_ERROR_STATUSES)(
    "reports an ended session when the call is refused with status %s",
    async (status) => {
      mockRpcAnswer({
        data: null,
        error: new Error(
          SESSION_STATE_FIXTURE.ERROR_MESSAGE
        ),
        status,
      });

      expect(await readSessionState(supabaseClient)).toBe(
        SESSION_STATE.ENDED
      );
    }
  );

  it.each([
    ...SESSION_STATE_FIXTURE.SERVER_ERROR_STATUSES,
    ...SESSION_STATE_FIXTURE.NO_RESPONSE_STATUSES,
  ])(
    "keeps the session live when the server fails or does not answer with status %s",
    async (status) => {
      mockRpcAnswer({
        data: null,
        error: new Error(
          SESSION_STATE_FIXTURE.ERROR_MESSAGE
        ),
        status,
      });

      expect(await readSessionState(supabaseClient)).toBe(
        SESSION_STATE.LIVE
      );
    }
  );

  it("bounds the call with a timeout signal", async () => {
    const abortSignal = mockRpcAnswer({
      data: SESSION_STATE.LIVE,
      error: null,
    });
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout");

    await readSessionState(supabaseClient);

    expect(timeoutSpy).toHaveBeenCalledWith(
      SESSION_LIVENESS.TIMEOUT_MS
    );
    expect(abortSignal).toHaveBeenCalledWith(
      timeoutSpy.mock.results[0].value
    );
    timeoutSpy.mockRestore();
  });
});
