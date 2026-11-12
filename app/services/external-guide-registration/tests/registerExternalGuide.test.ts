import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_RPC } from "@/app/constants";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { createWorkerAuthUser } from "@/app/services/worker-registration/createWorkerAuthUser";
import { generateTemporaryPassword } from "@/app/services/worker-registration/generateTemporaryPassword";
import {
  EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE,
  EXTERNAL_GUIDE_REGISTRATION_RESULT,
} from "../constants/ExternalGuideRegistration.constants";
import { isExternalGuideRegistrar } from "../isExternalGuideRegistrar";
import { registerExternalGuide } from "../registerExternalGuide";
import {
  EXTERNAL_GUIDE_INPUT,
  EXTERNAL_GUIDE_TEST,
} from "./ExternalGuideRegistration.constants";

vi.mock(
  "@/app/services/authentication/readSignedInUserId",
  () => ({ readSignedInUserId: vi.fn() })
);
vi.mock(
  "@/app/services/worker-registration/createWorkerAuthUser",
  () => ({ createWorkerAuthUser: vi.fn() })
);
vi.mock(
  "@/app/services/worker-registration/deleteWorkerAuthUser",
  () => ({ deleteWorkerAuthUser: vi.fn() })
);
vi.mock(
  "@/app/services/worker-registration/generateTemporaryPassword",
  () => ({ generateTemporaryPassword: vi.fn() })
);
vi.mock("../isExternalGuideRegistrar", () => ({
  isExternalGuideRegistrar: vi.fn(),
}));

const rpc = vi.fn();
const supabase = { rpc } as unknown as ServerSupabaseClient;

describe("registerExternalGuide", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(readSignedInUserId).mockResolvedValue(
      EXTERNAL_GUIDE_TEST.CREATOR_ID
    );
    vi.mocked(isExternalGuideRegistrar).mockResolvedValue(
      true
    );
    vi.mocked(generateTemporaryPassword).mockReturnValue(
      EXTERNAL_GUIDE_TEST.TEMPORARY_PASSWORD
    );
    vi.mocked(createWorkerAuthUser).mockResolvedValue({
      ok: true,
      userId: EXTERNAL_GUIDE_TEST.AUTH_USER_ID,
    });
    rpc.mockResolvedValue({
      data: EXTERNAL_GUIDE_REGISTRATION_RESULT.CREATED,
      error: null,
    });
  });

  it("creates only an external guide with its national ID as username", async () => {
    expect(
      await registerExternalGuide(
        supabase,
        EXTERNAL_GUIDE_INPUT
      )
    ).toEqual({
      ok: true,
      registered: {
        ...EXTERNAL_GUIDE_INPUT,
        temporaryPassword:
          EXTERNAL_GUIDE_TEST.TEMPORARY_PASSWORD,
      },
    });
    expect(createWorkerAuthUser).toHaveBeenCalledWith(
      EXTERNAL_GUIDE_TEST.NATIONAL_ID,
      EXTERNAL_GUIDE_TEST.TEMPORARY_PASSWORD
    );
    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.REGISTER_EXTERNAL_GUIDE,
      {
        guide_id: EXTERNAL_GUIDE_TEST.AUTH_USER_ID,
        guide_full_name: EXTERNAL_GUIDE_TEST.FULL_NAME,
        guide_national_id: EXTERNAL_GUIDE_TEST.NATIONAL_ID,
        guide_expires_on: EXTERNAL_GUIDE_TEST.EXPIRES_ON,
        guide_personal_email:
          EXTERNAL_GUIDE_TEST.PERSONAL_EMAIL,
      }
    );
  });

  it("rejects malformed expiry before creating an Auth user", async () => {
    expect(
      await registerExternalGuide(supabase, {
        ...EXTERNAL_GUIDE_INPUT,
        expiresOn: EXTERNAL_GUIDE_TEST.INVALID_DATE,
      })
    ).toEqual({
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.INVALID_INPUT,
    });
    expect(createWorkerAuthUser).not.toHaveBeenCalled();
  });

  it("rejects malformed optional email before creating an Auth user", async () => {
    expect(
      await registerExternalGuide(supabase, {
        ...EXTERNAL_GUIDE_INPUT,
        personalEmail: EXTERNAL_GUIDE_TEST.INVALID_EMAIL,
      })
    ).toEqual({
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.INVALID_INPUT,
    });
    expect(createWorkerAuthUser).not.toHaveBeenCalled();
  });

  it("refuses a caller without the required mark", async () => {
    vi.mocked(isExternalGuideRegistrar).mockResolvedValue(
      false
    );
    expect(
      await registerExternalGuide(
        supabase,
        EXTERNAL_GUIDE_INPUT
      )
    ).toEqual({
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
    });
    expect(createWorkerAuthUser).not.toHaveBeenCalled();
  });
});
