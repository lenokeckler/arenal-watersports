import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  SUPABASE_WORK_AREA,
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_RESULT,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import WorkerAccountNotice from "../components/WorkerAccountNotice";
import WorkerAccountPanel from "../components/WorkerAccountPanel";
import {
  WORKER_ACCOUNT_ACTION_LABEL,
  WORKER_ACCOUNT_COPY,
  WORKER_ACCOUNT_NOTICE,
  WORKER_ACCOUNT_STATE_LABEL,
} from "../constants/WorkerAccountCopy.constants";

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerAccountAsSignedIn: vi.fn(),
}));

const OVERVIEW = {
  accountState: WORKER_ACCOUNT_STATE.ACTIVE,
  areas: [SUPABASE_WORK_AREA.OPERATIONS],
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  fullName: "Celso Rojas",
  hasPersonalEmail: false,
  id: "33333333-3333-3333-3333-333333333333",
  isExternalGuide: false,
  marks: [],
  username: "celso",
};

const buttonNamed = (
  action: keyof typeof WORKER_ACCOUNT_ACTION_LABEL
) =>
  screen.queryByRole("button", {
    name: WORKER_ACCOUNT_ACTION_LABEL[action].label,
  });

describe("WorkerAccountPanel", () => {
  it("offers Bloquear on an active account", () => {
    render(<WorkerAccountPanel overview={OVERVIEW} />);

    expect(
      screen.getByText(
        WORKER_ACCOUNT_STATE_LABEL[
          WORKER_ACCOUNT_STATE.ACTIVE
        ]
      )
    ).toBeInTheDocument();
    expect(
      buttonNamed(WORKER_ACCOUNT_ACTION.BLOCK)
    ).toBeInTheDocument();
    expect(
      buttonNamed(WORKER_ACCOUNT_ACTION.UNLOCK)
    ).toBeNull();
  });

  it.each([
    WORKER_ACCOUNT_STATE.BLOCKED_BY_ATTEMPTS,
    WORKER_ACCOUNT_STATE.BLOCKED_BY_ADMINISTRATION,
  ])(
    "offers Desbloquear when the account is %s",
    (accountState) => {
      render(
        <WorkerAccountPanel
          overview={{ ...OVERVIEW, accountState }}
        />
      );

      expect(
        screen.getByText(
          WORKER_ACCOUNT_STATE_LABEL[accountState]
        )
      ).toBeInTheDocument();
      expect(
        buttonNamed(WORKER_ACCOUNT_ACTION.UNLOCK)
      ).toBeInTheDocument();
    }
  );

  it("offers nothing on the administration account and says why", () => {
    render(
      <WorkerAccountPanel
        overview={{
          ...OVERVIEW,
          baseRole: SUPABASE_WORK_AREA.ADMINISTRATION,
        }}
      />
    );

    expect(
      screen.getByText(
        WORKER_ACCOUNT_COPY.ADMIN_ACCOUNT_NOTE
      )
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });
});

describe("WorkerAccountNotice", () => {
  it("says the sessions were closed after blocking", () => {
    render(
      <WorkerAccountNotice
        search={{
          accountNotice: WORKER_ACCOUNT_RESULT.BLOCKED,
          area: null,
          mark: null,
          markNotice: null,
          notice: null,
          username: OVERVIEW.username,
        }}
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      WORKER_ACCOUNT_NOTICE[
        WORKER_ACCOUNT_RESULT.BLOCKED
      ] ?? ""
    );
  });
});
