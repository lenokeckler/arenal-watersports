import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render } from "@testing-library/react";
import { fetchPendingDeposits } from "@/app/services/deposits";
import PendingDeposits from "../PendingDeposits";
import {
  CURRENCY_NAME,
  PENDING_DEPOSITS_COPY,
} from "../constants/PendingDepositsCopy.constants";
import {
  CRC_AMOUNT_TEXT,
  CRC_DEPOSIT,
  HEADING_LEVEL_ONE,
  SERVICE_FAILURE_MESSAGE,
  USD_AMOUNT_TEXT,
  USD_DEPOSIT,
} from "./PendingDeposits.constants";
import { createPendingDepositsPage } from "./PendingDeposits.page";

vi.mock("@/app/services/deposits", () => ({
  fetchPendingDeposits: vi.fn(),
}));

const renderScreen = async () => {
  render(await PendingDeposits());
  return createPendingDepositsPage();
};

describe("PendingDeposits", () => {
  beforeEach(() => {
    vi.mocked(fetchPendingDeposits).mockResolvedValue([
      USD_DEPOSIT,
      CRC_DEPOSIT,
    ]);
  });

  it("renders one row per deposit with customer, reservation code, amount and currency name", async () => {
    const page = await renderScreen();
    const [usdRow, crcRow] = page.getRows();

    expect(page.getRows()).toHaveLength(2);
    expect(
      page.getInRow(
        usdRow,
        USD_DEPOSIT.reservation.customerName
      )
    ).toBeInTheDocument();
    expect(
      page.getInRow(usdRow, USD_DEPOSIT.reservation.code)
    ).toBeInTheDocument();
    expect(
      page.getLeafByExactText(usdRow, USD_AMOUNT_TEXT)
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        usdRow,
        CURRENCY_NAME[USD_DEPOSIT.currency]
      )
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        crcRow,
        CRC_DEPOSIT.reservation.customerName
      )
    ).toBeInTheDocument();
    expect(
      page.getLeafByExactText(crcRow, CRC_AMOUNT_TEXT)
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        crcRow,
        CURRENCY_NAME[CRC_DEPOSIT.currency]
      )
    ).toBeInTheDocument();
  });

  it("labels each reservation code with the reservation label", async () => {
    const page = await renderScreen();
    const [firstRow] = page.getRows();

    expect(
      page.getInRowContaining(
        firstRow,
        PENDING_DEPOSITS_COPY.RESERVATION_CODE_LABEL
      )
    ).toBeInTheDocument();
  });

  it("never renders dollars and colones in the same row", async () => {
    const page = await renderScreen();
    const [usdRow, crcRow] = page.getRows();

    expect(usdRow).not.toHaveTextContent(CRC_AMOUNT_TEXT);
    expect(crcRow).not.toHaveTextContent(USD_AMOUNT_TEXT);
  });

  it("renders exactly one level-one heading inside the main landmark", async () => {
    const page = await renderScreen();

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.getMain()).toBeInTheDocument();
  });

  it("renders the empty block and no list when there are no deposits", async () => {
    vi.mocked(fetchPendingDeposits).mockResolvedValue([]);
    const page = await renderScreen();

    expect(
      page.getText(PENDING_DEPOSITS_COPY.EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(page.queryList()).not.toBeInTheDocument();
  });

  it("rejects when the service fails so the route error boundary takes over", async () => {
    vi.mocked(fetchPendingDeposits).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(PendingDeposits()).rejects.toThrow(
      SERVICE_FAILURE_MESSAGE
    );
  });
});
