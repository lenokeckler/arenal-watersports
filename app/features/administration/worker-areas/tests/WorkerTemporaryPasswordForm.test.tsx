import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_WORK_AREA,
  WORKER_ACCOUNT_RESULT,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import { grantTemporaryPasswordAsSignedIn } from "@/app/services/authentication";
import WorkerAccountPanel from "../components/WorkerAccountPanel";
import {
  WORKER_ACCOUNT_COPY,
  WORKER_ACCOUNT_ERROR,
} from "../constants/WorkerAccountCopy.constants";

vi.mock("@/app/services/authentication", () => ({
  grantTemporaryPasswordAsSignedIn: vi.fn(),
}));

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerAccountAsSignedIn: vi.fn(),
}));

const TEMPORARY_PASSWORD = "Kq7#vR2mP9!xZt";

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

const getGrantButton = () =>
  screen.getByRole("button", {
    name: WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD,
  });

describe("temporary password on the account panel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("gives the password once to a worker without a personal email", async () => {
    vi.mocked(
      grantTemporaryPasswordAsSignedIn
    ).mockResolvedValue({
      ok: true,
      temporaryPassword: TEMPORARY_PASSWORD,
    });
    const user = userEvent.setup();
    render(<WorkerAccountPanel overview={OVERVIEW} />);

    await user.click(getGrantButton());

    expect(
      await screen.findByText(TEMPORARY_PASSWORD)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD_DONE
      )
    ).toBeInTheDocument();
    expect(
      grantTemporaryPasswordAsSignedIn
    ).toHaveBeenCalledWith(OVERVIEW.id);
  });

  it("shows the refusal of the database", async () => {
    vi.mocked(
      grantTemporaryPasswordAsSignedIn
    ).mockResolvedValue({
      ok: false,
      result: WORKER_ACCOUNT_RESULT.HAS_PERSONAL_EMAIL,
    });
    const user = userEvent.setup();
    render(<WorkerAccountPanel overview={OVERVIEW} />);

    await user.click(getGrantButton());

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      WORKER_ACCOUNT_ERROR[
        WORKER_ACCOUNT_RESULT.HAS_PERSONAL_EMAIL
      ]
    );
  });

  it("sends a worker with a personal email to the PIN instead", () => {
    render(
      <WorkerAccountPanel
        overview={{ ...OVERVIEW, hasPersonalEmail: true }}
      />
    );

    expect(
      screen.getByText(
        WORKER_ACCOUNT_COPY.HAS_PERSONAL_EMAIL_NOTE
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD,
      })
    ).toBeNull();
  });

  it("offers no temporary password on the administration account", () => {
    render(
      <WorkerAccountPanel
        overview={{
          ...OVERVIEW,
          baseRole: SUPABASE_WORK_AREA.ADMINISTRATION,
        }}
      />
    );

    expect(screen.queryByRole("button")).toBeNull();
  });
});
