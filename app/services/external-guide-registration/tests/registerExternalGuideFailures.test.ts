import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { createWorkerAuthUser } from "@/app/services/worker-registration/createWorkerAuthUser";
import { deleteWorkerAuthUser } from "@/app/services/worker-registration/deleteWorkerAuthUser";
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
  () => ({
    readSignedInUserId: vi.fn(),
  })
);
vi.mock(
  "@/app/services/worker-registration/createWorkerAuthUser",
  () => ({
    createWorkerAuthUser: vi.fn(),
  })
);
vi.mock(
  "@/app/services/worker-registration/deleteWorkerAuthUser",
  () => ({
    deleteWorkerAuthUser: vi.fn(),
  })
);
vi.mock(
  "@/app/services/worker-registration/generateTemporaryPassword",
  () => ({
    generateTemporaryPassword: vi.fn(),
  })
);
vi.mock("../isExternalGuideRegistrar", () => ({
  isExternalGuideRegistrar: vi.fn(),
}));

const rpc = vi.fn();
const supabase = { rpc } as unknown as ServerSupabaseClient;

describe("registerExternalGuide failures", () => {
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
  });

  it("refuses a caller without a signed-in session", async () => {
    vi.mocked(readSignedInUserId).mockResolvedValue(null);
    expect(
      await registerExternalGuide(
        supabase,
        EXTERNAL_GUIDE_INPUT
      )
    ).toEqual({
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
    });
    expect(isExternalGuideRegistrar).not.toHaveBeenCalled();
  });

  it("removes the Auth user when the national ID is taken", async () => {
    rpc.mockResolvedValue({
      data: EXTERNAL_GUIDE_REGISTRATION_RESULT.NATIONAL_ID_TAKEN,
      error: null,
    });
    expect(
      await registerExternalGuide(
        supabase,
        EXTERNAL_GUIDE_INPUT
      )
    ).toEqual({
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NATIONAL_ID_TAKEN,
    });
    expect(deleteWorkerAuthUser).toHaveBeenCalledWith(
      EXTERNAL_GUIDE_TEST.AUTH_USER_ID
    );
  });

  it("removes the Auth user when the request rejects", async () => {
    rpc.mockRejectedValue(
      new Error(
        EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.FAILED
      )
    );
    expect(
      await registerExternalGuide(
        supabase,
        EXTERNAL_GUIDE_INPUT
      )
    ).toEqual({
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.FAILED,
    });
    expect(deleteWorkerAuthUser).toHaveBeenCalledWith(
      EXTERNAL_GUIDE_TEST.AUTH_USER_ID
    );
  });

  it("does not consume RPC data when Supabase reports an error", async () => {
    rpc.mockResolvedValue({
      data: EXTERNAL_GUIDE_REGISTRATION_RESULT.CREATED,
      error: {
        code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.FAILED,
        message:
          EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.FAILED,
      },
    });
    expect(
      await registerExternalGuide(
        supabase,
        EXTERNAL_GUIDE_INPUT
      )
    ).toEqual({
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.FAILED,
    });
    expect(deleteWorkerAuthUser).toHaveBeenCalledWith(
      EXTERNAL_GUIDE_TEST.AUTH_USER_ID
    );
  });
});
