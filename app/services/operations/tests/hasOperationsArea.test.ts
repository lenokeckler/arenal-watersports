import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_WORK_AREA } from "@/app/constants";
import {
  FAILED,
  GRANTED,
  REFUSED,
} from "@/app/services/income/tests/Access.constants";
import { AreaRpcPage } from "@/app/services/income/tests/AreaRpc.page";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { hasOperationsArea } from "../hasOperationsArea";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("hasOperationsArea", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("is true for a worker with the operations area", async () => {
    const page = AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.OPERATIONS]: GRANTED,
    });

    await expect(hasOperationsArea()).resolves.toBe(true);
    expect(page.rpc).toHaveBeenCalledWith("has_area", {
      target: SUPABASE_WORK_AREA.OPERATIONS,
    });
  });

  it("is false for a worker without it", async () => {
    AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.OPERATIONS]: REFUSED,
    });

    await expect(hasOperationsArea()).resolves.toBe(false);
  });

  it("raises a failed answer instead of hiding the board", async () => {
    AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.OPERATIONS]: FAILED,
    });

    await expect(
      hasOperationsArea()
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
