import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getInventorySummaryPage } from "../readInventory";
import { requireInventoryAccess } from "../requireInventoryAccess";
import { escapeInventorySearch } from "../utils/escapeInventorySearch";

vi.mock("../requireInventoryAccess", () => ({
  requireInventoryAccess: vi.fn(),
}));

const calls: Record<string, unknown[][]> = {};

const builder: Record<string, unknown> = {};
for (const method of ["select", "ilike", "eq", "order"]) {
  builder[method] = (...args: unknown[]) => {
    (calls[method] ??= []).push(args);

    return builder;
  };
}
builder.range = () =>
  Promise.resolve({ count: 0, data: [], error: null });

describe("getInventorySummaryPage filters", () => {
  beforeEach(() => {
    for (const key of Object.keys(calls)) {
      delete calls[key];
    }

    vi.mocked(requireInventoryAccess).mockResolvedValue({
      from: () => builder,
    } as never);
  });

  it("filters by name with the special characters escaped, and by mode", async () => {
    await getInventorySummaryPage(0, {
      mode: "by_unit",
      query: "100%_x",
    });

    expect(calls.ilike[0]).toEqual([
      "category_name",
      "%100\\%\\_x%",
    ]);
    expect(calls.eq[0]).toEqual([
      "tracking_mode",
      "by_unit",
    ]);
  });

  it("ignores an unknown mode and an empty query", async () => {
    await getInventorySummaryPage(0, {
      mode: "other",
      query: "",
    });

    expect(calls.ilike).toBeUndefined();
    expect(calls.eq).toBeUndefined();
  });
});

describe("escapeInventorySearch", () => {
  it("escapes percent, underscore and backslash", () => {
    expect(escapeInventorySearch(" a%b_c\\d ")).toBe(
      "a\\%b\\_c\\\\d"
    );
  });
});
