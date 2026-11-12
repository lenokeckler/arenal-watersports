import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import { readQuantityAlerts } from "../readQuantityAlerts";
import { requireInventoryAccess } from "../requireInventoryAccess";

vi.mock("../requireInventoryAccess", () => ({
  requireInventoryAccess: vi.fn(),
}));

const order = vi.fn();
const select = vi.fn(() => ({ order }));
const from = vi.fn(() => ({ select }));

describe("readQuantityAlerts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireInventoryAccess).mockResolvedValue({
      from,
    } as never);
  });

  it("reads the quantity alerts view ordered by category name", async () => {
    order.mockResolvedValue({
      data: [{ category_id: "x" }],
      error: null,
    });

    expect(await readQuantityAlerts()).toEqual([
      { category_id: "x" },
    ]);
    expect(from).toHaveBeenCalledWith(
      INVENTORY_DATA_SOURCE.QUANTITY_ALERTS_VIEW
    );
  });

  it("answers an empty list when there is no data", async () => {
    order.mockResolvedValue({ data: null, error: null });

    expect(await readQuantityAlerts()).toEqual([]);
  });

  it("throws the database error", async () => {
    order.mockResolvedValue({
      data: null,
      error: {
        code: "42501",
        message: "permission denied",
      },
    });

    await expect(readQuantityAlerts()).rejects.toThrow();
  });
});
