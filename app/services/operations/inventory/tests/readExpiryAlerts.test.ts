import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import { readExpiryAlerts } from "../readExpiryAlerts";
import { requireInventoryAccess } from "../requireInventoryAccess";

vi.mock("../requireInventoryAccess", () => ({
  requireInventoryAccess: vi.fn(),
}));

const order = vi.fn();
const select = vi.fn(() => ({ order }));
const from = vi.fn(() => ({ select }));

describe("readExpiryAlerts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireInventoryAccess).mockResolvedValue({
      from,
    } as never);
  });

  it("reads the expiry alerts view, soonest first", async () => {
    order.mockResolvedValue({
      data: [{ category_id: "x" }],
      error: null,
    });

    expect(await readExpiryAlerts()).toEqual([
      { category_id: "x" },
    ]);
    expect(from).toHaveBeenCalledWith(
      INVENTORY_DATA_SOURCE.EXPIRY_ALERTS_VIEW
    );
    expect(order).toHaveBeenCalledWith("expiry_date", {
      ascending: true,
    });
  });

  it("answers an empty list when there is no data", async () => {
    order.mockResolvedValue({ data: null, error: null });

    expect(await readExpiryAlerts()).toEqual([]);
  });

  it("throws the database error", async () => {
    order.mockResolvedValue({
      data: null,
      error: {
        code: "42501",
        message: "permission denied",
      },
    });

    await expect(readExpiryAlerts()).rejects.toThrow();
  });
});
