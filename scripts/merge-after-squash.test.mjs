import { describe, expect, it } from "vitest";
import {
  MERGED_STATE,
  REFUSAL,
  decideSquashMerge,
  squashMergeMessage,
} from "./merge-after-squash.mjs";

const SAFE_STATE = {
  clean: true,
  containsParent: true,
  parentState: MERGED_STATE,
  sameTree: true,
};

describe("decideSquashMerge", () => {
  it("clears a false conflict when every proof holds", () => {
    expect(decideSquashMerge(SAFE_STATE)).toBeNull();
  });

  it("refuses with uncommitted changes", () => {
    expect(
      decideSquashMerge({ ...SAFE_STATE, clean: false })
    ).toBe(REFUSAL.DIRTY);
  });

  it("refuses while the parent pull request is not merged", () => {
    expect(
      decideSquashMerge({
        ...SAFE_STATE,
        parentState: "OPEN",
      })
    ).toBe(REFUSAL.PARENT_NOT_MERGED);
  });

  it("refuses a branch without the parent's final head, as in #146", () => {
    expect(
      decideSquashMerge({
        ...SAFE_STATE,
        containsParent: false,
      })
    ).toBe(REFUSAL.MISSING_PARENT_HEAD);
  });

  it("refuses when develop holds more than the parent, as in #17", () => {
    expect(
      decideSquashMerge({ ...SAFE_STATE, sameTree: false })
    ).toBe(REFUSAL.DEVELOP_MOVED);
  });

  it("tells the author to run a real merge instead", () => {
    Object.values(REFUSAL)
      .filter((refusal) => refusal !== REFUSAL.DIRTY)
      .forEach((refusal) =>
        expect(refusal).toContain(
          "git merge origin/develop"
        )
      );
  });
});

describe("squashMergeMessage", () => {
  it("names the parent pull request", () => {
    expect(
      squashMergeMessage(
        "RES-02.04.02: Reservation server layer"
      )
    ).toBe(
      "Merge develop after squash of RES-02.04.02: Reservation server layer"
    );
  });
});
