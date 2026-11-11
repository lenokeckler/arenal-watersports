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
  ALL_MET_RESULTS,
  ALL_PENDING_RESULTS,
  LOWERCASE_ONLY_RESULTS,
  ONE_MET_RULE,
  ONE_MS,
  STATUS_ATOMIC_ATTRIBUTE,
  STATUS_ATOMIC_TRUE,
  STATUS_LIVE_ATTRIBUTE,
  STATUS_LIVE_POLITE,
  THREE_MET_RESULTS,
  TOTAL_RULES,
} from "./PasswordRulesChecklist.constants";
import {
  advance,
  renderChecklist,
} from "./renderPasswordRulesChecklist";

const DEBOUNCE_MS = PASSWORD_RULES_ANNOUNCEMENT.DEBOUNCE_MS;

describe("PasswordRulesChecklist announcement", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a polite atomic status that starts empty", () => {
    const { page } = renderChecklist();

    expect(page.getStatus()).toHaveTextContent(
      STRING.Empty
    );
    expect(page.getStatus()).toHaveAttribute(
      STATUS_LIVE_ATTRIBUTE,
      STATUS_LIVE_POLITE
    );
    expect(page.getStatus()).toHaveAttribute(
      STATUS_ATOMIC_ATTRIBUTE,
      STATUS_ATOMIC_TRUE
    );
  });

  it("announces the met count only after the debounce", () => {
    const { page, rerenderWith } = renderChecklist();

    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });
    advance(DEBOUNCE_MS - ONE_MS);

    expect(page.getStatus()).toHaveTextContent(
      STRING.Empty
    );

    advance(ONE_MS);

    expect(page.getStatus()).toHaveTextContent(
      PASSWORD_RULES_COPY.SUMMARY_PARTIAL(
        ONE_MET_RULE,
        TOTAL_RULES
      )
    );
  });

  it("announces the complete summary when every rule is met", () => {
    const { page, rerenderWith } = renderChecklist();

    rerenderWith({ results: ALL_MET_RESULTS });
    advance(DEBOUNCE_MS);

    expect(page.getStatus()).toHaveTextContent(
      PASSWORD_RULES_COPY.SUMMARY_ALL(TOTAL_RULES)
    );
  });

  it("announces the complete summary when the count reaches the total from a partial one", () => {
    const { page, rerenderWith } = renderChecklist({
      results: THREE_MET_RESULTS,
    });

    rerenderWith({ results: ALL_MET_RESULTS });
    advance(DEBOUNCE_MS);

    expect(page.getStatus()).toHaveTextContent(
      PASSWORD_RULES_COPY.SUMMARY_ALL(TOTAL_RULES)
    );
  });

  it("does not announce when the count returns to the announced one", () => {
    const { page, rerenderWith } = renderChecklist();

    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });
    rerenderWith({ results: ALL_PENDING_RESULTS });
    advance(DEBOUNCE_MS);

    expect(page.getStatus()).toHaveTextContent(
      STRING.Empty
    );
  });

  it("keeps the summary when only the failure display changes", () => {
    const { page, rerenderWith } = renderChecklist();

    rerenderWith({ results: LOWERCASE_ONLY_RESULTS });
    advance(DEBOUNCE_MS);
    rerenderWith({
      results: LOWERCASE_ONLY_RESULTS,
      showFailures: true,
    });
    advance(DEBOUNCE_MS);

    expect(page.getStatus()).toHaveTextContent(
      PASSWORD_RULES_COPY.SUMMARY_PARTIAL(
        ONE_MET_RULE,
        TOTAL_RULES
      )
    );
  });

  it("stays silent when mounted with every rule already met", () => {
    const { page } = renderChecklist({
      results: ALL_MET_RESULTS,
    });

    advance(DEBOUNCE_MS);

    expect(page.getStatus()).toHaveTextContent(
      STRING.Empty
    );
  });
});
