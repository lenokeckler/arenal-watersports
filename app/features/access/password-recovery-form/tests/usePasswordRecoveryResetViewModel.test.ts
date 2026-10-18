import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  ACCESS_SHARED_COPY,
  PASSWORD_RULE,
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_ERROR_COPY } from "../constants/PasswordRecoveryResetErrorCopy.constants";
import { attachPasswordRecoveryResetInputs } from "./attachPasswordRecoveryResetInputs";
import {
  PREFILLED_USERNAME,
  VALID_PASSWORD,
  VALID_PIN,
  VALID_RESET_VALUES,
  WEAK_PASSWORD,
  WEAK_PASSWORD_VALUES,
} from "./passwordRecoveryResetState.constants";
import {
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

describe("usePasswordRecoveryResetViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts with the rules neutral and no failures shown, before any typing", () => {
    const { result } = renderViewModel();

    expect(result.current.values.username).toBe(
      PREFILLED_USERNAME
    );
    expect(result.current.values.pin).toBe(STRING.Empty);
    expect(
      Object.values(result.current.passwordRules)
    ).not.toContain(true);
    expect(result.current.showFailures).toBe(false);
    expect(document.body).toHaveFocus();
  });

  it("updates the rule results while the new password is typed", () => {
    const { result } = renderViewModel();

    typeField(
      result,
      PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
      VALID_PASSWORD
    );

    expect(result.current.passwordRules).toEqual({
      [PASSWORD_RULE.LENGTH]: true,
      [PASSWORD_RULE.UPPERCASE]: true,
      [PASSWORD_RULE.LOWERCASE]: true,
      [PASSWORD_RULE.DIGIT]: true,
      [PASSWORD_RULE.SYMBOL]: true,
    });
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

  it("blocks a weak password before it reaches the server and shows the rule failures", () => {
    const { result } = renderViewModel();
    typeAllFields(result, WEAK_PASSWORD_VALUES);
    typeField(
      result,
      PASSWORD_RECOVERY_FIELD.PIN,
      VALID_PIN
    );

    const event = submitForm(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(result.current.showFailures).toBe(true);
    expect(
      result.current.fieldErrors[
        PASSWORD_RECOVERY_FIELD.NEW_PASSWORD
      ]
    ).toBe(ACCESS_SHARED_COPY.NEW_PASSWORD_RULES);
    expect(result.current.values.newPassword).toBe(
      WEAK_PASSWORD
    );
    expect(serverAction).not.toHaveBeenCalled();
  });

  it("lets a valid submit through", () => {
    const { result } = renderViewModel();
    typeAllFields(result, VALID_RESET_VALUES);

    const event = submitForm(result);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
