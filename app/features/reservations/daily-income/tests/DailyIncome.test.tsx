import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render } from "@testing-library/react";
import { redirect } from "next/navigation";
import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
  PATHS,
} from "@/app/constants";
import {
  fetchDailyIncome,
  isIncomeReaderSignedIn,
} from "@/app/services/income";
import DailyIncome from "../DailyIncome";
import {
  DAY_WITH_BOTH_CURRENCIES,
  HEADING_LEVEL_ONE,
  READ_FAILURE_MESSAGE,
  REDIRECT_ERROR_MESSAGE,
} from "./DailyIncome.constants";
import { createDailyIncomePage } from "./DailyIncome.page";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(() => {
    throw new Error(REDIRECT_ERROR_MESSAGE);
  }),
}));

vi.mock("@/app/services/income", () => ({
  fetchDailyIncome: vi.fn(),
  isIncomeReaderSignedIn: vi.fn(),
}));

describe("DailyIncome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isIncomeReaderSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(fetchDailyIncome).mockResolvedValue(
      DAY_WITH_BOTH_CURRENCIES
    );
  });

  it("renders today's income inside the main landmark for an income reader", async () => {
    render(await DailyIncome());
    const page = createDailyIncomePage();

    expect(page.getMain()).toBeInTheDocument();
    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(
      page.getRegion(CURRENCY_NAME_COPY[CURRENCY_CODE.USD])
    ).toBeInTheDocument();
  });

  it("sends a worker who may not read money home before reading any income", async () => {
    vi.mocked(isIncomeReaderSignedIn).mockResolvedValue(
      false
    );

    await expect(DailyIncome()).rejects.toThrow(
      REDIRECT_ERROR_MESSAGE
    );
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
    expect(fetchDailyIncome).not.toHaveBeenCalled();
  });

  it("lets a failed read reach the error boundary instead of showing an empty day", async () => {
    vi.mocked(fetchDailyIncome).mockRejectedValue(
      new Error(READ_FAILURE_MESSAGE)
    );

    await expect(DailyIncome()).rejects.toBeInstanceOf(
      Error
    );
  });
});
