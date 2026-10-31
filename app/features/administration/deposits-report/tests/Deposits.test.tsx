import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import {
  fetchPendingDeposits,
  fetchRetainedDeposits,
} from "@/app/services/deposits";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import Deposits from "../Deposits";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import {
  CRC_PARTIAL_DEPOSIT,
  REDIRECT_MESSAGE,
  SERVICE_FAILURE_MESSAGE,
  USD_HELD_DEPOSIT,
  USD_RETAINED_DEPOSIT,
} from "./DepositsReport.constants";
import { createDepositsReportPage } from "./DepositsReport.page";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/app/services/deposits", () => ({
  fetchPendingDeposits: vi.fn(),
  fetchRetainedDeposits: vi.fn(),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

describe("Deposits", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_MESSAGE);
    });
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(fetchPendingDeposits).mockResolvedValue([
      USD_HELD_DEPOSIT,
    ]);
    vi.mocked(fetchRetainedDeposits).mockResolvedValue([
      USD_RETAINED_DEPOSIT,
      CRC_PARTIAL_DEPOSIT,
    ]);
  });

  it("redirects a non-administrator home before any read runs", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(Deposits()).rejects.toThrow(
      REDIRECT_MESSAGE
    );

    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
    expect(fetchPendingDeposits).not.toHaveBeenCalled();
    expect(fetchRetainedDeposits).not.toHaveBeenCalled();
  });

  it("renders the pending and the retained deposits for an administrator", async () => {
    render(await Deposits());
    const page = createDepositsReportPage();

    expect(redirect).not.toHaveBeenCalled();
    expect(
      page.getRows(
        DEPOSITS_REPORT_COPY.PENDING_LIST_ARIA_LABEL
      )
    ).toHaveLength(1);
    expect(
      page.getRows(
        DEPOSITS_REPORT_COPY.RETAINED_LIST_ARIA_LABEL
      )
    ).toHaveLength(2);
  });

  it("rejects when the pending read fails so the route error boundary takes over", async () => {
    vi.mocked(fetchPendingDeposits).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(Deposits()).rejects.toThrow(
      SERVICE_FAILURE_MESSAGE
    );
  });

  it("rejects when the retained read fails so the route error boundary takes over", async () => {
    vi.mocked(fetchRetainedDeposits).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(Deposits()).rejects.toThrow(
      SERVICE_FAILURE_MESSAGE
    );
  });
});
