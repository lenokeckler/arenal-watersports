import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  ACCESS_SHARED_COPY,
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { PASSWORD_RECOVERY_REQUEST_UNKNOWN_COPY } from "../constants/PasswordRecoveryRequestErrorCopy.constants";
import { attachPasswordRecoveryRequestInput } from "./attachPasswordRecoveryRequestInput";
import {
  RAW_USERNAME,
  SHORT_USERNAME,
  UNKNOWN_ERROR,
} from "./passwordRecoveryRequest.constants";
import {
  postForm,
  renderPasswordRecoveryRequestViewModel,
  submitForm,
  typeUsername,
} from "./passwordRecoveryRequestViewModel.actions";

const serverAction = vi.fn();

describe("usePasswordRecoveryRequestViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts empty with no error and nothing focused", () => {
    const { result } =
      renderPasswordRecoveryRequestViewModel(serverAction);

    expect(result.current.values.username).toBe(
      STRING.Empty
    );
    expect(result.current.isPending).toBe(false);
    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.USERNAME
      ]
    ).toBeNull();
    expect(document.body).toHaveFocus();
  });

  it("blocks an empty submit, shows the required error and focuses the username", () => {
    const { result } =
      renderPasswordRecoveryRequestViewModel(serverAction);
    const input = attachPasswordRecoveryRequestInput(
      result.current.fieldRefs
    );

    const event = submitForm(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.USERNAME
      ]
    ).toBe(ACCESS_SHARED_COPY.USERNAME_REQUIRED);
    expect(input).toHaveFocus();
    expect(serverAction).not.toHaveBeenCalled();
  });

  it("revalidates while typing after a blocked submit", () => {
    const { result } =
      renderPasswordRecoveryRequestViewModel(serverAction);
    submitForm(result);

    typeUsername(result, SHORT_USERNAME);

    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.USERNAME
      ]
    ).toBe(ACCESS_SHARED_COPY.USERNAME_LENGTH);

    typeUsername(result, RAW_USERNAME);

    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.USERNAME
      ]
    ).toBeNull();
  });

  it("lets a valid submit through", () => {
    const { result } =
      renderPasswordRecoveryRequestViewModel(serverAction);
    typeUsername(result, RAW_USERNAME);

    const event = submitForm(result);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it("shows a server failure in the form banner, keeps the username and clears it on typing", async () => {
    serverAction.mockResolvedValue(UNKNOWN_ERROR);
    const { result } =
      renderPasswordRecoveryRequestViewModel(serverAction);
    typeUsername(result, RAW_USERNAME);

    await postForm(result, RAW_USERNAME);

    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.FORM
      ]
    ).toBe(PASSWORD_RECOVERY_REQUEST_UNKNOWN_COPY);
    expect(result.current.values.username).toBe(
      RAW_USERNAME
    );

    typeUsername(result, SHORT_USERNAME);

    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.FORM
      ]
    ).toBeNull();
  });

  it("prevents a second submit while pending", async () => {
    serverAction.mockReturnValue(
      new Promise(() => undefined)
    );
    const { result } =
      renderPasswordRecoveryRequestViewModel(serverAction);
    typeUsername(result, RAW_USERNAME);
    await postForm(result, RAW_USERNAME);

    const event = submitForm(result);

    expect(result.current.isPending).toBe(true);
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });
});
