import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  SUPABASE_WORK_AREA,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import { rehireWorkerAsSignedIn } from "@/app/services/authentication";
import WorkerAccountPanel from "../components/WorkerAccountPanel";
import { WORKER_ACCOUNT_COPY } from "../constants/WorkerAccountCopy.constants";

vi.mock("@/app/services/authentication", () => ({
  grantTemporaryPasswordAsSignedIn: vi.fn(),
  rehireWorkerAsSignedIn: vi.fn(),
}));

vi.mock("@/app/services/worker-areas", () => ({
  changeWorkerAccountAsSignedIn: vi.fn(),
}));

const TEMPORARY_PASSWORD = "Kq7#vR2mP9!xZt";

const RETIRED = {
  accountState: WORKER_ACCOUNT_STATE.RETIRED,
  areas: [SUPABASE_WORK_AREA.OPERATIONS],
  baseRole: SUPABASE_WORK_AREA.OPERATIONS,
  fullName: "Celso Rojas",
  hasPersonalEmail: false,
  id: "33333333-3333-3333-3333-333333333333",
  isExternalGuide: false,
  marks: [],
  username: "celso",
};

describe("rehiring from the account panel", () => {
  it("offers only Recontratar on a retired account", () => {
    render(<WorkerAccountPanel overview={RETIRED} />);

    expect(
      screen
        .getAllByRole("button")
        .map((button) => button.textContent)
    ).toEqual([WORKER_ACCOUNT_COPY.REHIRE]);
  });

  it("shows the new temporary password once after rehiring", async () => {
    vi.mocked(rehireWorkerAsSignedIn).mockResolvedValue({
      ok: true,
      temporaryPassword: TEMPORARY_PASSWORD,
    });
    const user = userEvent.setup();
    render(<WorkerAccountPanel overview={RETIRED} />);

    await user.click(
      screen.getByRole("button", {
        name: WORKER_ACCOUNT_COPY.REHIRE,
      })
    );

    expect(
      await screen.findByText(TEMPORARY_PASSWORD)
    ).toBeInTheDocument();
    expect(
      screen.getByText(WORKER_ACCOUNT_COPY.REHIRE_DONE)
    ).toBeInTheDocument();
    expect(rehireWorkerAsSignedIn).toHaveBeenCalledWith(
      RETIRED.id
    );
  });
});
