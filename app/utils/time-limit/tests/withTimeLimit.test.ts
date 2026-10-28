import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { TIME_LIMIT } from "@/app/constants";
import { withTimeLimit } from "../withTimeLimit";
import { TIME_LIMIT_FIXTURE } from "./withTimeLimit.constants";

describe("withTimeLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves to the value when it settles within the limit", async () => {
    await expect(
      withTimeLimit(
        Promise.resolve(TIME_LIMIT_FIXTURE.VALUE),
        TIME_LIMIT_FIXTURE.LIMIT_MS
      )
    ).resolves.toBe(TIME_LIMIT_FIXTURE.VALUE);
  });

  it("clears its timer once the promise settles", async () => {
    await withTimeLimit(
      Promise.resolve(TIME_LIMIT_FIXTURE.VALUE),
      TIME_LIMIT_FIXTURE.LIMIT_MS
    );

    expect(vi.getTimerCount()).toBe(0);
  });

  it("rejects with the original reason when the promise fails within the limit", async () => {
    await expect(
      withTimeLimit(
        Promise.reject(
          new Error(TIME_LIMIT_FIXTURE.FAILURE)
        ),
        TIME_LIMIT_FIXTURE.LIMIT_MS
      )
    ).rejects.toThrow(TIME_LIMIT_FIXTURE.FAILURE);
  });

  it("resolves to the sentinel when the promise outlives the limit", async () => {
    const result = withTimeLimit(
      new Promise<string>(() => undefined),
      TIME_LIMIT_FIXTURE.LIMIT_MS
    );

    await vi.advanceTimersByTimeAsync(
      TIME_LIMIT_FIXTURE.LIMIT_MS
    );

    await expect(result).resolves.toBe(TIME_LIMIT.REACHED);
  });

  it("does not resolve before the limit", async () => {
    const onSettled = vi.fn();
    void withTimeLimit(
      new Promise<string>(() => undefined),
      TIME_LIMIT_FIXTURE.LIMIT_MS
    ).then(onSettled);

    await vi.advanceTimersByTimeAsync(
      TIME_LIMIT_FIXTURE.LIMIT_MS - 1
    );

    expect(onSettled).not.toHaveBeenCalled();
  });

  it("leaves no unhandled rejection when the promise fails after the limit", async () => {
    let failLate: (reason: Error) => void = () => undefined;
    const late = new Promise<string>((_, reject) => {
      failLate = reject;
    });
    const result = withTimeLimit(
      late,
      TIME_LIMIT_FIXTURE.LIMIT_MS
    );

    await vi.advanceTimersByTimeAsync(
      TIME_LIMIT_FIXTURE.LIMIT_MS
    );
    failLate(new Error(TIME_LIMIT_FIXTURE.FAILURE));
    await vi.advanceTimersByTimeAsync(0);

    await expect(result).resolves.toBe(TIME_LIMIT.REACHED);
  });
});
