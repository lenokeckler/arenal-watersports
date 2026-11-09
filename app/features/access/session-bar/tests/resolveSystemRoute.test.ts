import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { E2E_INVENTORY_CATEGORY_ROUTE } from "@/e2e/constants/E2eSystemRoute.constants";
import { readSeededInventoryCategoryId } from "@/e2e/support/readSeededInventoryCategoryId";
import { resolveSystemRoute } from "@/e2e/support/resolveSystemRoute";
import { SYSTEM_ROUTE_DEFAULTS } from "./SystemRoute.constants";

vi.mock(
  "@/e2e/support/readSeededInventoryCategoryId",
  () => ({
    readSeededInventoryCategoryId: vi.fn(),
  })
);

describe("resolveSystemRoute", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("preserves static routes without reading a category", async () => {
    await expect(
      resolveSystemRoute(SYSTEM_ROUTE_DEFAULTS.staticRoute)
    ).resolves.toBe(SYSTEM_ROUTE_DEFAULTS.staticRoute);
    expect(
      readSeededInventoryCategoryId
    ).not.toHaveBeenCalled();
  });

  it("resolves the dynamic pattern to the seeded category", async () => {
    vi.mocked(
      readSeededInventoryCategoryId
    ).mockResolvedValue(SYSTEM_ROUTE_DEFAULTS.categoryId);

    await expect(
      resolveSystemRoute(E2E_INVENTORY_CATEGORY_ROUTE)
    ).resolves.toBe(
      PATHS.OPERATIONS.INVENTORY_CATEGORY(
        SYSTEM_ROUTE_DEFAULTS.categoryId
      )
    );
  });

  it("propagates a category lookup failure", async () => {
    vi.mocked(
      readSeededInventoryCategoryId
    ).mockRejectedValue(SYSTEM_ROUTE_DEFAULTS.readError);

    await expect(
      resolveSystemRoute(E2E_INVENTORY_CATEGORY_ROUTE)
    ).rejects.toBe(SYSTEM_ROUTE_DEFAULTS.readError);
  });
});
