import { describe, expect, it } from "vitest";
import {
  APPROVAL_LABEL,
  findBlockedDeletions,
  formatBlockedDeletions,
  isApprovedBy,
  isMigrationPath,
  parseDeletions,
  pickOriginPull,
} from "./deletion-guard.mjs";

const OWNER = "lenokeckler";
const TEAMMATE = "jeisonbcr7";
const MIGRATION =
  "supabase/migrations/20261024000900_work_mode.sql";
const OWNER_FILE =
  "app/features/access/login-form/LoginForm.tsx";
const TEAMMATE_FILE =
  "app/features/reservations/reservation-form/ReservationForm.tsx";

const labeled = (actor, name = APPROVAL_LABEL) => ({
  actor: { login: actor },
  event: "labeled",
  label: { name },
});

const unlabeled = (actor, name = APPROVAL_LABEL) => ({
  actor: { login: actor },
  event: "unlabeled",
  label: { name },
});

describe("isMigrationPath", () => {
  it("recognises a Supabase migration", () => {
    expect(isMigrationPath(MIGRATION)).toBe(true);
  });

  it("ignores a pgTAP test", () => {
    expect(
      isMigrationPath(
        "supabase/tests/062_active_worker_reads.test.sql"
      )
    ).toBe(false);
  });
});

describe("parseDeletions", () => {
  it("keeps deleted files and renamed migrations", () => {
    expect(
      parseDeletions(
        [
          `D\t${OWNER_FILE}`,
          "M\tapp/constants/index.ts",
          `R100\t${MIGRATION}\tsupabase/migrations/20261030000100_work_mode.sql`,
          "R090\tapp/old.ts\tapp/new.ts",
          "A\tapp/added.ts",
        ].join("\n")
      )
    ).toEqual([OWNER_FILE, MIGRATION]);
  });
});

describe("findBlockedDeletions", () => {
  it("blocks files another author added, as in #146", () => {
    expect(
      findBlockedDeletions(
        [
          {
            owner: OWNER,
            path: OWNER_FILE,
            pullNumber: 54,
          },
          {
            owner: TEAMMATE,
            path: TEAMMATE_FILE,
            pullNumber: 146,
          },
        ],
        TEAMMATE
      )
    ).toEqual([
      { owner: OWNER, path: OWNER_FILE, pullNumber: 54 },
    ]);
  });

  it("lets an author delete their own files", () => {
    expect(
      findBlockedDeletions(
        [
          {
            owner: TEAMMATE,
            path: TEAMMATE_FILE,
            pullNumber: 146,
          },
        ],
        TEAMMATE
      )
    ).toEqual([]);
  });

  it("blocks a migration even from its own author", () => {
    expect(
      findBlockedDeletions(
        [
          {
            owner: OWNER,
            path: MIGRATION,
            pullNumber: 300,
          },
        ],
        OWNER
      )
    ).toHaveLength(1);
  });

  it("blocks a file whose author is unknown", () => {
    expect(
      findBlockedDeletions(
        [
          {
            owner: null,
            path: OWNER_FILE,
            pullNumber: null,
          },
        ],
        TEAMMATE
      )
    ).toHaveLength(1);
  });
});

describe("pickOriginPull", () => {
  const SQUASH_SHA = "4891e30f";
  const originPull = {
    merge_commit_sha: SQUASH_SHA,
    number: 45,
    user: { login: OWNER },
  };
  const openPullHoldingTheCommit = {
    merge_commit_sha: "ffffffff",
    number: 3,
    user: { login: TEAMMATE },
  };

  it("picks the pull request whose squash created the commit", () => {
    expect(
      pickOriginPull(
        [openPullHoldingTheCommit, originPull],
        SQUASH_SHA
      )
    ).toBe(originPull);
  });

  it("returns null when no pull request created the commit", () => {
    expect(
      pickOriginPull([openPullHoldingTheCommit], SQUASH_SHA)
    ).toBeNull();
  });
});

describe("isApprovedBy", () => {
  it("accepts the label added by the approver", () => {
    expect(isApprovedBy([labeled(OWNER)], OWNER)).toBe(
      true
    );
  });

  it("refuses the label added by anyone else", () => {
    expect(isApprovedBy([labeled(TEAMMATE)], OWNER)).toBe(
      false
    );
  });

  it("refuses a label the approver removed afterwards", () => {
    expect(
      isApprovedBy(
        [labeled(OWNER), unlabeled(OWNER)],
        OWNER
      )
    ).toBe(false);
  });

  it("refuses a label re-added by someone else after the approver", () => {
    expect(
      isApprovedBy(
        [
          labeled(OWNER),
          unlabeled(TEAMMATE),
          labeled(TEAMMATE),
        ],
        OWNER
      )
    ).toBe(false);
  });

  it("ignores other labels", () => {
    expect(
      isApprovedBy([labeled(OWNER, "QA Approved")], OWNER)
    ).toBe(false);
  });
});

describe("formatBlockedDeletions", () => {
  it("names each file, its author and its pull request", () => {
    const message = formatBlockedDeletions(
      [
        { owner: OWNER, path: OWNER_FILE, pullNumber: 54 },
        { owner: null, path: MIGRATION, pullNumber: null },
      ],
      OWNER
    );

    expect(message).toContain(
      `${OWNER_FILE} (added by @${OWNER} in #54)`
    );
    expect(message).toContain(
      `${MIGRATION} (added by an unknown author)`
    );
    expect(message).toContain(APPROVAL_LABEL);
  });
});
