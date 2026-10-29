import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { issuePasswordResetPin } from "../issuePasswordResetPin";
import {
  ISSUED_PIN,
  ISSUED_ROW,
  NETWORK_KEY_VALUE,
  NORMALIZED_USERNAME,
  REQUEST_PIN,
  RPC_FAILURE,
  UNNORMALIZED_USERNAME,
} from "./passwordRecovery.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

const issue = () =>
  issuePasswordResetPin({
    networkKey: NETWORK_KEY_VALUE,
    pin: REQUEST_PIN,
    username: UNNORMALIZED_USERNAME,
  });

describe("issuePasswordResetPin", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    rpc.mockResolvedValue({
      data: [ISSUED_ROW],
      error: null,
    });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({ rpc } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
  });

  it("sends the normalized username, the pin and the network key", async () => {
    await issue();

    expect(rpc).toHaveBeenCalledOnce();
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.ISSUE_PASSWORD_RESET_PIN,
      {
        p_network_key: NETWORK_KEY_VALUE,
        p_pin: REQUEST_PIN,
        p_username: NORMALIZED_USERNAME,
      }
    );
  });

  it("returns null when no row comes back", async () => {
    rpc.mockResolvedValue({ data: [], error: null });

    expect(await issue()).toBeNull();
  });

  it("returns null when the data is missing", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    expect(await issue()).toBeNull();
  });

  it("maps the row to the issued pin", async () => {
    expect(await issue()).toEqual(ISSUED_PIN);
  });

  it("throws when the database rejects the call", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: RPC_FAILURE,
    });

    await expect(issue()).rejects.toThrow(
      RPC_FAILURE.message
    );
  });
});
