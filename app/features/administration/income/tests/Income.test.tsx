import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render } from "@testing-library/react";
import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import { readIncomeReport } from "@/app/services/income-report";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import Income from "../Income";
import {
  INCOME_COPY,
  INCOME_NO_MOVEMENT_COPY,
} from "../constants/IncomeCopy.constants";
import { createIncomePage } from "./Income.page";
import {
  DATE_TIME_ATTRIBUTE,
  EMPTY_REPORT,
  FAILED_REPORT,
  HEADING_LEVEL_ONE,
  INCOME_DAY,
  INCOME_DAY_TEXT,
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

describe("Income", () => {
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

  it("reads the Costa Rica day and shows it under one page title", async () => {
    render(await Income());
    const page = createIncomePage();

    expect(readIncomeReport).toHaveBeenCalledWith(
      INCOME_DAY
    );
    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.getDate(INCOME_DAY_TEXT)).toHaveAttribute(
      DATE_TIME_ATTRIBUTE,
      INCOME_DAY.date
    );
    expect(page.getMain()).toBeInTheDocument();
  });

  it("shows dollars first and colones second, each in its own card", async () => {
    render(await Income());
    const page = createIncomePage();

    expect(page.queryRegions()).toHaveLength(2);
    expect(
      page.getRegion(CURRENCY_NAME_COPY[CURRENCY_CODE.USD])
    ).toBeInTheDocument();
    expect(
      page.getText(
        INCOME_NO_MOVEMENT_COPY[CURRENCY_CODE.CRC]
      )
    ).toBeInTheDocument();
    expect(
      page
        .getRegion(CURRENCY_NAME_COPY[CURRENCY_CODE.USD])
        .compareDocumentPosition(
          page.getRegion(
            CURRENCY_NAME_COPY[CURRENCY_CODE.CRC]
          )
        )
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("shows one empty block when neither currency moved", async () => {
    vi.mocked(readIncomeReport).mockResolvedValue(
      EMPTY_REPORT
    );

    render(await Income());
    const page = createIncomePage();

    expect(
      page.getText(INCOME_COPY.EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(page.queryRegions()).toHaveLength(0);
  });

  it("announces a failed read as an error, never as an empty day", async () => {
    vi.mocked(readIncomeReport).mockResolvedValue(
      FAILED_REPORT
    );

    render(await Income());
    const page = createIncomePage();

    expect(page.getAlert()).toHaveTextContent(
      INCOME_COPY.ERROR_TITLE
    );
    expect(
      page.queryText(INCOME_COPY.EMPTY_TITLE)
    ).toBeNull();
    expect(page.queryRegions()).toHaveLength(0);
    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
  });
});
