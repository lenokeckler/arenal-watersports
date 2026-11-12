import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { registerExternalGuideAsSignedIn } from "@/app/services/external-guide-registration";
import { EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE } from "@/app/services/external-guide-registration/constants/ExternalGuideRegistration.constants";
import {
  EXTERNAL_GUIDE_REGISTRATION_FIELD,
  EXTERNAL_GUIDE_REGISTRATION_INITIAL_STATE,
  EXTERNAL_GUIDE_REGISTRATION_STATUS,
} from "../constants/ExternalGuideRegistrationForm.constants";
import { submitExternalGuideRegistration } from "../actions/submitExternalGuideRegistration";
import { EXTERNAL_GUIDE_REGISTRATION_TEST } from "./ExternalGuideRegistrationTest.constants";

vi.mock(
  "@/app/services/external-guide-registration",
  () => ({
    registerExternalGuideAsSignedIn: vi.fn(),
  })
);

const createFormData = (): FormData => {
  const formData = new FormData();
  formData.set(
    EXTERNAL_GUIDE_REGISTRATION_FIELD.FULL_NAME,
    EXTERNAL_GUIDE_REGISTRATION_TEST.FULL_NAME
  );
  formData.set(
    EXTERNAL_GUIDE_REGISTRATION_FIELD.NATIONAL_ID,
    EXTERNAL_GUIDE_REGISTRATION_TEST.NATIONAL_ID
  );
  formData.set(
    EXTERNAL_GUIDE_REGISTRATION_FIELD.EXPIRES_ON,
    EXTERNAL_GUIDE_REGISTRATION_TEST.EXPIRES_ON
  );
  return formData;
};

describe("submitExternalGuideRegistration", () => {
  beforeEach(() => {
    vi.mocked(registerExternalGuideAsSignedIn).mockReset();
  });

  it("passes only the expected guide fields to the service", async () => {
    vi.mocked(
      registerExternalGuideAsSignedIn
    ).mockResolvedValue({
      ok: true,
      registered:
        EXTERNAL_GUIDE_REGISTRATION_TEST.REGISTERED,
    });
    const formData = createFormData();
    formData.set(
      EXTERNAL_GUIDE_REGISTRATION_FIELD.PERSONAL_EMAIL,
      EXTERNAL_GUIDE_REGISTRATION_TEST.PERSONAL_EMAIL
    );

    const result = await submitExternalGuideRegistration(
      EXTERNAL_GUIDE_REGISTRATION_INITIAL_STATE,
      formData
    );

    expect(
      registerExternalGuideAsSignedIn
    ).toHaveBeenCalledWith({
      expiresOn:
        EXTERNAL_GUIDE_REGISTRATION_TEST.EXPIRES_ON,
      fullName: EXTERNAL_GUIDE_REGISTRATION_TEST.FULL_NAME,
      nationalId:
        EXTERNAL_GUIDE_REGISTRATION_TEST.NATIONAL_ID,
      personalEmail:
        EXTERNAL_GUIDE_REGISTRATION_TEST.PERSONAL_EMAIL,
    });
    expect(result).toEqual({
      status: EXTERNAL_GUIDE_REGISTRATION_STATUS.REGISTERED,
      registered:
        EXTERNAL_GUIDE_REGISTRATION_TEST.REGISTERED,
    });
  });

  it("preserves a refusal code from the service", async () => {
    vi.mocked(
      registerExternalGuideAsSignedIn
    ).mockResolvedValue({
      ok: false,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
    });

    const result = await submitExternalGuideRegistration(
      EXTERNAL_GUIDE_REGISTRATION_INITIAL_STATE,
      createFormData()
    );

    expect(result).toEqual({
      status: EXTERNAL_GUIDE_REGISTRATION_STATUS.REFUSED,
      code: EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
    });
  });
});
