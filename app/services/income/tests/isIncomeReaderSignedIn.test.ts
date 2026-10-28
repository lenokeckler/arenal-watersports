import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_WORK_AREA } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { isIncomeReaderSignedIn } from "../isIncomeReaderSignedIn";
import {
  FAILED,
  GRANTED,
  REFUSED,
} from "./Access.constants";
import { AreaRpcPage } from "./AreaRpc.page";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("isIncomeReaderSignedIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lets a Reservas worker read income without asking for Administración", async () => {
    const page = AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: GRANTED,
    });

    await expect(isIncomeReaderSignedIn()).resolves.toBe(
      true
    );
    expect(page.askedAreas).toEqual([
      SUPABASE_WORK_AREA.RESERVATIONS,
    ]);
  });

  it("lets an Administración worker read income", async () => {
    AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: REFUSED,
      [SUPABASE_WORK_AREA.ADMINISTRATION]: GRANTED,
    });

    await expect(isIncomeReaderSignedIn()).resolves.toBe(
      true
    );
  });

  it("refuses an Operaciones worker", async () => {
    const page = AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: REFUSED,
      [SUPABASE_WORK_AREA.ADMINISTRATION]: REFUSED,
    });

    await expect(isIncomeReaderSignedIn()).resolves.toBe(
      false
    );
    expect(page.askedAreas).toEqual([
      SUPABASE_WORK_AREA.RESERVATIONS,
      SUPABASE_WORK_AREA.ADMINISTRATION,
    ]);
  });

  it("fails loudly instead of refusing when the check cannot run", async () => {
    AreaRpcPage.respondingWith({
      [SUPABASE_WORK_AREA.RESERVATIONS]: FAILED,
    });

    await expect(
      isIncomeReaderSignedIn()
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
