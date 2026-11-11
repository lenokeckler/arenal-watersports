import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STRING } from "@/app/constants";
import { PASSWORD_RULES_ANNOUNCEMENT } from "../constants/PasswordRulesAnnouncement.constants";
import { PASSWORD_RULES_COPY } from "../constants/PasswordRulesCopy.constants";
import {
  ALL_PENDING_RESULTS,
  DIGIT_ONLY_RESULTS,
  LOWERCASE_AND_DIGIT_RESULTS,
  LOWERCASE_ONLY_RESULTS,
  NO_CHANGES,
  NO_TIMERS,
  ONE_MS,
  RAPID_TYPING_INTERVAL_MS,
  SINGLE_CHANGE,
  THREE_MET_RESULTS,
  THREE_MET_RULES,
  TOTAL_RULES,
  TWO_MET_RULES,
  ZERO_MET_RULES,
} from "./PasswordRulesChecklist.constants";
import {
  advance,
  renderChecklist,
} from "./renderPasswordRulesChecklist";

const DEBOUNCE_MS = PASSWORD_RULES_ANNOUNCEMENT.DEBOUNCE_MS;

describe("PasswordRulesChecklist debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("announces only the last count once after rapid typing", () => {
    const { page, rerenderWith } = renderChecklist();
    const observer = page.observeStatus();

    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });
    advance(RAPID_TYPING_INTERVAL_MS);
    rerenderWith({ results: LOWERCASE_AND_DIGIT_RESULTS });
    advance(RAPID_TYPING_INTERVAL_MS);
    rerenderWith({ results: THREE_MET_RESULTS });
    advance(DEBOUNCE_MS - ONE_MS);

    expect(page.getStatus()).toHaveTextContent(
      STRING.Empty
    );

    advance(ONE_MS);

    expect(page.getStatus()).toHaveTextContent(
      PASSWORD_RULES_COPY.SUMMARY_PARTIAL(
        THREE_MET_RULES,
        TOTAL_RULES
      )
    );
    expect(observer.takeChangeCount()).toBe(SINGLE_CHANGE);
    observer.disconnect();
  });

  it("restarts the wait on every count change", () => {
    const { page, rerenderWith } = renderChecklist();

    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });
    advance(DEBOUNCE_MS - ONE_MS);
    rerenderWith({ results: LOWERCASE_AND_DIGIT_RESULTS });
    advance(DEBOUNCE_MS - ONE_MS);

    expect(page.getStatus()).toHaveTextContent(
      STRING.Empty
    );

    advance(ONE_MS);

    expect(page.getStatus()).toHaveTextContent(
      PASSWORD_RULES_COPY.SUMMARY_PARTIAL(
        TWO_MET_RULES,
        TOTAL_RULES
      )
    );
  });

  it("does not schedule an announcement when the results object changes with the same values", () => {
    const { page, rerenderWith } = renderChecklist();
    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });
    advance(DEBOUNCE_MS);
    const observer = page.observeStatus();

    rerenderWith({
      results: { ...LOWERCASE_ONLY_RESULTS },
    });
    advance(DEBOUNCE_MS);

    expect(vi.getTimerCount()).toBe(NO_TIMERS);
    expect(observer.takeChangeCount()).toBe(NO_CHANGES);
    observer.disconnect();
  });

  it("does not announce when a different rule keeps the same met count", () => {
    const { page, rerenderWith } = renderChecklist();
    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });
    advance(DEBOUNCE_MS);
    const observer = page.observeStatus();

    rerenderWith({ results: DIGIT_ONLY_RESULTS });
    advance(DEBOUNCE_MS);

    expect(observer.takeChangeCount()).toBe(NO_CHANGES);
    observer.disconnect();
  });

  it("announces zero met rules after the count drops back to zero", () => {
    const { page, rerenderWith } = renderChecklist();
    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });
    advance(DEBOUNCE_MS);

    rerenderWith({ results: ALL_PENDING_RESULTS });
    advance(DEBOUNCE_MS);

    expect(page.getStatus()).toHaveTextContent(
      PASSWORD_RULES_COPY.SUMMARY_PARTIAL(
        ZERO_MET_RULES,
        TOTAL_RULES
      )
    );
  });
});
