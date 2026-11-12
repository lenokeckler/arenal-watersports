import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SUPABASE_RPC,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { hasSignedInArea } from "../hasSignedInArea";
import {
  FAILED,
  GRANTED,
  REFUSED,
  UNANSWERED,
} from "./Access.constants";
import { AreaRpcPage } from "./AreaRpc.page";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("hasSignedInArea", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("asks has_area for the given area", async () => {
    const page = AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: GRANTED,
    });

    await hasSignedInArea(
      page.client,
      SUPABASE_WORK_AREA.RESERVATIONS
    );

    expect(page.rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.HAS_AREA,
      { target: SUPABASE_WORK_AREA.RESERVATIONS }
    );
  });

  it("is true when the worker holds the area", async () => {
    const page = AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: GRANTED,
    });

    await expect(
      hasSignedInArea(
        page.client,
        SUPABASE_WORK_AREA.RESERVATIONS
      )
    ).resolves.toBe(true);
  });

  it("is false when the worker does not hold the area", async () => {
    const page = AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: REFUSED,
    });

    await expect(
      hasSignedInArea(
        page.client,
        SUPABASE_WORK_AREA.RESERVATIONS
      )
    ).resolves.toBe(false);
  });

  it("is false when the answer is not a boolean true", async () => {
    const page = AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: UNANSWERED,
    });

    await expect(
      hasSignedInArea(
        page.client,
        SUPABASE_WORK_AREA.RESERVATIONS
      )
    ).resolves.toBe(false);
  });

  it("throws a SupabaseQueryError when the call fails", async () => {
    const page = AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: FAILED,
    });

    await expect(
      hasSignedInArea(
        page.client,
        SUPABASE_WORK_AREA.RESERVATIONS
      )
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
