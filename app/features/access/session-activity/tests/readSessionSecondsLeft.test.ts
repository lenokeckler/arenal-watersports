import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { createBrowserSupabaseClient } from "@/app/services/supabase/client";
import { SESSION_CLOCK } from "../constants/SessionClock.constants";
import { readSessionSecondsLeft } from "../utils/readSessionSecondsLeft";
import {
  CLOCK_FIXTURE,
  REPORT_FIXTURE,
} from "./SessionActivity.constants";

vi.mock("@/app/services/supabase/client", () => ({
  createBrowserSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("readSessionSecondsLeft", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(createBrowserSupabaseClient).mockReturnValue({
      rpc,
    } as unknown as ReturnType<
      typeof createBrowserSupabaseClient
    >);
  });

  it("asks the database through the caller-only function", async () => {
    rpc.mockResolvedValue({
      data: CLOCK_FIXTURE.NIGHT_SECONDS_LEFT,
      error: null,
    });

    await readSessionSecondsLeft();

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.CURRENT_SESSION_SECONDS_LEFT
    );
  });

  it("returns the seconds a live session has left", async () => {
    rpc.mockResolvedValue({
      data: CLOCK_FIXTURE.NIGHT_SECONDS_LEFT,
      error: null,
    });

    expect(await readSessionSecondsLeft()).toEqual({
      kind: SESSION_CLOCK.LIVE,
      secondsLeft: CLOCK_FIXTURE.NIGHT_SECONDS_LEFT,
    });
  });

  it("reports a session the database no longer keeps", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    expect(await readSessionSecondsLeft()).toEqual({
      kind: SESSION_CLOCK.OVER,
    });
  });

  it("does not know when the call fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: new Error(REPORT_FIXTURE.ERROR_MESSAGE),
    });

    expect(await readSessionSecondsLeft()).toEqual({
      kind: SESSION_CLOCK.UNKNOWN,
    });
  });

  it("does not know when the request throws", async () => {
    rpc.mockRejectedValue(
      new Error(REPORT_FIXTURE.ERROR_MESSAGE)
    );

    expect(await readSessionSecondsLeft()).toEqual({
      kind: SESSION_CLOCK.UNKNOWN,
    });
  });

  it("does not trust an answer that is not a number", async () => {
    rpc.mockResolvedValue({
      data: CLOCK_FIXTURE.TEXT_ANSWER,
      error: null,
    });

    expect(await readSessionSecondsLeft()).toEqual({
      kind: SESSION_CLOCK.UNKNOWN,
    });
  });
});
