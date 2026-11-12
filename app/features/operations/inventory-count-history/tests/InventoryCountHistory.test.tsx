import { render, screen } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import InventoryCountDetailView from "../InventoryCountDetailView";
import InventoryCountHistory from "../InventoryCountHistory";
import { INVENTORY_COUNT_HISTORY_COPY } from "../constants/InventoryCountHistoryCopy.constants";
import { getInventoryCountDetail } from "../services/getInventoryCountDetail";
import { listInventoryCounts } from "../services/listInventoryCounts";
import {
  COUNT_SUMMARY,
  INVENTORY_COUNT_HISTORY_TEST,
} from "./InventoryCountHistory.constants";

const notFound = vi.fn();

vi.mock("next/navigation", () => ({
  notFound: () => {
    notFound();
    throw new Error("NEXT_NOT_FOUND");
  },
}));
vi.mock("../services/listInventoryCounts", () => ({
  listInventoryCounts: vi.fn(),
}));
vi.mock("../services/getInventoryCountDetail", () => ({
  getInventoryCountDetail: vi.fn(),
}));

describe("InventoryCountHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists each count with who recorded it, its differences and a link to the detail", async () => {
    vi.mocked(listInventoryCounts).mockResolvedValue({
      counts: [COUNT_SUMMARY],
      totalCount: 1,
    });

    render(await InventoryCountHistory({ page: 1 }));

    expect(
      screen.getByText(/Ana Operaciones/)
    ).toBeInTheDocument();
    expect(
      screen.getByText("2 diferencias")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Ana Operaciones/ })
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.INVENTORY_COUNT(COUNT_SUMMARY.id)
    );
    expect(
      screen.getByRole("link", {
        name: INVENTORY_COUNT_HISTORY_COPY.NEW_COUNT,
      })
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.INVENTORY_COUNT_NEW
    );
  });

  it("offers the other pages when there are more counts than fit in one", async () => {
    vi.mocked(listInventoryCounts).mockResolvedValue({
      counts: [COUNT_SUMMARY],
      totalCount: 25,
    });

    render(await InventoryCountHistory({ page: 1 }));

    expect(
      screen.getByRole("navigation", {
        name: INVENTORY_COUNT_HISTORY_COPY.PAGINATION_LABEL,
      })
    ).toBeInTheDocument();
  });

  it("says there are no counts yet", async () => {
    vi.mocked(listInventoryCounts).mockResolvedValue({
      counts: [],
      totalCount: 0,
    });

    render(await InventoryCountHistory({ page: 1 }));

    expect(
      screen.getByText(INVENTORY_COUNT_HISTORY_COPY.EMPTY)
    ).toBeInTheDocument();
  });

  it("shows an error when the counts cannot be read", async () => {
    vi.mocked(listInventoryCounts).mockRejectedValue(
      new Error("down")
    );

    render(await InventoryCountHistory({ page: 1 }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      INVENTORY_COUNT_HISTORY_COPY.ERROR_LOAD
    );
  });
});

describe("InventoryCountDetailView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows how much was missing or extra on that date", async () => {
    vi.mocked(getInventoryCountDetail).mockResolvedValue({
      quantityDifferences: [
        {
          categoryName: "Chalecos",
          changes: [
            { counted: 6, field: "available", system: 8 },
          ],
        },
      ],
      summary: COUNT_SUMMARY,
      unitDifferences: [
        {
          categoryName: "Jet Ski",
          code: "JET-02",
          countedStatus: "damaged",
          systemStatus: "available",
        },
      ],
    });

    render(
      await InventoryCountDetailView({
        countId: INVENTORY_COUNT_HISTORY_TEST.COUNT_ID,
      })
    );

    expect(
      screen.getByText(
        INVENTORY_COUNT_HISTORY_COPY.UNIT_DIFFERENCE(
          "JET-02",
          "Jet Ski",
          "Disponible",
          "Dañada"
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        INVENTORY_COUNT_HISTORY_COPY.QUANTITY_DIFFERENCE(
          "Disponibles",
          8,
          6
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/faltan 2/)
    ).toBeInTheDocument();
  });

  it("says everything matched when there are no differences", async () => {
    vi.mocked(getInventoryCountDetail).mockResolvedValue({
      quantityDifferences: [],
      summary: {
        ...COUNT_SUMMARY,
        differenceCount: 0,
        notes: null,
      },
      unitDifferences: [],
    });

    render(
      await InventoryCountDetailView({
        countId: INVENTORY_COUNT_HISTORY_TEST.COUNT_ID,
      })
    );

    expect(
      screen.getByText(
        INVENTORY_COUNT_HISTORY_COPY.DETAIL_EMPTY_DIFFERENCES
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sin notas/)
    ).toBeInTheDocument();
  });

  it("answers not found for a count that does not exist", async () => {
    vi.mocked(getInventoryCountDetail).mockResolvedValue(
      null
    );

    await expect(
      InventoryCountDetailView({ countId: "x" })
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledOnce();
  });
});
