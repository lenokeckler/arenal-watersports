import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS, STRING } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_MODE } from "../constants/UnitFormMode.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { CreateUnitInput } from "../models/CreateUnitInput.interface";
import type { UpdateUnitInput } from "../models/UpdateUnitInput.interface";
import { resolveCategoryUnitsPath } from "../utils/resolveUnitPaths";
import {
  buildCreateUnitInput,
  buildUnitFormValues,
  buildUpdateUnitInput,
  FAKE_CATEGORY_ID,
} from "./Unit.constants";
import {
  renderUnitSubmit,
  submitUnitFormEvent,
} from "./UnitSubmit.harness";
import { SUCCESS_RESULT } from "./useUnitForm.constants";

const mockPush = vi.fn();
const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockCreateUnitAction = vi.fn();
const mockUpdateUnitAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/createUnitAction", () => ({
  createUnitAction: (input: CreateUnitInput) =>
    mockCreateUnitAction(input),
}));

vi.mock("../services/updateUnitAction", () => ({
  updateUnitAction: (input: UpdateUnitInput) =>
    mockUpdateUnitAction(input),
}));

const SAVE_CASES = [
  {
    mode: UNIT_FORM_MODE.CREATE,
    values: buildUnitFormValues({
      fuelLevel: STRING.Empty,
    }),
    input: buildCreateUnitInput({ fuelLevel: null }),
    toast: UNIT_CATALOG_COPY.CREATE_SUCCESS_TOAST,
    action: mockCreateUnitAction,
    otherAction: mockUpdateUnitAction,
    navigation: mockPush,
    navigationArguments: [
      resolveCategoryUnitsPath(FAKE_CATEGORY_ID),
    ],
    otherNavigation: mockRefresh,
  },
  {
    mode: UNIT_FORM_MODE.EDIT,
    values: buildUnitFormValues({
      status: UNIT_STATUS.IN_REPAIR,
    }),
    input: buildUpdateUnitInput(),
    toast: UNIT_CATALOG_COPY.UPDATE_SUCCESS_TOAST,
    action: mockUpdateUnitAction,
    otherAction: mockCreateUnitAction,
    navigation: mockRefresh,
    navigationArguments: [],
    otherNavigation: mockPush,
  },
];

describe("useUnitFormSubmit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockCreateUnitAction.mockResolvedValue(SUCCESS_RESULT);
    mockUpdateUnitAction.mockResolvedValue(SUCCESS_RESULT);
  });

  it("reports the validation errors and calls no action", async () => {
    const onValidationErrors = vi.fn();
    const { result } = renderUnitSubmit({
      values: buildUnitFormValues({ code: STRING.Empty }),
      onValidationErrors,
    });

    const preventDefault =
      await submitUnitFormEvent(result);

    expect(preventDefault).toHaveBeenCalled();
    expect(onValidationErrors).toHaveBeenCalledWith({
      code: UNIT_FORM_ERROR_COPY.CODE_REQUIRED,
    });
    expect(mockCreateUnitAction).not.toHaveBeenCalled();
    expect(mockUpdateUnitAction).not.toHaveBeenCalled();
    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it.each(SAVE_CASES)(
    "saves in $mode mode, shows the toast and navigates",
    async ({
      mode,
      values,
      input,
      toast,
      action,
      otherAction,
      navigation,
      navigationArguments,
      otherNavigation,
    }) => {
      const { result } = renderUnitSubmit({ mode, values });

      await submitUnitFormEvent(result);

      expect(action).toHaveBeenCalledWith(input);
      expect(otherAction).not.toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith(
        STATUS.SUCCESS,
        toast
      );
      expect(navigation).toHaveBeenCalledWith(
        ...navigationArguments
      );
      expect(otherNavigation).not.toHaveBeenCalled();
    }
  );
});
