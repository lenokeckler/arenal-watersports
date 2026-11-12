import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";
import { RESERVATION_EDIT_QUERY } from "../constants/ReservationEditQuery.constants";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationEdit } from "../services/getReservationEdit";
import {
  RESERVATION_EDIT_EDITOR_ROW,
  RESERVATION_EDIT_ROW,
  RESERVATION_EDIT_TEST as test,
} from "./ReservationEdit.constants";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const mockClient = (
  rows: object[],
  editors: object[] = [RESERVATION_EDIT_EDITOR_ROW]
) => {
  const fetchRows: typeof fetch = (url) =>
    Promise.resolve(
      Response.json(
        url
          .toString()
          .includes(RESERVATION_EDIT_QUERY.EDITOR_RPC)
          ? editors
          : rows
      )
    );
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue(
    createClient<Database>(
      SUPABASE.URL,
      SUPABASE.ANON_KEY,
      { global: { fetch: fetchRows } }
    )
  );
};

describe("getReservationEdit", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns null for a malformed id without querying", async () => {
    await expect(
      getReservationEdit(test.MALFORMED_ID)
    ).resolves.toBeNull();
    expect(
      getAuthorizedReservationFormClient
    ).not.toHaveBeenCalled();
  });

  it("returns null when the reservation does not exist", async () => {
    mockClient([]);

    await expect(
      getReservationEdit(test.RESERVATION_ID)
    ).resolves.toBeNull();
  });

  it("maps the row it reads", async () => {
    mockClient([RESERVATION_EDIT_ROW]);

    await expect(
      getReservationEdit(test.RESERVATION_ID)
    ).resolves.toMatchObject({
      id: test.RESERVATION_ID,
      lastEditLabel: test.EXPECTED_LAST_EDIT,
    });
  });

  it("fails when the last editor has no name", async () => {
    mockClient([RESERVATION_EDIT_ROW], []);

    await expect(
      getReservationEdit(test.RESERVATION_ID)
    ).rejects.toThrow(
      RESERVATION_EDIT_QUERY.MISSING_EDITOR
    );
  });
});
