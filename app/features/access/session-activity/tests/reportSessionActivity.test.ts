import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SESSION_STATE,
  SUPABASE_RPC,
} from "@/app/constants";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { reportSessionActivity } from "../utils/reportSessionActivity";
import { REPORT_FIXTURE } from "./SessionActivity.constants";

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("reportSessionActivity", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(createBrowserSupabaseClient).mockReturnValue({
      rpc,
    } as unknown as ReturnType<
      typeof createBrowserSupabaseClient
    >);
  });

  it("records the action through the caller-only function", async () => {
    rpc.mockResolvedValue({
      data: SESSION_STATE.LIVE,
      error: null,
    });

    await reportSessionActivity();

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.TOUCH_CURRENT_SESSION_ACTIVITY
    );
  });

  it.each(Object.values(SESSION_STATE))(
    "returns the %s state the database reports",
    async (state) => {
      rpc.mockResolvedValue({ data: state, error: null });

      expect(await reportSessionActivity()).toBe(state);
    }
  );

  it("leaves the decision to the server when the call fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: new Error(REPORT_FIXTURE.ERROR_MESSAGE),
    });

    expect(await reportSessionActivity()).toBe(
      SESSION_STATE.LIVE
    );
  });

  it("leaves the decision to the server when the request throws", async () => {
    rpc.mockRejectedValue(
      new Error(REPORT_FIXTURE.ERROR_MESSAGE)
    );

    expect(await reportSessionActivity()).toBe(
      SESSION_STATE.LIVE
    );
  });

  it("leaves the decision to the server for an unknown answer", async () => {
    rpc.mockResolvedValue({
      data: REPORT_FIXTURE.UNKNOWN_ANSWER,
      error: null,
    });

    expect(await reportSessionActivity()).toBe(
      SESSION_STATE.LIVE
    );
  });
});
