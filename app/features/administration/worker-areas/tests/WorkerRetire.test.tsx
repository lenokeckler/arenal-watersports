import { render, screen } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import {
  SUPABASE_RPC,
  SUPABASE_WORK_AREA,
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_FIELD,
  WORKER_ACCOUNT_RESULT,
  WORKER_ACCOUNT_STATE,
  WORKER_AREA_FIELD,
} from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { changeWorkerAccount } from "@/app/services/worker-areas/changeWorkerAccount";
import { changeWorkerAccountAsSignedIn } from "@/app/services/worker-areas";
import { submitWorkerAccountChange } from "../actions/submitWorkerAccountChange";
import WorkerAreasResult from "../components/WorkerAreasResult";
import {
  WORKER_ACCOUNT_ACTION_LABEL,
  WORKER_ACCOUNT_STATE_LABEL,
} from "../constants/WorkerAccountCopy.constants";
import { WORKER_AREAS_COPY } from "../constants/WorkerAreasCopy.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error("redirected");
  }),
}));

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerAccountAsSignedIn: vi.fn(),
}));

vi.mock("@/app/services/authentication", () => ({
  grantTemporaryPasswordAsSignedIn: vi.fn(),
}));

const OVERVIEW = {
  accountState: WORKER_ACCOUNT_STATE.ACTIVE,
  areas: [SUPABASE_WORK_AREA.OPERATIONS],
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  fullName: "Celso Rojas",
  hasPersonalEmail: true,
  id: "33333333-3333-3333-3333-333333333333",
  isExternalGuide: false,
  marks: [],
  username: "celso",
};

const RETIRE_LABEL =
  WORKER_ACCOUNT_ACTION_LABEL[WORKER_ACCOUNT_ACTION.RETIRE]
    .label;

describe("retiring an account", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls the retire check of the database", async () => {
    const rpc = vi.fn().mockResolvedValue({
      data: WORKER_ACCOUNT_RESULT.RETIRED,
      error: null,
    });

    expect(
      await changeWorkerAccount(
        { rpc } as unknown as ServerSupabaseClient,
        {
          action: WORKER_ACCOUNT_ACTION.RETIRE,
          workerId: OVERVIEW.id,
        }
      )
    ).toBe(WORKER_ACCOUNT_RESULT.RETIRED);
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.RETIRE_WORKER,
      {
        target_worker: OVERVIEW.id,
      }
    );
  });

  it("returns to the worker with the retired notice", async () => {
    vi.mocked(
      changeWorkerAccountAsSignedIn
    ).mockResolvedValue(WORKER_ACCOUNT_RESULT.RETIRED);
    const formData = new FormData();
    formData.set(
      WORKER_ACCOUNT_FIELD.ACTION,
      WORKER_ACCOUNT_ACTION.RETIRE
    );
    formData.set(
      WORKER_AREA_FIELD.USERNAME,
      OVERVIEW.username
    );
    formData.set(WORKER_AREA_FIELD.WORKER_ID, OVERVIEW.id);

    await expect(
      submitWorkerAccountChange(null, formData)
    ).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith(
      expect.stringContaining(
        `${WORKER_ACCOUNT_FIELD.ACCOUNT_NOTICE}=${WORKER_ACCOUNT_RESULT.RETIRED}`
      )
    );
  });

  it("never treats a refusal of another action as a retirement", async () => {
    vi.mocked(
      changeWorkerAccountAsSignedIn
    ).mockResolvedValue(WORKER_ACCOUNT_RESULT.RETIRED);
    const formData = new FormData();
    formData.set(
      WORKER_ACCOUNT_FIELD.ACTION,
      WORKER_ACCOUNT_ACTION.UNLOCK
    );
    formData.set(
      WORKER_AREA_FIELD.USERNAME,
      OVERVIEW.username
    );
    formData.set(WORKER_AREA_FIELD.WORKER_ID, OVERVIEW.id);

    expect(
      await submitWorkerAccountChange(null, formData)
    ).toBe(WORKER_ACCOUNT_RESULT.RETIRED);
    expect(redirect).not.toHaveBeenCalled();
  });

  it.each([
    WORKER_ACCOUNT_STATE.ACTIVE,
    WORKER_ACCOUNT_STATE.BLOCKED_BY_ATTEMPTS,
  ])(
    "offers Dar de baja on an account that is %s",
    (accountState) => {
      render(
        <WorkerAreasResult
          overview={{ ...OVERVIEW, accountState }}
          username={OVERVIEW.username}
        />
      );

      expect(
        screen.getByRole("button", { name: RETIRE_LABEL })
      ).toBeInTheDocument();
    }
  );

  it("shows a retired account without areas, marks or account actions", () => {
    render(
      <WorkerAreasResult
        overview={{
          ...OVERVIEW,
          accountState: WORKER_ACCOUNT_STATE.RETIRED,
        }}
        username={OVERVIEW.username}
      />
    );

    expect(
      screen.getByText(
        WORKER_ACCOUNT_STATE_LABEL[
          WORKER_ACCOUNT_STATE.RETIRED
        ]
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(WORKER_AREAS_COPY.AREAS_TITLE)
    ).toBeNull();
    expect(
      screen.queryByText(WORKER_AREAS_COPY.MARKS_TITLE)
    ).toBeNull();
    expect(
      screen.queryByRole("button", { name: RETIRE_LABEL })
    ).toBeNull();
  });
});
