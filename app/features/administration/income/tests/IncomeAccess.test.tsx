import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readIncomeReport } from "@/app/services/income-report";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import Income from "../Income";
import {
  INCOME_DAY,
  READ_FAILURE_MESSAGE,
  READY_REPORT,
  REDIRECT_ERROR_MESSAGE,
} from "./IncomeScreen.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error(REDIRECT_ERROR_MESSAGE);
  }),
}));

vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

vi.mock(
  "@/app/services/income-report",
  async (importOriginal) => ({
    ...(await importOriginal<
      typeof import("@/app/services/income-report")
    >()),
    readIncomeReport: vi.fn(),
  })
);

vi.mock(
  "@/app/utils/costa-rica-day/getCostaRicaDayRange",
  () => ({ getCostaRicaDayRange: vi.fn() })
);

describe("Income access and read errors", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(getCostaRicaDayRange).mockReturnValue(
      INCOME_DAY
    );
    vi.mocked(readIncomeReport).mockResolvedValue(
      READY_REPORT
    );
  });

  it("sends a worker who is not an administrator home before reading any income", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(Income()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
    expect(readIncomeReport).not.toHaveBeenCalled();
  });

  it("lets a failed access check reach the error boundary without reading income", async () => {
    vi.mocked(isAdministratorSignedIn).mockRejectedValue(
      new Error(READ_FAILURE_MESSAGE)
    );

    await expect(Income()).rejects.toThrow(
      READ_FAILURE_MESSAGE
    );
    expect(redirect).not.toHaveBeenCalled();
    expect(readIncomeReport).not.toHaveBeenCalled();
  });

  it("lets an unexpected read error reach the error boundary instead of showing an empty day", async () => {
    vi.mocked(readIncomeReport).mockRejectedValue(
      new Error(READ_FAILURE_MESSAGE)
    );

    await expect(Income()).rejects.toThrow(
      READ_FAILURE_MESSAGE
    );
  });
});
