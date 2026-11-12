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
  PREFILLED_USERNAME,
  VALID_RESET_VALUES,
} from "./passwordRecoveryResetState.constants";
import {
  renderPasswordRecoveryResetViewModel,
  submitForm,
  typeAllFields,
} from "./passwordRecoveryResetViewModel.actions";

const serverAction = vi.fn();

const renderViewModel = () =>
  renderPasswordRecoveryResetViewModel(
    serverAction,
    PREFILLED_USERNAME
  );

describe("usePasswordRecoveryResetViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts with the prefilled username, an empty PIN and no focus, before any typing", () => {
    const { result } = renderViewModel();

    expect(result.current.values.username).toBe(
      PREFILLED_USERNAME
    );
    expect(result.current.values.pin).toBe(STRING.Empty);
    expect(document.body).toHaveFocus();
  });

  it("blocks an empty PIN, shows its error and focuses it first", () => {
    const { result } = renderViewModel();
    const inputs = attachPasswordRecoveryResetInputs(
      result.current.fieldRefs
    );

    const event = submitForm(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.PIN
      ]
    ).toBe(PASSWORD_RECOVERY_RESET_ERROR_COPY.pinRequired);
    expect(
      inputs[PASSWORD_RECOVERY_FIELD.PIN]
    ).toHaveFocus();
    expect(serverAction).not.toHaveBeenCalled();
  });

  it("lets a valid submit through", () => {
    const { result } = renderViewModel();
    typeAllFields(result, VALID_RESET_VALUES);

    const event = submitForm(result);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
