import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_ERROR_COPY } from "../constants/PasswordRecoveryResetErrorCopy.constants";
import { attachPasswordRecoveryResetInputs } from "./attachPasswordRecoveryResetInputs";
import {
  PASSWORD_NOT_SAVED_ERROR,
  PIN_INVALID_ERROR,
} from "./passwordRecoveryReset.constants";
import {
  PREFILLED_USERNAME,
  VALID_PIN,
  VALID_RESET_VALUES,
} from "./passwordRecoveryResetState.constants";
import {
  postForm,
  renderPasswordRecoveryResetViewModel,
  submitForm,
  typeAllFields,
  typeField,
} from "./passwordRecoveryResetViewModel.actions";

const serverAction = vi.fn();

const renderViewModel = () =>
  renderPasswordRecoveryResetViewModel(
    serverAction,
    PREFILLED_USERNAME
  );

describe("usePasswordRecoveryResetViewModel after a server answer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("clears the PIN, keeps the username and flags the PIN after a PIN_INVALID answer", async () => {
    serverAction.mockResolvedValue(PIN_INVALID_ERROR);
    const { result } = renderViewModel();
    const inputs = attachPasswordRecoveryResetInputs(
      result.current.fieldRefs
    );
    typeAllFields(result, VALID_RESET_VALUES);

    await postForm(result, VALID_RESET_VALUES);

    expect(result.current.values.pin).toBe(STRING.Empty);
    expect(result.current.values.username).toBe(
      PREFILLED_USERNAME
    );
    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.PIN
      ]
    ).toBe(PASSWORD_RECOVERY_RESET_ERROR_COPY.pinInvalid);
    expect(
      inputs[PASSWORD_RECOVERY_FIELD.PIN]
    ).toHaveFocus();
  });

  it("shows PASSWORD_NOT_SAVED in the banner, keeps the PIN and drops the error on typing", async () => {
    serverAction.mockResolvedValue(
      PASSWORD_NOT_SAVED_ERROR
    );
    const { result } = renderViewModel();
    typeAllFields(result, VALID_RESET_VALUES);

    await postForm(result, VALID_RESET_VALUES);

    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.FORM
      ]
    ).toBe(
      PASSWORD_RECOVERY_RESET_ERROR_COPY.passwordNotSaved
    );
    expect(result.current.values.pin).toBe(VALID_PIN);

    typeField(
      result,
      PASSWORD_RECOVERY_FIELD.PIN,
      VALID_PIN
    );

    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.FORM
      ]
    ).toBeNull();
    expect(result.current.values.pin).toBe(VALID_PIN);
  });

  it("prevents a second submit while pending", async () => {
    serverAction.mockReturnValue(
      new Promise(() => undefined)
    );
    const { result } = renderViewModel();
    typeAllFields(result, VALID_RESET_VALUES);
    await postForm(result, VALID_RESET_VALUES);

    const event = submitForm(result);

    expect(result.current.isPending).toBe(true);
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });
});
