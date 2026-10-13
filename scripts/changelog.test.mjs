import { describe, expect, it } from "vitest";
import {
  CHANGELOG_SECTION,
  checkPullRequestFiles,
  fragmentFileName,
  insertEntries,
  parseFragment,
} from "./changelog.mjs";

const STORY_BRANCH = "feat/acc-01/us-01-03-login-screen";
const STORY_FRAGMENT =
  "changelog/unreleased/feature/feat-acc-01-us-01-03-login-screen.md";
const RELEASE_BRANCH = "release/0.1.0";
const ENTRY =
  "ACC-01.01.03: Login screen — the login screen (US-ACC-01 · AWS-30)";
const OLD_ENTRY =
  "chore - Team onboarding — first-run guide";

const CHANGELOG = `# UNRELEASED

## Feature

- ${OLD_ENTRY}

## Bugfix

- chore - Supabase CLI — first-run fixes
`;

describe("fragmentFileName", () => {
  it("turns the branch into a file name", () => {
    expect(fragmentFileName(STORY_BRANCH)).toBe(
      "feat-acc-01-us-01-03-login-screen.md"
    );
  });
});

describe("parseFragment", () => {
  it("returns the single line of a fragment", () => {
    expect(
      parseFragment(`${ENTRY}\n`, STORY_FRAGMENT)
    ).toBe(ENTRY);
  });

  it("refuses a fragment with more than one line", () => {
    expect(() =>
      parseFragment(
        `${ENTRY}\n${OLD_ENTRY}\n`,
        STORY_FRAGMENT
      )
    ).toThrow("exactly one line");
  });

  it("refuses a fragment that keeps the list marker", () => {
    expect(() =>
      parseFragment(`- ${ENTRY}`, STORY_FRAGMENT)
    ).toThrow("without the leading");
  });
});

describe("insertEntries", () => {
  it("puts new entries at the top of their section", () => {
    const result = insertEntries(
      CHANGELOG,
      CHANGELOG_SECTION.FEATURE,
      [ENTRY]
    );

    expect(result).toContain(
      `## Feature\n\n- ${ENTRY}\n- ${OLD_ENTRY}`
    );
  });

  it("creates the section when it does not exist yet", () => {
    const result = insertEntries(
      "# UNRELEASED\n",
      CHANGELOG_SECTION.BUGFIX,
      [ENTRY]
    );

    expect(result).toContain(`## Bugfix\n\n- ${ENTRY}`);
  });

  it("leaves the changelog untouched without entries", () => {
    expect(
      insertEntries(
        CHANGELOG,
        CHANGELOG_SECTION.FEATURE,
        []
      )
    ).toBe(CHANGELOG);
  });
});

describe("checkPullRequestFiles", () => {
  it("accepts one new fragment", () => {
    expect(
      checkPullRequestFiles(
        [{ path: STORY_FRAGMENT, status: "A" }],
        STORY_BRANCH
      )
    ).toEqual([]);
  });

  it("asks for a fragment when there is none", () => {
    expect(
      checkPullRequestFiles([], STORY_BRANCH)[0]
    ).toContain("feat-acc-01-us-01-03-login-screen.md");
  });

  it("refuses an edit of CHANGELOG.md outside a release", () => {
    expect(
      checkPullRequestFiles(
        [
          { path: STORY_FRAGMENT, status: "A" },
          { path: "CHANGELOG.md", status: "M" },
        ],
        STORY_BRANCH
      )
    ).toHaveLength(1);
  });

  it("skips the check on a release branch", () => {
    expect(
      checkPullRequestFiles(
        [{ path: "CHANGELOG.md", status: "M" }],
        RELEASE_BRANCH
      )
    ).toEqual([]);
  });
});
