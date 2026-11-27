import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { resolveHistoryWindow } from "../resolveHistoryWindow";

describe("resolveHistoryWindow", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("covers six months ending on the Costa Rican day", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-12-01T03:00:00Z"));

    const window = resolveHistoryWindow();

    expect(window.today).toBe("2026-11-30");
    expect(window.currentMonth).toBe("2026-11");
    expect(window.months).toHaveLength(6);
    expect(window.since).toBe("2026-06-01");
  });
});
