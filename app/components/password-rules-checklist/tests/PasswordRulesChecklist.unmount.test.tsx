import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  LOWERCASE_ONLY_RESULTS,
  NO_TIMERS,
} from "./PasswordRulesChecklist.constants";
import { renderChecklist } from "./renderPasswordRulesChecklist";

describe("PasswordRulesChecklist unmount", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("clears the pending timer when unmounted", () => {
    const { rerenderWith, unmount } = renderChecklist();
    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });

    unmount();

    expect(vi.getTimerCount()).toBe(NO_TIMERS);
  });
});
